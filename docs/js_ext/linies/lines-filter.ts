import { createElement, getElementById, querySelectorAll } from "../dom-utils";
import { stations } from "./lines-data";
import { Line, Station } from "./lines-model";

const GET_PARAMS = (search => search.length == 0 
	? {}
	: search.substring(1).split('&')
			.reduce((acc, param) => {
				const [key, value] = param.split('=');

				acc[key] = value ? decodeURIComponent(value) : '';
				return acc;
			}, {} as Record<string, string>)
)(location.search);

let alternatives: Step[];
let page = 0;
let total = 0;

export function init() {
  getElementById('invert')!.onclick = () => {
    location.search = `?i=${GET_PARAMS.f}&f=${GET_PARAMS.i}&p=${page}`;
  }

  const allStations = Object.keys(stations).sort();

  const origin = stations[allStations[parseInt(GET_PARAMS.i)]];
  const dest = stations[allStations[parseInt(GET_PARAMS.f)]];
  if (GET_PARAMS.p) {
    page = parseInt(GET_PARAMS.p);
  }

  alternatives = findAlternatives(origin, dest);
  drawMenu();
  drawAlternative(alternatives[page]);

  getElementById('logo')!.onclick = () => { location.href = './' };
  getElementById('content')?.show();
}

interface Step {
  line: Line,
  stations: Station[],
  distance: number,
  transshipments: number,

  forward: boolean,
  lines: Line[],
  done: boolean
}

function findAlternatives(origin: Station, destination: Station): Step[] {
  if (origin == destination) {
    return [{
      line: origin.lines[0],
      stations: [origin],
      distance: 0,
      transshipments: 0,
      forward: true,
      lines: [origin.lines[0]],
      done: true,
    }]
  }

  const finalSteps: Step[] = []
  let pendingSteps = origin.lines
    .flatMap<Step>(line => [
      {
        line,
        stations: [origin],
        distance: 0,
        transshipments: 0,
        forward: true,
        lines: [line],
        done: false,
      },
      {
        line,
        stations: [origin],
        distance: 0,
        transshipments: 0,
        forward: false,
        lines: [line],
        done: false,
      }
    ]);

  while (pendingSteps.length && finalSteps.length < 100) {
    pendingSteps = pendingSteps
      .flatMap(step => nextSteps(step, destination))
      .filter(step => {
        if (step.done) {
          finalSteps.push(step);
        }
        return !step.done;
      });
  }

  const minTransshipments = 2 + finalSteps.reduce((min, v) => min < v.transshipments ? min : v.transshipments, 500);

  return finalSteps
    .filter(a => a.transshipments <= minTransshipments)
    .sort((a,b) => a.distance - b.distance)
    .sort((a,b) => a.transshipments - b.transshipments);
}

function nextSteps(step: Step, destination: Station): Step[] {
  const currentStation = step.stations.slice(-1)[0];
  const next = step.forward
    ? currentStation.nextStationLink(step.line)
    : currentStation.prevStationLink(step.line);

  if (!next) return [];

  const distance = step.distance + next.distance;
  const station = next.station;

  if (station == destination) {
    return [{
      line: step.line,
      stations: [...step.stations, station],
      distance: distance,
      transshipments: step.transshipments,
      forward: step.forward,
      lines: [...step.lines, step.line],
      done: true
    }];
  }

  const steps = station.lines
    .filter(line => step.lines.indexOf(line) < 0)
    .flatMap<Step>(line => [
      {
        line,
        stations: [...step.stations, station],
        distance: distance,
        transshipments: step.transshipments + 1,
        forward: true,
        lines: [...step.lines, line],
        done: false
      },
      {
        line,
        stations: [...step.stations, station],
        distance: distance,
        transshipments: step.transshipments + 1,
        forward: false,
        lines: [...step.lines, line],
        done: false
      }
    ]);

  return [
    {
      line: step.line,
      stations: [...step.stations, station],
      distance: distance,
      transshipments: step.transshipments,
      forward: step.forward,
      lines: [...step.lines, step.line],
      done: false
    },
    ...steps
  ];
}








