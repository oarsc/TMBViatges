import { querySelectorAll } from './lib/dom-utils';

export const GET_PARAMS = (search => search.length == 0
  ? {}
  : search.substring(1).split('&')
      .reduce((acc, param) => {
        const [key, value] = param.split('=');

        acc[key] = value ? decodeURIComponent(value) : '';
        return acc;
      }, {} as Record<string, string>)
)(location.search);

export const MES_NOMS = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];

export function fromDate(date: Date, short: boolean = false): string {
  let month: number | string = date.getMonth()+1;
  let day: number | string = date.getDate();

  if (month < 10) month = '0'+month;
  if (day < 10) day = '0'+day;

  return short
    ? `${date.getFullYear()%2000}${month}${day}`
    : `${date.getFullYear()}-${month}-${day}`;
}

export function toDate(value: any): Date {
  const str = ''+value;
  if (str.length != 10 && str.length != 6) throw new Error(`Wrong date format ${value}`);

  return str.length == 6
    ? new Date(`20${str.substring(0,2)}-${str.substring(2,4)}-${str.substring(4)}`)
    : new Date(`${str.substring(0,4)}-${str.substring(5,7)}-${str.substring(8)}`);
}

export function diffDays(i: Date | string,f: Date | string): number {
  if (!(i instanceof Date)) i = new Date(i);
  if (!(f instanceof Date)) f = new Date(f);

  const diffTime = Math.abs(f.getTime() - i.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

export function formatPrice(val: number | string, symbol: string = ''): string {
  let str = `${val}`;
  let dot = str.indexOf('.');

  if (dot >= 0) {
    while(str.length-dot < 3) {
      str += '0';
    }
  }

  return symbol
    ? `${str} ${symbol}`
    : str;
}

export function exec<T>(obj: Record<string, () => T>): T | undefined {
  return Object.entries(obj)
    .filter(([page, _]) => location.pathname.indexOf(`${page}.html`) >= 0)
    .slice(0, 1)
    .map(([_, funct]) => funct())[0];
}

function generateParams(newData: Record<string, string> = {}): string {
  const currentParams = (search => search.length == 0
    ? {}
    : search.substring(1).split('&')
        .red((obj, param) => {
          const [key, value] = param.split('=');
          obj[key] = value ? decodeURIComponent(value) : '';
        }, {} as Record<string, string>)
  )(location.search);

  const data = {
    ... currentParams,
    ... newData
  };

  const params = new URLSearchParams(data).toString();
  return params? `?${params}` : '';
}

export function updateAllUrls(newData: Record<string, string> = {}, updateUrl = true): string {
  const params = generateParams(newData);

  (querySelectorAll('#header-links a, a.update-params') as HTMLAnchorElement[])
    .forEach(a => a.href = a.href.split('?')[0] + params);

  if (updateUrl) {
    const baseUrl = location.href.replace(location.search, '');
    window.history.replaceState('', '', `${baseUrl}${params}`);
  }

  return params;
}
