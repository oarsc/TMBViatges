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
  static override preus = [2.65, 3.80, 4.95, 6.35, 8.10, 9.45];
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
  static override preus = [12.55, 24.65, 33.55, 43.15, 49.55, 52.70];
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
  static override preus = [22.00, 29.65, 41.60, 50.90, 58.35, 62.55];
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
  static override preus = [44.00, 44.00, 44.00, 44.00, 44.00, 44.00];

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
  static override preus = [11.55, 17.65, 22.15, 24.75, 27.70, 31.00];

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
  static override preus = [87.35, 172.45, 234.75, 301.70, 346.75, 368.70];
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
  static override preus = [11.05, 20.95, 29.70, 38.50, 44.00, 46.20];
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
