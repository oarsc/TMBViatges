import { getElementById, addClass, querySelector, generateFromTemplate } from '../lib/dom-utils';
import { formatPrice, toDate, fromDate, updateAllUrls } from '../utils';
import { DAY_PARAMS } from './common-days';

import { TARGETES, Targeta } from './data';
let FILTERED_TARGETES: Array<typeof Targeta>;

export function init(): boolean {
  updateAllUrls({}, false);

  let errorMessage;
  if (!DAY_PARAMS.ini)      errorMessage = '0xae34fa';
  else if (!DAY_PARAMS.end) errorMessage = '0x1e98e9';
  else if (!DAY_PARAMS.z)   errorMessage = '0x681a55';
  else if (!DAY_PARAMS.dia || DAY_PARAMS.dia.length != 7) errorMessage = '0x13610f';

  if (errorMessage) {
    const errorElement = getElementById('error-message')!;
    errorElement.textContent = `An error ocurred [${errorMessage}]`;
    errorElement.show();
    return false;
  }

  return true;
}

export function load() {
  FILTERED_TARGETES = TARGETES;

  if (DAY_PARAMS.jove != 'on') {
    FILTERED_TARGETES = FILTERED_TARGETES.filter(t => t.cardName != 'T-Jove');
  }
  if (DAY_PARAMS.uni != 'on') {
    FILTERED_TARGETES = FILTERED_TARGETES.filter(t => !t.unipersonal);
  }

  const count = FILTERED_TARGETES.map(card => 1);
  const instances = FILTERED_TARGETES.map(card => new card());

  const day = toDate(DAY_PARAMS.ini);
  const endDayTime = toDate(DAY_PARAMS.end).getTime();

  while (day.getTime() < endDayTime) {

    const usos = getUsos(day);

    for (let u = 0; u < usos; u++){
      for (let i = 0; i < FILTERED_TARGETES.length; i++) {

        let card = instances[i];

        if (!card.firstUsed) {
          card.diaValidacio(day);
        }
        if (card.hasExpired(day)) {
          count[i]++;
          instances[i] = card = new FILTERED_TARGETES[i];
          card.diaValidacio(day);
        }

        let res = card.us(day);
        if (!res){
          let error = new Error('Hi ha hagut un error calculant...');
          console.log(error);
          alert(error);
          throw error;
        }
      }
    }

    day.setDate(day.getDate()+1);
  }

  const cost: number[] = [];
  for (let i=0;i<FILTERED_TARGETES.length;i++) {
    if (!instances[i].firstUsed) {
      count[i]--;
    }
    cost.push(
      preu(FILTERED_TARGETES[i].preus[DAY_PARAMS.z-1], count[i])
    )
  }

  showResults(count, cost, instances, day);
}

function getUsos(date: Date): number{
  const usos = DAY_PARAMS.exceptions
    ? DAY_PARAMS.exceptions[fromDate(date,true)]
    : undefined;

  return usos === undefined
    ? DAY_PARAMS.dia[(date.getDay()+6)%7]
    : usos;
}

function showResults(cardsCount: number[], cost: number[], instances: Targeta[], lastDay: Date){
  const preus = getElementById('preus')!;
  
  const minCost = cost
    .filter(Boolean)
    .reduce((min, value) => value < min ? value : min, 9999);

  for (let i=0; i<FILTERED_TARGETES.length; i++) {
    if (FILTERED_TARGETES[i].zones < DAY_PARAMS.z){
      continue;
    }

    let clon = generateFromTemplate('result-template')!;
    clon.querySelector('.head')!.textContent = FILTERED_TARGETES[i].cardName;
    clon.querySelector('.count')!.textContent = `${cardsCount[i]}`;
    clon.querySelector('.cost')!.textContent = formatPrice(cost[i], '€');
    if (minCost == cost[i]) {
      addClass(clon.querySelector('.cost')!, 'min');
    }

    if (cardsCount[i] > 0) {
      if (instances[i].hasExpired(lastDay)) {
        querySelector('.no-sobres', clon)!.show();

      } else {
        const [sUs, sDia] = instances[i].falta(lastDay);
        let show = 0;

        clon.querySelectorAll('.dia').forEach(i => i.textContent=fromDate(lastDay));

        if (sUs !== undefined) {
          show += 1;
          clon.querySelectorAll('.n-usos').forEach(i => i.textContent = `${sUs}`);
        }
        if (sDia !== undefined) {
          show += 2;
          clon.querySelectorAll('.n-dies').forEach(i => i.textContent = `${sDia}`);
        }
        
        querySelector(show > 0? '.sobres': '.no-sobres', clon)!.show();

        switch (show){
          case 1: querySelector('.usos', clon)!.show(); break;
          case 2: querySelector('.dies', clon)!.show(); break;
          case 3: querySelector('.usos-dies', clon)!.show(); break;
        }
      }
    }

    preus.appendChild(clon);
  }
}

function preu(val: number, count: number): number {
  if (val == undefined) return 0;

  val = Math.round(val*100);
  let cost = 0;
  for (let i=0; i<count; i++) {
    cost+=val;
  }
  return cost/100;
}