import { getElementById, querySelector, querySelectorAll, createElement, getElementsByClassName } from '../lib/dom-utils';
import { diffDays, formatPrice, toDate, fromDate, updateAllUrls, GET_PARAMS } from '../utils';
import { DAY_PARAMS, encData } from './common-days';

import { TARGETES, Targeta } from './data';
import { ParamsModel } from './models';

declare global {
  interface HTMLTableRowElement {
    class: typeof Targeta;
  }
}

export function init(): boolean {
  updateAllUrls({}, false);

  const uniCheckbox = getElementById<HTMLInputElement>('uni')!;
  uniCheckbox.onchange = () => {
    const jove = getElementById<HTMLInputElement>('jove')!;
    const uni = jove.disabled = uniCheckbox.checked;
    if (uni) {
      jove.checked = false;
    }
  };

  return true;
}

export function load() {
  const tbodyTargetes = querySelector('#tickets tbody')!;

  // CONSTRUIR TAULA DE TARGETES:
  let totalZones = 0;
  TARGETES.map(card => {
    const row = createElement('tr', 'ticket');
    row.class = card;

    const tName = createElement('td', 'nom');
    tName.textContent = card.cardName;

    const tPreu = createElement('td', 'preu');
    tPreu.textContent = formatPrice(card.preus[0], '€');

    row.appendChild(tName);
    row.appendChild(tPreu);

    if (card.zones > totalZones) {
      totalZones = card.zones;
    }

    return row;

  }).forEach(t => tbodyTargetes.appendChild(t));


  ([...tbodyTargetes.removeChild(tbodyTargetes.firstElementChild!).children] as HTMLTableCellElement[])
    .forEach(item => {
      item.rowSpan = TARGETES.length;
      tbodyTargetes.firstElementChild!.appendChild(item);
    });

  // CONSTUIR COMBO DE ZONES:
  const zonesSelect = getElementById<HTMLSelectElement>('zones-selector')!;
  zonesSelect.clear();

  zonesSelect.onchange = ev => {
    actualitzarPreus(parseInt(zonesSelect.value))
    updateAllUrls({d: encData(loadOutputData())});
  };

  for (let i = 1; i <= totalZones; i++) {
    const option = createElement('option');
    option.textContent = 'Zona '+i;
    option.value = `${i}`;
    zonesSelect.appendChild(option);
  }

  // CONFIGURAR AVUI COM A PRIMER DIA
  const dateIni = getElementById<HTMLInputElement>('dateini')!;
  const dateEnd = getElementById<HTMLInputElement>('dateend')!;
  const addDays = getElementById<HTMLInputElement>('adddays')!;

  let today = new Date();
  dateIni.value = fromDate(today);
  today.setDate(today.getDate()+parseInt(addDays.value));
  dateEnd.value = fromDate(today);

  dateIni.onblur =
  addDays.onchange =
  addDays.onkeyup = () => {
    const validDates = checkValidityDates(dateIni);

    if (validDates) {
      const diff = parseInt(addDays.value) ?? 0;
      const initDate = toDate(dateIni.value);
      initDate.setDate(initDate.getDate() + diff);
      dateEnd.value = fromDate(initDate);
      updateAllUrls({d: encData(loadOutputData())});
    }
  }

  dateEnd.onblur = ev => {
    const validDates = checkValidityDates(dateEnd) && checkValidityDates(dateIni);
  
    if (validDates) {
      const diff = diffDays(toDate(dateIni.value), toDate(dateEnd.value));
      addDays.value = `${diff}`;
      updateAllUrls({d: encData(loadOutputData())});
    }
  }

  getElementsByClassName('week-days')
    .forEach(day => day.onchange = () => updateAllUrls({d: encData(loadOutputData())}))

  loadEntryData();

  if (!GET_PARAMS.d) {
    const defaultConfig = encData(loadOutputData());

    const params = location.search.length
      ? `${location.search}&d=${defaultConfig}`
      : `?d=${defaultConfig}`;

    ([...querySelectorAll('a.update-params')] as HTMLAnchorElement[])
      .forEach(a => a.href = a.href.split('?')[0] + params);
  }
}

