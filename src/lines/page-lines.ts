import { createElement, getElementById, querySelectorAll } from '../lib/dom-utils';
import { goToPage } from '../utils';
import { lines, stations } from './data';
import { Line, Station } from './models';

export function init() {
  const content = getElementById('all-lines')!;

  Object.values(lines)
    .map(generateHtml)
    .forEach(element => content.appendChild(element));

  const originSelect = getElementById('origin-select')!;
  const destinationSelect = getElementById('destination-select')!;

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

  getElementById('goto-index')!.onclick = () => goToPage();
  getElementById('content')?.show();
}

function generateHtml(line: Line): HTMLElement {

  const lineDiv = createElement('div', 'line');
  lineDiv.id = line.id;

  const header = createElement('div', 'line-header', lineDiv);
  const logo = generateHtmlLogo(line);
  logo.onclick = ev => openLine(line, !ev.shiftKey)
  header.appendChild(logo);

  createElement('label', 'title', header)
    .innerHTML = getLineName(line);

  const stationsDiv = createElement('div', 'stations', lineDiv);

  createElement('div', 'color-line', stationsDiv)
    .style.backgroundColor = line.color;

  let station: Station | undefined = line.firstStation;
  while (station) {

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
        html.onclick = ev => openLine(l, !ev.shiftKey)
        other.appendChild(html)
      });

    const nextLink = station.nextStationLink(line);
    station = nextLink?.station;
  }
  
  return lineDiv;
}

function generateHtmlLogo(line: Line): HTMLSpanElement {
  const logoWrapper = createElement('span', 'logo-wrapper');
  logoWrapper.style.display = 'inline-block';

  const logo = createElement('span', 'line-logo', logoWrapper);
  logo.setAttribute('content', line.id.toUpperCase());
  logo.style.backgroundColor = line.color;

  return logoWrapper;
}

function getLineName(line: Line): string {
  return `${line.firstStation.name} &#x294A; ${line.lastStation.name}`
}

function openLine(line: Line, closeRest = true) {
  const lineElement = getElementById(line.id)!;

  const isOpened = lineElement.classList.contains('open');

  if (closeRest) {
    querySelectorAll('.line.open').forEach(a => a.classList.remove('open'));
  } else if (isOpened) {
    lineElement.classList.remove('open');
  }

  if (!isOpened) {
    lineElement.classList.add('open');
  }
}