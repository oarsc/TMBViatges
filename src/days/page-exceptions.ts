import { addClass, toggleClass, getElementById, querySelectorAll, createElement, generateFromTemplate } from '../lib/dom-utils';
import { MES_NOMS, toDate, fromDate, updateAllUrls } from '../utils';
import { DAY_PARAMS, encData } from './common-days';
import { ParamsModel } from './models';

declare global {
  interface HTMLTableCellElement {
    buttonReset?: HTMLElement | undefined;
  }
}

let initDate: Date;
let endDate: Date;

export function init(): boolean {
  updateAllUrls({}, false);
  return true;
}

export function load() {
  initDate = toDate(DAY_PARAMS.ini);
  endDate = toDate(DAY_PARAMS.end);

  const date = new Date(initDate);

  while (date < endDate) {
    cargarMes(date);
    date.setMonth(date.getMonth()+1);
    date.setDate(1);
  }

  querySelectorAll('.dow.visible input').forEach(e => e.onblur = blurEvent);
}

function cargarMes(date: Date){
  date = new Date(date);
  const month = date.getMonth();
  const year = date.getFullYear();

  const clon = generateFromTemplate('month')!;

  clon.querySelector('.month-name')!.textContent = MES_NOMS[month]+' '+year;

  cargarSetmanes(date, clon.querySelector('tbody')!);

  const mesos = getElementById('mesos')!;
  [...clon.children].forEach(c => mesos.appendChild(c))
}

function cargarSetmanes(date: Date, mes: HTMLTableSectionElement){
  let thisMonth = date.getMonth();
  let week;

  while(date.getMonth() == thisMonth && date.getTime() < endDate.getTime()) {
    if (!week || date.getDay() == 1){
      if (week) mes.appendChild(week)
      week = generateFromTemplate('week');
    }

    fillDay(week!.querySelector('.d'+(date.getDay()+6)%7)!, date);
    date.setDate(date.getDate()+1);
  }
  if (week) {
    mes.appendChild(week);
  }
}

function fillDay(dayElement: HTMLTableCellElement, date: Date) {
  const def = usosDefault(date);
  const usos = getUsos(date);

  dayElement.querySelector('.dianum')!.textContent = `${date.getDate()}`;
  dayElement.querySelector('input')!.value = `${usos}`;
  dayElement.setAttribute('date', fromDate(date));
  dayElement.setAttribute('def', `${def}`);

  if (def == usos) {
    addClass(dayElement, 'visible', 'def');

  } else {
    addClass(dayElement, 'visible')
    addResetButton(dayElement);
  }

  dayElement.classList.onChange('def', added => {
    if (added) removeResetButton(dayElement);
    else       addResetButton(dayElement);
  });
}

function getUsos(date: Date){
  let usos;
  if (DAY_PARAMS.exceptions) {
    usos = DAY_PARAMS.exceptions[fromDate(date,true)];
  }
  if (usos === undefined) {
    usos = usosDefault(date);
  }
  return usos;
}

function usosDefault(date: Date): number {
  return DAY_PARAMS.dia[(date.getDay()+6)%7];
}

function blurEvent(ev: any) {
  let td = ev.target.parentNode.parentNode;
  let def = td.getAttribute('def');
  let usos = ev.target.value;

  toggleClass(td, 'def', def == usos);
  updateAllUrls({d: encData(loadOutputData())});
}

function addResetButton(td: HTMLTableCellElement) {

  let div = td.children[0];
  if (!td.buttonReset) {
    const button = createElement('button');
    button.textContent = '×';
    button.onclick = ev => {
      td.querySelector('input')!.value = td.getAttribute('def') ?? '';
      addClass(td, 'def');
      updateAllUrls({d: encData(loadOutputData())});
    }
    div.appendChild(button);
    td.buttonReset = button;
  }
}

function removeResetButton(td: HTMLTableCellElement) {
  let div = td.children[0];
  if (td.buttonReset) {
    div.removeChild(td.buttonReset);
    td.buttonReset = undefined;
  }
}

function loadOutputData(): ParamsModel {
  let dows = querySelectorAll('.dow.visible')
    .map<[Date, number]>(d => [toDate(d.getAttribute('date')), parseInt(d.querySelector('input')!.value)])
    .filter(([date, value])=> DAY_PARAMS.dia[(date.getDay()+6)%7] != value)
    .reduce((obj,[date, value])=>{
      obj[fromDate(date, true)] = value;
      return obj;
    },{} as Record<string, number>);

  DAY_PARAMS.exceptions = dows;
  return DAY_PARAMS;
}
