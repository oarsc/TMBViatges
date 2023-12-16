import { diffDays } from './utils';

class Targeta {
	static get zones(){
		return 6;
	}
	static get unipersonal(){
		return true;
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
// ############## Bitllet Senzill:
class Senzill extends Targeta{
	static get nom(){
		return 'Bitllet Senzill';
	}
	static get preus(){
		return [2.40, 3.40, 4.50, 5.75, 7.35, 8.55];
	}
	static get unipersonal(){
		return false;
	}
	constructor(){
		super();
		this.usada = false;
	}
	us(dia) {
		let eraNova = !this.usada;
		this.usada = true;
		return eraNova;
	}
	caducat(dia) {
		return this.usada;
	}
	falta(dia){
		return [this.usada?0:1, undefined];
	}
}

// ###############################
// ##################### T-Casual:
class TCasual extends Targeta{
	static get nom(){
		return 'T-Casual';
	}
	static get preus(){
		return [11.35, 22.40, 30.50, 39.20, 45.05, 47.90];
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
// ###################### T-Usual:
class TUsual extends Targeta{
	static get nom(){
		return 'T-Usual';
	}
	static get preus(){
		return [20, 26.95, 37.80, 46.30, 53.10, 56.90];
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
// ####################### T-Jove:
class TJove extends TUsual{
	static get nom(){
		return 'T-Jove';
	}
	static get preus(){
		return [40.00, 52.60, 73.80, 90.40, 103.70, 111.15];
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
// ######################## T-Dia:
class TDia extends TUsual{
	static get nom(){
		return 'T-Dia';
	}
	static get preus(){
		return [10.50, 16.00, 20.10, 22.45, 25.15, 28.15];
	}
	diaValidacio(data){
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+1)
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
// ####################### T-Grup:
class TGrup extends TUsual{
	static get nom(){
		return 'T-Grup';
	}
	static get preus(){
		return [79.45, 156.80, 213.50, 274.40, 315.35, 335.30];
	}
	static get unipersonal(){
		return false;
	}
	constructor(){
		super();
		this.usos = 70;
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
// ################### T-Familiar:
class TFamiliar extends TUsual{
	static get nom(){
		return 'T-Familiar';
	}
	static get preus(){
		return [10.00, 19.00, 27.00, 35.00, 40.00, 42.00];
	}
	static get unipersonal(){
		return false;
	}
	constructor(){
		super();
		this.usos = 8;
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


export const TARGETES = [Senzill,TFamiliar,TDia,TCasual,TUsual,TJove,TGrup];