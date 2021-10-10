import { addClass, toggleClass, getElementById, getElementsByClassName, querySelectorAll, createElement, generateFromTemplate } from './dom-utils';
import { PARAMS, MES_NOMS, toDate, fromDate, encData, goToPage } from './utils';

let initDate;
let endDate;

//export function init() {}

export function load() {
	initDate = toDate(PARAMS.ini);
	endDate = toDate(PARAMS.end);

	let date = new Date(initDate);

	while (date < endDate) {
		cargarMes(date);
		date.setMonth(date.getMonth()+1);
		date.setDate(1);
	}

	querySelectorAll('.dow.visible input').forEach(e => e.onblur = blurEvent);
	getElementsByClassName('save-button').forEach(a => a.onclick = save);
	getElementById('logo').onclick = save;
}

function cargarMes(date){
	date = new Date(date);
	let month = date.getMonth();
	let year = date.getFullYear();

	let clon = generateFromTemplate('month');

	clon.querySelector('.month-name').textContent = MES_NOMS[month]+' '+year;

	cargarSetmanes(date, clon.querySelector('tbody'));

	getElementById('mesos').appendChild(clon);
}

function cargarSetmanes(date, mes){
	let thisMonth = date.getMonth();
	let week;

	while(date.getMonth() == thisMonth && date.getTime() < endDate.getTime()) {
		if (!week || date.getDay()==1){
			if (week) mes.appendChild(week)
			week = generateFromTemplate('week');
		}
		fillDay(week.querySelector('.d'+(date.getDay()+6)%7), date);
		date.setDate(date.getDate()+1);
	}
	mes.appendChild(week);
}

function fillDay(dayElement, date) {
	let def = usosDefault(date);
	let usos = getUsos(date);

	dayElement.querySelector('.dianum').textContent = date.getDate();
	dayElement.querySelector('input').value=usos;
	dayElement.setAttribute('date',fromDate(date));
	dayElement.setAttribute('def',def);

	if (def == usos) {
		addClass(dayElement, 'visible', 'def');

	} else {
		addClass(dayElement, 'visible')
		addResetButton(dayElement);
	}

	dayElement.classList.onChange((className, added) => {
		if (className == 'def') {
			if (added) removeResetButton(dayElement);
			else       addResetButton(dayElement);
		}
	});
}

function getUsos(date){
	let usos;
	if (PARAMS.exceptions) {
		usos = PARAMS.exceptions[fromDate(date,true)];
	}
	if (usos === undefined) {
		usos = usosDefault(date);
	}
	return usos;
}

function usosDefault(date) {
	return PARAMS.dia[(date.getDay()+6)%7];
}

function blurEvent(ev) {
	let td = ev.target.parentNode.parentNode;
	let def = td.getAttribute('def');
	let usos = ev.target.value;

	toggleClass(td, 'def', def == usos);
}

function addResetButton(td) {
	let div = td.children[0];
	if (!td.buttonReset) {
		let button = createElement('button');
		button.textContent = '×';
		button.onclick = ev => {
			td.querySelector('input').value = td.getAttribute('def');
			addClass(td, 'def');
		}
		div.appendChild(button);
		td.buttonReset = button;
	}
}

function removeResetButton(td) {
	let div = td.children[0];
	if (td.buttonReset) {
		div.removeChild(td.buttonReset);
		td.buttonReset = undefined;
	}
}

function save() {
	let dows = querySelectorAll('.dow.visible')
		.map(d=> [toDate(d.getAttribute('date')), d.querySelector('input').value])
		.filter(([date, value])=> PARAMS.dia[(date.getDay()+6)%7] != value)
		.reduce((obj,[date, value])=>{
			obj[fromDate(date,true)] = value;
			return obj;
		},{});

	PARAMS.exceptions = dows;
	let data = encData(PARAMS);

	window.history.pushState('', '', location.pathname + '?d=' + data);
	goToPage('', data);
}