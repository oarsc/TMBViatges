import { getElementById, getElementsByClassName, addClass, generateFromTemplate } from './dom-utils';
import { PARAMS, formatPrice, toDate, fromDate, goToPage } from './utils';

import { TARGETES, Targeta } from './targetes';
import { querySelector } from './dom-utils';
let FILTERED_TARGETES: Array<typeof Targeta>;

export function init(): boolean {
	let errorMessage;
	if (!PARAMS.ini)      errorMessage = '0xae34fa';
	else if (!PARAMS.end) errorMessage = '0x1e98e9';
	else if (!PARAMS.z)   errorMessage = '0x681a55';
	else if (!PARAMS.dia || PARAMS.dia.length != 7) errorMessage = '0x13610f';

	if (errorMessage) {
		const errorElement = getElementById('error-message')!;
		errorElement.textContent = `An error ocurred [${errorMessage}]`;
		errorElement.show();
		return false;
	}

	getElementsByClassName('back-button')
		.forEach(element => element.onclick = _ => goToPage());

	getElementById('logo')!.onclick = _ => goToPage();

	return true;
}

export function load() {
	FILTERED_TARGETES = TARGETES;

	if (PARAMS.jove != 'on') {
		FILTERED_TARGETES = FILTERED_TARGETES.filter(t => t.cardName != 'T-Jove');
	}
	if (PARAMS.uni != 'on') {
		FILTERED_TARGETES = FILTERED_TARGETES.filter(t => !t.unipersonal);
	}

	const count = FILTERED_TARGETES.map(card => 1);
	const instances = FILTERED_TARGETES.map(card => new card());

	const day = toDate(PARAMS.ini);
	const endDayTime = toDate(PARAMS.end).getTime();

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
			preu(FILTERED_TARGETES[i].preus[PARAMS.z-1], count[i])
		)
	}

	showResults(count, cost, instances, day);
}

function getUsos(date: Date): number{
	const usos = PARAMS.exceptions
		? PARAMS.exceptions[fromDate(date,true)]
		: undefined;

	return usos === undefined
		? PARAMS.dia[(date.getDay()+6)%7]
		: usos;
}

function showResults(cardsCount: number[], cost: number[], instances: Targeta[], lastDay: Date){
	const preus = getElementById('preus')!;
	
	const minCost = cost
		.filter(Boolean)
		.reduce((min, value) => value < min ? value : min, 9999);

	for (let i=0; i<FILTERED_TARGETES.length; i++) {
		if (FILTERED_TARGETES[i].zones < PARAMS.z){
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