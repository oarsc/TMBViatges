import { GET_PARAMS, updateAllUrls } from '../utils';
import { createElement, getElementById } from '../lib/dom-utils';
import { fromYyyyMmDd, generateHtmlLogo, openLine, toggleLine } from './common-lines';
import { lines, stations } from './data';
import { Line } from './models';

export function init() {
  updateAllUrls({}, false);

  const content = getElementById('all-lines')!;

  Object.values(lines)
    .map(generateHtml)
    .forEach(element => content.appendChild(element));

  const originSelect = getElementById<HTMLSelectElement>('origin-select')!;
  const destinationSelect = getElementById<HTMLSelectElement>('destination-select')!;
  const works = getElementById<HTMLInputElement>('works')!;

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
  }

  getElementById('content')?.show();
}

function generateHtml(line: Line): HTMLElement {

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

  const stations = GET_PARAMS.w
    ? line.getOperativeStations(fromYyyyMmDd(GET_PARAMS.w))
    : line.getStations();

  stations.forEach(station => {
    const stationDiv = createElement('div', 'station', stationsDiv);

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
