import { GET_PARAMS, updateAllUrls } from '../utils';
import { createElement, getElementById, removeClass, toggleClass } from '../lib/dom-utils';
import { fromYyyyMmDd, generateHtmlLogo, openLine, toYyyyMmDd, toggleLine, validateYyyyMmDd } from './common-lines';
import { lines, stations } from './data';
import { Line } from './models';

const ELEMENTS_MAP: Record<string, Record<string, HTMLElement>> = {}

export function init() {
  updateAllUrls({}, false);

  const content = getElementById('all-lines')!;

  Object.values(lines)
    .map(generateHtml)
    .forEach(element => content.appendChild(element));

  const originSelect = getElementById<HTMLSelectElement>('origin-select')!;
  const destinationSelect = getElementById<HTMLSelectElement>('destination-select')!;
  const works = getElementById<HTMLInputElement>('works')!;
  const todayBtn = getElementById<HTMLButtonElement>('today')!;
  const obresBtn = getElementById<HTMLButtonElement>('obres')!;
  const form = getElementById<HTMLFormElement>('form')!;

  Object.keys(stations).sort().forEach((key, idx) => {
    const opt = createElement('option');
    opt.textContent = key;
    opt.value = `${idx}`;
    originSelect.appendChild(opt);
  });

  Object.keys(stations).sort().forEach((key, idx) => {
    const opt = createElement('option');
    opt.textContent = key;
    opt.value = `${idx}`;
    destinationSelect.appendChild(opt);
  });

  if (GET_PARAMS.i) {
    originSelect.value = GET_PARAMS.i;
  }

  if (GET_PARAMS.f) {
    destinationSelect.value = GET_PARAMS.f;
  }

  if (GET_PARAMS.w) {
    works.value = GET_PARAMS.w;
    filterStation(GET_PARAMS.w)
  }

  works.onkeyup = ev => filterStation((ev.target as HTMLInputElement).value);
  todayBtn.onclick = ev => {
    filterStation(works.value = toYyyyMmDd());
    return false;
  }

  obresBtn.onclick = ev => {
    form.action='./obres.html';
  }

  form.onsubmit = ev => {
    if (!validateYyyyMmDd(works.value)) {
      works.value = '';
    }

    const params = [...new FormData(form)]
      .red((obj, [k, v]) => obj[k] = v as string, {} as Record<string, string>);

    const queryString = new URLSearchParams(params).toString();

    const baseUrl = location.href.replace(location.search, '');
    window.history.replaceState('', '', `${baseUrl}?${queryString}`);
  }

  getElementById('content')?.show();
}

let filteredStations = true;
function filterStation(value: string) {
  if (value && validateYyyyMmDd(value)) {
    filteredStations = false;

    const date = fromYyyyMmDd(value);

    Object.values(lines)
      .forEach(line => {
        const stations = line.getOperativeStations(date)
          .map(station => station.name)

        Object.entries(ELEMENTS_MAP[line.id])
          .forEach(([name, element]) => toggleClass(element, 'hide', stations.indexOf(name) < 0))
      })


  } else if (!filteredStations) {
    filteredStations = true;

    Object.values(lines)
      .flatMap(line => Object.values(ELEMENTS_MAP[line.id]))
      .forEach(element => removeClass(element, 'hide'))
  }
}

function generateHtml(line: Line): HTMLElement {
  const map: Record<string, HTMLElement> = {}
  ELEMENTS_MAP[line.id] = map;

  const lineDiv = createElement('div', 'line');
  lineDiv.id = line.id;

  const header = createElement('div', 'line-header', lineDiv);
  const logo = generateHtmlLogo(line);
  logo.onclick = ev => toggleLine(line, !ev.shiftKey)
  header.appendChild(logo);

  createElement('label', 'title', header)
    .innerHTML = getLineName(line);

  const stationsDiv = createElement('div', 'stations', lineDiv);

  createElement('div', 'color-line', stationsDiv)
    .style.backgroundColor = line.color;

  const stations = line.getStations();

  stations.forEach(station => {
    const stationDiv = createElement('div', 'station', stationsDiv);
    map[station.name] = stationDiv;

    const roundIcon = createElement('span', 'circle', stationDiv);
    roundIcon.style.backgroundColor = line.color;

    const stationLine = createElement('span', 'station-line', stationDiv);

    createElement('label', 'title', stationLine)
      .textContent = station.name;

    const other = createElement('span', 'other-lines', stationLine);

    station.lines
      .filter(l => l != line)
      .forEach(l => {
        const html = generateHtmlLogo(l);
        html.onclick = ev => toggleLine(l, !ev.shiftKey)
        other.appendChild(html)
      });
  });

  lineDiv.onclick = ev => {
    const target = ev.target;
    if (target && ev.target instanceof HTMLElement) {
      if (!(target as HTMLElement).classList.contains('line-logo')) {
        openLine(line, !ev.shiftKey);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
    }
    return true;
  }

  return lineDiv;
}

function getLineName(line: Line): string {
  return `${line.firstStation.name} &#x294A; ${line.lastStation.name}`
}
