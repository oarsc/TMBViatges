const {diffDays}  = require('./utils.js');
const TARGETES = [];


class Targeta {
	static get zones(){
		return 6;
	}
	static get unipersonal(){
		return false;
	}
	constructor(){
		this.firstUsed = false;
	}
	diaValidacio(data){ this.firstUsed = true; }
	us(dia){ return false; }
	caducat(dia){ return true; }
	falta(dia) { return [undefined,undefined]; }
}


// ###############################
// ######################### T-10:
class T10 extends Targeta{
	static get nom(){
		return "T-10";
	}
	static get preus(){
		return [10.20, 20.10, 27.40, 35.25, 40.50, 43.05];
	}
	constructor(){
		super();
		this.usos = 10;
	}
	us(dia) {
		this.usos--;
		return this.usos >= 0;
	}
	caducat(dia) {
		return this.usos <= 0;
	}
	falta(dia){
		return [this.usos, undefined];
	}
}


// ###############################
// ######################## T-Mes:
class TMes extends Targeta{
	static get nom(){
		return "T-Mes";
	}
	static get preus(){
		return [54, 72.70, 102, 124.90, 143.35, 153.55];
	}
	static get unipersonal(){
		return true;
	}
	diaValidacio(data){
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+30)
		this.dataFinal.setHours(0);
		this.dataFinal.setMinutes(0);
		this.dataFinal.setSeconds(0);
		this.dataFinal.setMilliseconds(0);
	}
	us(dia) {
		return this.dataFinal.getTime() > dia.getTime();
	}
	caducat(dia) {
		return this.dataFinal.getTime() < dia.getTime();
	}
	falta(dia){
		return [undefined, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ################## T-Trimestre:
class TTrimestre extends TMes{
	static get nom(){
		return "T-Trimestre";
	}
	static get preus(){
		return [145.30, 196.50, 275.25, 337.15, 386.80, 414.40];
	}
	diaValidacio(data){
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+90)
		this.dataFinal.setHours(0);
		this.dataFinal.setMinutes(0);
		this.dataFinal.setSeconds(0);
		this.dataFinal.setMilliseconds(0);
	}
	falta(dia){
		return [undefined, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ####################### T-Jove:
class TJove extends TTrimestre{
	static get nom(){
		return "T-Jove";
	}
	static get preus(){
		return [105, 142, 199.20, 244, 280, 300];
	}
}


// ###############################
// ###################### T-50/30:
class T5030 extends TMes{
	static get zones(){
		return 1;
	}
	static get nom(){
		return "T-50/30";
	}
	static get preus(){
		return [43.50];
	}
	constructor(){
		super();
		this.usos = 50;
	}
	us(dia) {
		this.usos--;
		return this.dataFinal.getTime() > dia.getTime() && this.usos >= 0;
	}
	caducat(dia) {
		return this.dataFinal.getTime() < dia.getTime() || this.usos <= 0;
	}
	falta(dia){
		return [this.usos, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ###################### T-70/30:
class T7030 extends T5030{
	static get zones(){
		return 6;
	}
	static get nom(){
		return "T-70/30";
	}
	static get preus(){
		return [145.30, 196.50, 275.25, 337.15, 386.80, 414.40];
	}
	static get unipersonal(){
		return false;
	}
	constructor(){
		super();
		this.usos = 70;
	}
	falta(dia){
		return [this.usos, diffDays(dia, this.dataFinal)];
	}
}


TARGETES.push(T10,TMes,TTrimestre,TJove,T5030,T7030);

module.exports = TARGETES.reduce((obj,t)=>{
	obj[t.name] = t;
	return obj
},{})

module.exports.TARGETES = TARGETES;