const {exceptions, PARAMS, MES_NOMS, toDate, fromDate, encData}  = require('./utils.js');

let initDate;
let endDate;

module.exports = {
	init: _=>{
		document.getElementById("back-button-footer").href = 
		document.getElementById("back-button").href = "./index.html"+location.search;
		document.getElementById("submit").onclick=submit;
	},
	load: _=>{
		initDate = toDate(PARAMS.ini);
		endDate = toDate(PARAMS.end);

		let endMonth = endDate.getMonth();
		let endYear = endDate.getYear();

		let date = new Date(initDate);
		while (date.getYear() < endYear || date.getMonth() <= endMonth) {
			cargarMes(date);
			date.setMonth(date.getMonth()+1);
			date.setDate(1);
		}

		document.querySelectorAll(".dow.visible input").forEach(e=>e.onblur=blurEvent);
	}
}

function cargarMes(date){
	date = new Date(date);
	let month = date.getMonth();
	let year = date.getFullYear();

	let temp = document.getElementById("month");
	let clon = temp.content.cloneNode(true);

	clon.querySelector(".month-name").textContent = MES_NOMS[month]+" "+year;

	cargarSetmanes(date, clon.querySelector("tbody"));

	document.getElementById("mesos").appendChild(clon);
}

function cargarSetmanes(date, mes){
	let thisMonth = date.getMonth();
	let week;

	while(date.getMonth() == thisMonth && date.getTime() < endDate.getTime()) {
		if (!week || date.getDay()==1){
			if (week) mes.appendChild(week)
			week = newWeek();
		}
		fillDay(week.querySelector(".d"+(date.getDay()+6)%7), date);
		date.setDate(date.getDate()+1);
	}
	mes.appendChild(week);
}

function newWeek(){
	let temp = document.getElementById("week");
	return temp.content.cloneNode(true);	
}

function fillDay(dayElement, date) {
	let def = usosDefault(date);
	let usos = getUsos(date);

	dayElement.querySelector(".dianum").textContent = date.getDate();
	dayElement.querySelector("input").value=usos;
	dayElement.className += " visible" + (def==usos?" def":"");
	dayElement.setAttribute("date",fromDate(date));
	dayElement.setAttribute("def",def);
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
	let def = td.getAttribute("def");
	let usos = ev.target.value;
	if (def == usos) {
		if (td.className.indexOf(" def")<0) td.className += " def";
	} else {
		if (td.className.indexOf(" def")>=0) td.className = td.className.replace(/ ?def/,"");
	}
}

function submit(){
	dows = [...document.querySelectorAll(".dow.visible")]
		.map(d=> [toDate(d.getAttribute("date")), d.querySelector("input").value])
		.filter(([date, value])=> PARAMS.dia[(date.getDay()+6)%7] != value)
		.reduce((obj,[date, value])=>{
			obj[fromDate(date,true)] = value;
			return obj;
		},{});


	PARAMS.exceptions = dows;

	let backButtonFooter = document.getElementById("back-button-footer");
	backButtonFooter.href = backButtonFooter.href.replace(/\?.*$/,'?d='+encData(PARAMS));
	backButtonFooter.click();
}