function drawMenu() {
  const transSelect = getElementById<HTMLSelectElement>('transshipments')!;
  const numPage = getElementById('num')!;
  const totalPages = getElementById('total')!;

  numPage.textContent = `${page + 1}`;
  total = alternatives.length;
  totalPages.textContent = `${total}`;

  alternatives
    .map(v => v.transshipments)
    .unique()
    .sort()
    .map(trans => {
      const option = createElement('option')
      option.value = `${trans}`;
      option.textContent = trans == 1 ? `${trans} transbord` : `${trans} transbords`;
      return option;
    })
    .forEach(option => transSelect.appendChild(option));

  transSelect.onchange = () => {
    const trans = parseInt(transSelect.value);
    page = 0;
    numPage.textContent = `${page + 1}`;

    total = trans < 0
      ? alternatives.length
      : alternatives.filter(v => v.transshipments == trans).length;

    totalPages.textContent = `${total}`;

    if (trans < 0) {
      drawAlternative(alternatives[page]);
    } else {
      drawAlternative(alternatives.find(v => v.transshipments == trans)!);
    }
  }


  getElementById('prevPage')!.onclick = () => {
    if (page > 0) {
      page--;
      numPage.textContent = `${page + 1}`;

      const trans = parseInt(transSelect.value);
      if (trans < 0) {
        drawAlternative(alternatives[page]);
      } else {
        const alts = alternatives.filter(v => v.transshipments == trans)
        drawAlternative(alts[page]);
      }
      updateUrl();
    }
  };

  getElementById('nextPage')!.onclick = () => {
    if (page < total-1) {
      page++;
      numPage.textContent = `${page + 1}`;

      const trans = parseInt(transSelect.value);
      if (trans < 0) {
        drawAlternative(alternatives[page]);
      } else {
        const alts = alternatives.filter(v => v.transshipments == trans)
        drawAlternative(alts[page]);
      }
      updateUrl();
    }
  };
}

function drawAlternative(step: Step) {
  const stations: Record<string, Station[]> = {};
  const lines = step.lines.unique();

  getElementById('distance')!.textContent = `${(step.distance/1000).toFixed(1)}`;
  getElementById('stops')!.textContent = `${step.stations.length - 1}`;

  const content = getElementById('alternative')!;
  content.clear();

  let lastLineId: string = '';
  for (let i = 0; i < step.lines.length; i++) {
    const lineId = step.lines[i].id;
    if (stations[lineId]) {
      stations[lineId].push(step.stations[i]);

    } else {
      if (lastLineId) {
        stations[lastLineId].push(step.stations[i]);
      }
      stations[lineId] = [step.stations[i]];
    }
    lastLineId = lineId;
  }

  lines.forEach(line => {
    const element = generateHtml(line, stations[line.id], lines);
    content.appendChild(element);
  });

  openLine(lines[0]);
}



function generateHtml(line: Line, stations: Station[], linesAvailable: Line[]): HTMLElement {

  const lineDiv = createElement('div', 'line');
  lineDiv.id = line.id;

  const header = createElement('div', 'line-header', lineDiv);
  const logo = generateHtmlLogo(line);
  logo.onclick = () => openLine(line)
  header.appendChild(logo);

  createElement('label', 'title', header)
    .innerHTML = getLineName(line, stations);

  const stationsDiv = createElement('div', 'stations', lineDiv);

  createElement('div', 'color-line', stationsDiv)
    .style.backgroundColor = line.color;
  
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

        if (linesAvailable.indexOf(l) >= 0) {
          html.onclick = () => openLine(l);
        } else {
          html.classList.add('faded');
        }

        other.appendChild(html)
      });
  });
  
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

function getLineName(line: Line, stations: Station[]): string {
  const firstStation = stations[0];
  const [ lastStation ] = stations.slice(-1);


  let station = line.firstStation;
  let name: string | undefined;
  while (!name) {
    if (station == firstStation) {
      name = line.lastStation.name;
    } else if (station == lastStation) {
      name = line.firstStation.name;
    } else {
      station = station.nextStationLink(line)!.station;
    }
  }



  return `&#x2933; ${name}`
}

function openLine(line: Line) {
  const lineElement = getElementById(line.id)!;

  const isOpened = lineElement.classList.contains('open');

  querySelectorAll('.line.open').forEach(a => a.classList.remove('open'));
  if (!isOpened) {
    lineElement.classList.add('open');
  }
}

function updateUrl() {
  window.history.pushState('', '', `./linies-filter.html?i=${GET_PARAMS.i}&f=${GET_PARAMS.f}&p=${page}`);
}