function actualitzarPreus(zona: number) {
  querySelectorAll('#tickets .ticket')
    .map(tr => tr as HTMLTableRowElement)
    .forEach(row => {
      querySelector('.preu', row)!.textContent = row.class.zones < zona? '' : formatPrice(row.class.preus[zona-1], '€');
    });
}


function loadEntryData(){
  function ifSetValue(id: string, value: number | string | undefined) {
    if (value != undefined) {
      const el = getElementById<HTMLInputElement>(id);
      if (el) el.value = `${value}`;
    }
  }

  function ifSetChecked(id: string, value: string | undefined) {
    if (value) {
      const el = getElementById<HTMLInputElement>(id);
      if (el)	el.checked = value=='on';
    }
  }

  if (DAY_PARAMS.dia) {
    ifSetValue('dill', DAY_PARAMS.dia[0]);
    ifSetValue('dima', DAY_PARAMS.dia[1]);
    ifSetValue('dime', DAY_PARAMS.dia[2]);
    ifSetValue('dijo', DAY_PARAMS.dia[3]);
    ifSetValue('dive', DAY_PARAMS.dia[4]);
    ifSetValue('diss', DAY_PARAMS.dia[5]);
    ifSetValue('dium', DAY_PARAMS.dia[6]);
  }

  ifSetValue('dateini', DAY_PARAMS.ini);
  ifSetValue('dateend', DAY_PARAMS.end);

  if (DAY_PARAMS.ini && DAY_PARAMS.end) {
    getElementById<HTMLInputElement>('adddays')!.value = '' + diffDays(DAY_PARAMS.ini, DAY_PARAMS.end);
  }

  ifSetValue('exceptions', JSON.stringify(DAY_PARAMS.exceptions));
  ifSetValue('zones-selector', DAY_PARAMS.z);

  ifSetChecked('jove',DAY_PARAMS.jove);
  ifSetChecked('uni', DAY_PARAMS.uni == undefined? 'on' : DAY_PARAMS.uni);
  if (!getElementById<HTMLInputElement>('uni')!.checked) {
    getElementById<HTMLInputElement>('jove')!.disabled = true;
  }

  const zonesSelector = getElementById<HTMLSelectElement>('zones-selector')!;
  actualitzarPreus(parseInt(zonesSelector.value))
}

function loadOutputData() : ParamsModel {
  const form = getElementById<HTMLFormElement>('form');

  return (querySelectorAll('select,input', form) as Array<HTMLSelectElement | HTMLInputElement>)
    .filter(el => el.name)
    .sort((a,b) => a.name > b.name? 1 : a.name < b.name? -1 : 0)
    .reduce((obj,el)=>{
      if (el.type != 'checkbox') {

        if (el.name.match(/^d\d$/)) {

          if (obj.dia) obj.dia.push(parseInt(el.value));
          else obj.dia = [parseInt(el.value)];

        } else if (el.name == 'exceptions') {
          obj['exceptions'] = JSON.parse(el.value);
        } else {
          obj[el.name] = el.value;
        }

      } else if (el instanceof HTMLInputElement) {
        obj[el.name] = el.checked ? 'on' : 'off';
      }

      return obj;
    }, {} as any) as ParamsModel;
}



// SUPPORT FUNCTIONS:
function checkValidityDates(...args: HTMLInputElement[]): boolean {
  let validDates = true;

  [...args].forEach(dateInput => {
    const date = toDate(dateInput.value);

    if (!date || isNaN(date.getTime())) {
      validDates = false;
      dateInput.setCustomValidity('Invalid date');
    } else {
      dateInput.setCustomValidity('');
    }
  });

  return validDates;
}
