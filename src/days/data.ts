import { diffDays } from '../utils';

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
  static override preus = [2.55, 3.65, 4.80, 6.15, 7.85, 9.15];
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
  static override preus = [12.15, 23.90, 32.55, 41.85, 48.10, 51.15];
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
  static override preus = [21.35, 28.75, 40.35, 49.40, 56.65, 60.70];
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
  static override preus = [42.70, 57.50, 80.70, 98.80, 113.30, 121.40];

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
  static override preus = [11.20, 17.10, 21.50, 24.00, 26.85, 30.05];

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
  static override preus = [84.80, 167.40, 227.90, 292.90, 336.65, 357.95];
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
  static override preus = [10.70, 20.30, 28.80, 37.35, 42.70, 44.85];
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
