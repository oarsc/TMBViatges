const {PARAMS, formatPrice, toDate, fromDate}  = require('./utils.js');
const {TARGETES, TJove}  = require('./targetes.js');

module.exports = {
	init: _=>{
		document.getElementById("back-button").href = "./index.html"+location.search;
	},
	load: _=>{
		if (PARAMS.nojove=="on") {
			TARGETES.splice(TARGETES.indexOf(TJove),1);
		}
		
		let count = TARGETES.map(t=>1);
		let instances = TARGETES.map(t=>new t());

		let day = toDate(PARAMS.ini);
		let endDayTime = toDate(PARAMS.end).getTime();

		while (day.getTime() < endDayTime) {

			let usos = parseInt(getUsos(day));
			for (let u=0; u<usos; u++){
				for (let i=0; i<TARGETES.length; i++) {
					let tar = instances[i];

					if (!tar.firstUsed) {
						tar.diaValidacio(day);
					}
					if (tar.caducat(day)) {
						count[i]++;
						instances[i] = tar = new TARGETES[i];
						tar.diaValidacio(day);
					}

					let res = tar.us(day);
					if (!res){
						let error = new Error("Hi ha hagut un error calculant...");
						console.log(error);
						alert(error);
						throw error;
					}
				}
			}

			day.setDate(day.getDate()+1);
		}

		let cost = [];
		for (let i=0;i<TARGETES.length;i++) {
			if (!instances[i].firstUsed) {
				count[i]--;
			}
			cost.push(preu(TARGETES[i].preus[PARAMS.z-1],count[i]))
		}

		showResults(count, cost, instances, day);
	}
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
	let content = document.getElementById("content");
	let minCost = cost.map(c=>parseFloat(c)).filter(c=>c>0).reduce((min,v)=>{
		if (v < min) {
			min = v;
		}
		return min;
	},Infinity);

	for (let i=0; i<TARGETES.length; i++) {
		if (TARGETES[i].zones < PARAMS.z){
			continue;
		}

		let temp = document.getElementById("result-template");
		let clon = temp.content.cloneNode(true);
		clon.querySelector(".head").innerHTML = TARGETES[i].nom;
		clon.querySelector(".count").innerHTML = count[i];
		clon.querySelector(".cost").innerHTML = cost[i]+" €";
		if (minCost == cost[i]) {
			clon.querySelector(".cost").className += " min";
		}

		if (count[i] > 0) {
			if (instances[i].caducat(lastDay)) {
				clon.querySelector(".no-sobres").style.display="";

			} else {
				let [sUs, sDia] = instances[i].falta(lastDay);
				let show = 0;

				clon.querySelectorAll(".dia").forEach(i=>i.innerHTML=fromDate(lastDay));

				if (sUs !== undefined) {
					show += 1;
					clon.querySelectorAll(".n-usos").forEach(i=>i.innerHTML=sUs);
				}
				if (sDia !== undefined) {
					show += 2;
					clon.querySelectorAll(".n-dies").forEach(i=>i.innerHTML=sDia);
				}
				
				clon.querySelector(show > 0? ".sobres": ".no-sobres").style.display="";

				switch (show){
					case 1: clon.querySelector(".usos").style.display=""; break;
					case 2: clon.querySelector(".dies").style.display=""; break;
					case 3: clon.querySelector(".usos-dies").style.display=""; break;
				}

			}
		}

		content.appendChild(clon);
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