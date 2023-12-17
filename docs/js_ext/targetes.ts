import { diffDays } from './utils';

export class Targeta {
	static cardName: string;
	static preus: number[];
	static zones = 6;
	static unipersonal = true;
	firstUsed = false;

	diaValidacio(data: Date) {
		this.firstUsed = true;
	}
	us(dia: Date): boolean {
		return false;
	}
	hasExpired(dia: Date): boolean {
		return true;
	}
	falta(dia: Date): [number | undefined, number | undefined] {
		return [undefined, undefined];
	}
}

// ###############################
// ############## Bitllet Senzill:
class Senzill extends Targeta {

	static override unipersonal = false;
	static override cardName = 'Bitllet Senzill';
	static override preus = [2.40, 3.40, 4.50, 5.75, 7.35, 8.55];
	usada = false;

	override us(dia: Date): boolean {
		let eraNova = !this.usada;
		this.usada = true;
		return eraNova;
	}
	override hasExpired(dia: Date): boolean {
		return this.usada;
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [this.usada?0:1, undefined];
	}
}

// ###############################
// ##################### T-Casual:
class TCasual extends Targeta {

	static override cardName = 'T-Casual';
	static override preus = [11.35, 22.40, 30.50, 39.20, 45.05, 47.90];
	usos = 10;

	override us(dia: Date): boolean {
		this.usos--;
		return this.usos >= 0;
	}
	override hasExpired(dia: Date): boolean {
		return this.usos <= 0;
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [this.usos, undefined];
	}
}


// ###############################
// ###################### T-Usual:
class TUsual extends Targeta {

	static override cardName = 'T-Usual';
	static override preus = [20, 26.95, 37.80, 46.30, 53.10, 56.90];
	dataFinal!: Date;

	override diaValidacio(data: Date) {
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+30)
		this.dataFinal.setHours(0);
		this.dataFinal.setMinutes(0);
		this.dataFinal.setSeconds(0);
		this.dataFinal.setMilliseconds(0);
	}
	override us(dia: Date): boolean {
		return this.dataFinal.getTime() > dia.getTime();
	}
	override hasExpired(dia: Date): boolean {
		return this.dataFinal.getTime() < dia.getTime();
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [undefined, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ####################### T-Jove:
class TJove extends TUsual {

	static override cardName = 'T-Jove';
	static override preus = [40.00, 52.60, 73.80, 90.40, 103.70, 111.15];

	override diaValidacio(data: Date) {
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+90)
		this.dataFinal.setHours(0);
		this.dataFinal.setMinutes(0);
		this.dataFinal.setSeconds(0);
		this.dataFinal.setMilliseconds(0);
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [undefined, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ######################## T-Dia:
class TDia extends TUsual {

	static override cardName = 'T-Dia';
	static override preus = [10.50, 16.00, 20.10, 22.45, 25.15, 28.15];

	override diaValidacio(data: Date) {
		super.diaValidacio(data);
		this.dataFinal = new Date(data);
		this.dataFinal.setDate(this.dataFinal.getDate()+1)
		this.dataFinal.setHours(0);
		this.dataFinal.setMinutes(0);
		this.dataFinal.setSeconds(0);
		this.dataFinal.setMilliseconds(0);
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [undefined, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ####################### T-Grup:
class TGrup extends TUsual {

	static override unipersonal = false;
	static override cardName = 'T-Grup';
	static override preus = [79.45, 156.80, 213.50, 274.40, 315.35, 335.30];
	usos = 70;

	override us(dia: Date): boolean {
		this.usos--;
		return this.dataFinal.getTime() > dia.getTime() && this.usos >= 0;
	}
	override hasExpired(dia: Date): boolean {
		return this.dataFinal.getTime() < dia.getTime() || this.usos <= 0;
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [this.usos, diffDays(dia, this.dataFinal)];
	}
}


// ###############################
// ################### T-Familiar:
class TFamiliar extends TUsual {

	static override unipersonal = false;
	static override cardName = 'T-Familiar';
	static override preus = [10.00, 19.00, 27.00, 35.00, 40.00, 42.00];
	usos = 8;

	override us(dia: Date): boolean {
		this.usos--;
		return this.dataFinal.getTime() > dia.getTime() && this.usos >= 0;
	}
	override hasExpired(dia: Date): boolean {
		return this.dataFinal.getTime() < dia.getTime() || this.usos <= 0;
	}
	override falta(dia: Date): [number | undefined, number | undefined] {
		return [this.usos, diffDays(dia, this.dataFinal)];
	}
}

export const TARGETES: Array<typeof Targeta> = [Senzill, TFamiliar, TDia, TCasual, TUsual, TJove, TGrup];
