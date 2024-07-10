import { createElement, getElementById } from '../lib/dom-utils';
import { updateAllUrls } from '../utils';
import { generateHtmlLogo, toYyyyMmDd } from './common-lines';
import { Work, lines, works } from './data';


export function init() {
  updateAllUrls({}, false);

  const content = getElementById('alternative')!;

  works
    .sort((a, b) => a.start < b.start? -1 : a.start > b.start ? 1 : 0)
    .map(generateHtml)
    .forEach(element => content.appendChild(element));
}


function generateHtml(work: Work): HTMLElement {
  const element = createElement('span', 'work');

  const line = lines[work.line];

  const header = createElement('div', 'line-header', element);
  const logo = generateHtmlLogo(line);
  header.appendChild(logo);

  const startDate = createElement('span', 'start-header', header);
  const endDate = createElement('span', 'end-header', header);

  startDate.textContent = toYyyyMmDd(work.start);
  endDate.textContent = toYyyyMmDd(work.end);

  const affected = createElement('div', 'stations', element);

  createElement('div', 'color-line', affected)
  .style.backgroundColor = line.color;

  work.stations.forEach(station => {
    const stationDiv = createElement('div', 'station', affected);

    const roundIcon = createElement('span', 'circle', stationDiv);
    roundIcon.style.backgroundColor = line.color;

    const stationLine = createElement('span', 'station-line', stationDiv);

    createElement('label', 'title', stationLine)
      .textContent = station;
  });



  return element;
}