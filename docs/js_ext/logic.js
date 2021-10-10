import { getElementById, getElementsByClassName, addClass, generateFromTemplate } from './dom-utils';
import { PARAMS, formatPrice, toDate, fromDate, goToPage } from './utils';

import { TARGETES } from './targetes';
let FILTERED_TARGETES;

export function init() {
	let errorMessage;
	if (!PARAMS.ini)      errorMessage = '0xae34fa';
	else if (!PARAMS.end) errorMessage = '0x1e98e9';
	else if (!PARAMS.z)   errorMessage = '0x681a55';
	else if (!PARAMS.dia || PARAMS.dia.length != 7) errorMessage = '0x13610f';

	if (errorMessage) {
		let errorElement = getElementById('error-message');
		errorElement.textContent = `An error ocurred [${errorMessage}]`;
		errorElement.show();
		return false;
	}

	getElementsByClassName('back-button').forEach(a => a.onclick = _ => goToPage());
	getElementById('logo').onclick = _ => goToPage();
}

export function load() {
	FILTERED_TARGETES = TARGETES;
	if (PARAMS.jove!='on') {
		FILTERED_TARGETES = FILTERED_TARGETES.filter(t => t.nom!='T-Jove');
	}
	if (PARAMS.uni!='on') {
		FILTERED_TARGETES = FILTERED_TARGETES.filter(t => !t.unipersonal);
	}

	let count = FILTERED_TARGETES.map(t=>1);
	let instances = FILTERED_TARGETES.map(t=>new t());

	let day = toDate(PARAMS.ini);

	let endDayTime = toDate(PARAMS.end).getTime();

	while (day.getTime() < endDayTime) {

		let usos = parseInt(getUsos(day));
		for (let u=0; u<usos; u++){
			for (let i=0; i<FILTERED_TARGETES.length; i++) {
				let tar = instances[i];

				if (!tar.firstUsed) {
					tar.diaValidacio(day);
				}
				if (tar.caducat(day)) {
					count[i]++;
					instances[i] = tar = new FILTERED_TARGETES[i];
					tar.diaValidacio(day);
				}

				let res = tar.us(day);
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

	let cost = [];
	for (let i=0;i<FILTERED_TARGETES.length;i++) {
		if (!instances[i].firstUsed) {
			count[i]--;
		}
		cost.push(preu(FILTERED_TARGETES[i].preus[PARAMS.z-1],count[i]))
	}

	showResults(count, cost, instances, day);
}

function getUsos(date){
	let usos;
	if (PARAMS.exceptions) {
		usos = PARAMS.exceptions[fromDate(date,true)];
	}
	if (usos === undefined) {
		usos = PARAMS.dia[(date.getDay()+6)%7];
	}
	return usos;
}

function showResults(count, cost, instances, lastDay){
	let content = getElementById('content');
	let preus = getElementById('preus');
	
	let minCost = cost.map(c=>parseFloat(c)).filter(c=>c>0).reduce((min,v)=>{
		if (v < min) {
			min = v;
		}
		return min;
	},Infinity);

	for (let i=0; i<FILTERED_TARGETES.length; i++) {
		if (FILTERED_TARGETES[i].zones < PARAMS.z){
			continue;
		}

		let clon = generateFromTemplate('result-template');
		clon.querySelector('.head').textContent = FILTERED_TARGETES[i].nom;
		clon.querySelector('.count').textContent = count[i];
		clon.querySelector('.cost').textContent = cost[i]+' €';
		if (minCost == cost[i]) {
			addClass(clon.querySelector('.cost'), 'min');
		}

		if (count[i] > 0) {
			if (instances[i].caducat(lastDay)) {
				clon.querySelector('.no-sobres').show();

			} else {
				let [sUs, sDia] = instances[i].falta(lastDay);
				let show = 0;

				clon.querySelectorAll('.dia').forEach(i=>i.textContent=fromDate(lastDay));

				if (sUs !== undefined) {
					show += 1;
					clon.querySelectorAll('.n-usos').forEach(i=>i.textContent=sUs);
				}
				if (sDia !== undefined) {
					show += 2;
					clon.querySelectorAll('.n-dies').forEach(i=>i.textContent=sDia);
				}
				
				clon.querySelector(show > 0? '.sobres': '.no-sobres').show();

				switch (show){
					case 1: clon.querySelector('.usos').show(); break;
					case 2: clon.querySelector('.dies').show(); break;
					case 3: clon.querySelector('.usos-dies').show(); break;
				}
			}
		}

		preus.appendChild(clon);
	}
}

function preu(val, count){
	if (val == undefined) return 0;

	val = Math.round(val*100);
	let cost = 0;
	for (let i=0; i<count; i++) {
		cost+=val;
	}
	return formatPrice(cost/100);
}