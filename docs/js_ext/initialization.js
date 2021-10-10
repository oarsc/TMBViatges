import { getElementById, querySelector, querySelectorAll, createElement, generateFromTemplate } from './dom-utils';
import { PARAMS, diffDays, formatPrice, toDate, fromDate, encData } from './utils';

import { TARGETES } from './targetes';

export function init() {
	getElementById('form-submit').onsubmit = ev => {
		let data = ev.target.d.value = encData(loadOutputData());
		let path = ['origin','pathname'].map(attr => window.location[attr]).join('') + '?d=' + data;
		window.history.pushState('', '', path);
	}
	getElementById('uni').onchange = onChangeUni;
	getElementById('reset-fields').onclick = resetFields;

	getElementById('logo').onclick = _ => location.reload();
}

export function load() {
	let tbodyTargetes = querySelector('#tickets tbody');
	tbodyTargetes.clear();

	// CONSTRUIR TAULA DE TARGETES:
	let totalZones = 0;
	TARGETES.map(t=>{
		let row = createElement('tr', 'ticket');
		row.class = t;

		let tName = createElement('td', 'nom');
		tName.textContent = t.nom;

		let tPreu = createElement('td', 'preu');
		tPreu.textContent = formatPrice(t.preus[0], '€');

		row.appendChild(tName);
		row.appendChild(tPreu);

		if (t.zones > totalZones) {
			totalZones = t.zones;
		}

		return row;

	}).forEach(t=>tbodyTargetes.appendChild(t));

	let clon = generateFromTemplate('table-extra-columns');
	Array.from(clon.children).forEach(td=>td.rowSpan = TARGETES.length);

	tbodyTargetes.firstChild.appendChild(clon);

	// CONSTUIR COMBO DE ZONES:
	let zonesSelect = getElementById('zones-selector');
	zonesSelect.clear();

	zonesSelect.onchange = ev=>actualitzarPreus(zonesSelect.value);

	for (let i=1; i<=totalZones; i++) {
		let option = createElement('option');
		option.textContent = 'Zona '+i;
		option.value = i;
		zonesSelect.appendChild(option);
	}

	// CONFIGURAR AVUI COM A PRIMER DIA
	let dateIni = getElementById('dateini');
	let dateEnd = getElementById('dateend');
	let addDays = getElementById('adddays');

	let today = new Date();
	dateIni.value = fromDate(today);
	today.setDate(today.getDate()+parseInt(addDays.value));
	dateEnd.value = fromDate(today);

	dateIni.onblur =
	addDays.onchange =
	addDays.onkeyup = ev=>{
		let validDates = checkValidityDates(dateIni);

		if (validDates) {
			let val = parseInt(addDays.value) || 0;

			let initDate = toDate(dateIni.value);
			initDate.setDate(initDate.getDate()+val);
			dateEnd.value = fromDate(initDate);
		}
	}

	dateEnd.onblur = ev=>{
		let validDates = checkValidityDates(dateEnd);
	
		if (validDates) {
			let val = parseInt(addDays.value) || 0;

			let endDate = toDate(dateEnd.value);
			endDate.setDate(endDate.getDate()-val);
			dateIni.value = fromDate(endDate);
		}
	}

	// BOTÓ EXCEPCIONS
	getElementById('exceptions-button').onclick = ev => {
		getElementById('form-submit').action='./excepcions.html';
	}

	loadEntryData();
}

function onChangeUni(ev){
	let jove = getElementById('jove');
	let uni = jove.disabled = !ev.target.checked;
	if (uni) {
		jove.checked = false;
	}
}

function resetFields(ev) {
	location.search = '';
	return false;
}

function actualitzarPreus(zona) {
	querySelectorAll('#tickets .ticket')
		.forEach(row => {
			querySelector('.preu', row).textContent = row.class.zones < zona? '' : formatPrice(row.class.preus[zona-1], '€');
		});
}


function loadEntryData(){
	function ifSetValue(id, value, undefined) {
		if (value != undefined) {
			let el = getElementById(id);
			if (el) el.value = value;
		}
	}

	function ifSetChecked(id, value) {
		if (value) {
			let el = getElementById(id);
			if (el)	el.checked = value=='on';
		}
	}

	if (PARAMS.dia) {
		ifSetValue('dill',PARAMS.dia[0]);
		ifSetValue('dima',PARAMS.dia[1]);
		ifSetValue('dime',PARAMS.dia[2]);
		ifSetValue('dijo',PARAMS.dia[3]);
		ifSetValue('dive',PARAMS.dia[4]);
		ifSetValue('diss',PARAMS.dia[5]);
		ifSetValue('dium',PARAMS.dia[6]);
	}

	ifSetValue('dateini',PARAMS.ini);
	ifSetValue('dateend',PARAMS.end);

	if (PARAMS.ini && PARAMS.end) {
		getElementById('adddays').value = diffDays(PARAMS.ini, PARAMS.end);
	}

	ifSetValue('exceptions', JSON.stringify(PARAMS.exceptions));
	ifSetValue('zones-selector',PARAMS.z);

	ifSetChecked('jove',PARAMS.jove);
	ifSetChecked('uni', PARAMS.uni==undefined? 'on' : PARAMS.uni);
	if (!getElementById('uni').checked) {
		getElementById('jove').disabled = true;
	}

	getElementById('zones-selector').onchange();
}

function loadOutputData(){
	let form = getElementById('form');

	return querySelectorAll('select,input', form)
		.filter(el=>el.name)
		.sort((a,b)=>a.name>b.name?1:a.name<b.name?-1:0)
		.reduce((obj,el)=>{
			if (el.type != 'checkbox') {

				if (el.name.match(/^d\d$/)) {
					if (obj.dia) obj.dia.push(parseInt(el.value));
					else obj.dia = [parseInt(el.value)];
				} else if (el.name == 'exceptions') {
					obj['exceptions'] = JSON.parse(el.value);
				} else {
					obj[el.name] = el.value;
				}

			} else if (el.checked) {
				obj[el.name] = 'on';
			} else {
				obj[el.name] = 'off';
			}

			return obj;
		},{});
}



// SUPPORT FUNCTIONS:
function checkValidityDates(){
	let validDates = true;

	let dates = [...arguments].forEach(dateInput=>{
		let date = toDate(dateInput.value);

		if (!date || isNaN(date.getTime())) {
			validDates = false;
			dateInput.setCustomValidity('Invalid date');
		} else {
			dateInput.setCustomValidity('');
		}
	});

	return validDates;
}
