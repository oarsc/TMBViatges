import { getElementById, querySelector, querySelectorAll, createElement, generateFromTemplate } from './dom-utils';
import { PARAMS, diffDays, formatPrice, toDate, fromDate, encData } from './utils';

import { TARGETES, Targeta } from './targetes';
import { ParamsModel } from './models';

declare global {
  interface HTMLTableRowElement {
    class: typeof Targeta;
  }
}

export function init(): boolean {
	getElementById('form-submit')!.onsubmit = ev => {
		const form = ev.target as HTMLFormElement; 
		const data = form.d.value = encData(loadOutputData());
		window.history.pushState('', '', `${location.origin}${location.pathname}?d=${data}`);
	}

	const uniCheckbox = getElementById<HTMLInputElement>('uni')!;
	uniCheckbox.onchange = () => {
		const jove = getElementById<HTMLInputElement>('jove')!;
		const uni = jove.disabled = uniCheckbox.checked;
		if (uni) {
			jove.checked = false;
		}
	};
	getElementById('reset-fields')!.onclick = () => {
		location.search = '';
		return false;
	};

	getElementById('logo')!.onclick = _ => location.reload();

	return true;
}

export function load() {
	const tbodyTargetes = querySelector('#tickets tbody')!;
	tbodyTargetes.clear();

	// CONSTRUIR TAULA DE TARGETES:
	let totalZones = 0;
	TARGETES.map(card => {
		const row = createElement('tr', 'ticket');
		row.class = card;

		const tName = createElement('td', 'nom');
		tName.textContent = card.cardName;

		const tPreu = createElement('td', 'preu');
		tPreu.textContent = formatPrice(card.preus[0], '€');

		row.appendChild(tName);
		row.appendChild(tPreu);

		if (card.zones > totalZones) {
			totalZones = card.zones;
		}

		return row;

	}).forEach(t => tbodyTargetes.appendChild(t));

	const clon = generateFromTemplate('table-extra-columns')!;
	Array.from(clon.children)
		.map(td => td as HTMLTableCellElement)
		.forEach(td => td.rowSpan = TARGETES.length);

	tbodyTargetes.firstChild!.appendChild(clon);

	// CONSTUIR COMBO DE ZONES:
	const zonesSelect = getElementById<HTMLSelectElement>('zones-selector')!;
	zonesSelect.clear();

	zonesSelect.onchange = ev => actualitzarPreus(parseInt(zonesSelect.value));

	for (let i = 1; i <= totalZones; i++) {
		const option = createElement('option');
		option.textContent = 'Zona '+i;
		option.value = `${i}`;
		zonesSelect.appendChild(option);
	}

	// CONFIGURAR AVUI COM A PRIMER DIA
	const dateIni = getElementById<HTMLInputElement>('dateini')!;
	const dateEnd = getElementById<HTMLInputElement>('dateend')!;
	const addDays = getElementById<HTMLInputElement>('adddays')!;

	let today = new Date();
	dateIni.value = fromDate(today);
	today.setDate(today.getDate()+parseInt(addDays.value));
	dateEnd.value = fromDate(today);

	dateIni.onblur =
	addDays.onchange =
	addDays.onkeyup = () => {
		const validDates = checkValidityDates(dateIni);

		if (validDates) {
			const val = parseInt(addDays.value) ?? 0;
			const initDate = toDate(dateIni.value);
			initDate.setDate(initDate.getDate() + val);
			dateEnd.value = fromDate(initDate);
		}
	}

	dateEnd.onblur = ev => {
		const validDates = checkValidityDates(dateEnd);
	
		if (validDates) {
			const val = parseInt(addDays.value) ?? 0;
			const endDate = toDate(dateEnd.value);
			endDate.setDate(endDate.getDate()-val);
			dateIni.value = fromDate(endDate);
		}
	}

	// BOTÓ EXCEPCIONS
	getElementById('exceptions-button')!.onclick = ev => {
		getElementById<HTMLFormElement>('form-submit')!.action = './excepcions.html';
	}

	loadEntryData();
}

function actualitzarPreus(zona: number) {
	querySelectorAll('#tickets .ticket')
		.map(tr => tr as HTMLTableRowElement)
		.forEach(row => {
			querySelector('.preu', row)!.textContent = row.class.zones < zona? '' : formatPrice(row.class.preus[zona-1], '€');
		});
}


function loadEntryData(){
	function ifSetValue(id: string, value: number | string | undefined) {
		if (value != undefined) {
			const el = getElementById<HTMLInputElement>(id);
			if (el) el.value = `${value}`;
		}
	}

	function ifSetChecked(id: string, value: string | undefined) {
		if (value) {
			const el = getElementById<HTMLInputElement>(id);
			if (el)	el.checked = value=='on';
		}
	}

	if (PARAMS.dia) {
		ifSetValue('dill', PARAMS.dia[0]);
		ifSetValue('dima', PARAMS.dia[1]);
		ifSetValue('dime', PARAMS.dia[2]);
		ifSetValue('dijo', PARAMS.dia[3]);
		ifSetValue('dive', PARAMS.dia[4]);
		ifSetValue('diss', PARAMS.dia[5]);
		ifSetValue('dium', PARAMS.dia[6]);
	}

	ifSetValue('dateini', PARAMS.ini);
	ifSetValue('dateend', PARAMS.end);

	if (PARAMS.ini && PARAMS.end) {
		getElementById<HTMLInputElement>('adddays')!.value = '' + diffDays(PARAMS.ini, PARAMS.end);
	}

	ifSetValue('exceptions', JSON.stringify(PARAMS.exceptions));
	ifSetValue('zones-selector', PARAMS.z);

	ifSetChecked('jove',PARAMS.jove);
	ifSetChecked('uni', PARAMS.uni == undefined? 'on' : PARAMS.uni);
	if (!getElementById<HTMLInputElement>('uni')!.checked) {
		getElementById<HTMLInputElement>('jove')!.disabled = true;
	}

	const zonesSelector = getElementById('zones-selector') as any;
	zonesSelector.onchange()
}

function loadOutputData() : ParamsModel {
	const form = getElementById<HTMLFormElement>('form');

	return (querySelectorAll('select,input', form) as Array<HTMLSelectElement | HTMLInputElement>)
		.filter(el => el.name)
		.sort((a,b) => a.name > b.name? 1 : a.name < b.name? -1 : 0)
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

			} else if (el instanceof HTMLInputElement) {
				obj[el.name] = el.checked ? 'on' : 'off';
			}

			return obj;
		}, {} as any) as ParamsModel;
}



// SUPPORT FUNCTIONS:
function checkValidityDates(...args: HTMLInputElement[]): boolean {
	let validDates = true;

	[...args].forEach(dateInput => {
		const date = toDate(dateInput.value);

		if (!date || isNaN(date.getTime())) {
			validDates = false;
			dateInput.setCustomValidity('Invalid date');
		} else {
			dateInput.setCustomValidity('');
		}
	});

	return validDates;
}
