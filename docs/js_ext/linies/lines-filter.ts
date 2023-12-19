import { createElement, getElementById, querySelectorAll, toggleClass } from "../dom-utils";
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
let linearView = true;

export function init() {
  const invertArrow = getElementById('arrow')!;
  invertArrow.onmouseenter = () => invertArrow.innerHTML = '&#x21E0;';
  invertArrow.onmouseleave = () => invertArrow.innerHTML = '&#x21E2;';
  invertArrow.onclick = () => {
    location.search = `?i=${GET_PARAMS.f}&f=${GET_PARAMS.i}&p=${page}${linearView? '' : '&v=0'}`;
  }

  const allStations = Object.keys(stations).sort();

  const origin = stations[allStations[parseInt(GET_PARAMS.i)]];
  const dest = stations[allStations[parseInt(GET_PARAMS.f)]];
  if (GET_PARAMS.p) {
    page = parseInt(GET_PARAMS.p);
  }
  linearView = GET_PARAMS.v !== '0';

  getElementById('origin')!.textContent = origin.name;
  getElementById('destination')!.textContent = dest.name;

  alternatives = findAlternatives(origin, dest);
  drawMenu();
  drawAlternative(alternatives[page]);

  getElementById('change-view')!.onclick = () => changeView(true);
  getElementById('logo')!.onclick = () => { location.href = './linies.html' };
  getElementById('goto-index')!.onclick = () => { location.href = './' };
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

  while (pendingSteps.length) {
    pendingSteps = pendingSteps
      .flatMap(step => nextSteps(step, destination))
      .filter(step => {
        if (step.done) {
          finalSteps.push(step);
        }
        return !step.done;
      });
  }

  return finalSteps
    .sort((a,b) => a.distance - b.distance)
    .sort((a,b) => a.transshipments - b.transshipments);
}

function nextSteps(step: Step, destination: Station): Step[] {
  const [ currentStation ] = step.stations.slice(-1);

  const next = step.forward
    ? currentStation.nextStationLink(step.line)
    : currentStation.prevStationLink(step.line);

  if (!next) return [];

  const distance = step.distance + next.distance;
  const station = next.station;

  if (step.stations.indexOf(station) >= 0) return [];

  if (station == destination) {
    return [{
      ...step,
      stations: [...step.stations, station],
      distance: distance,
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
      ...step,
      stations: [...step.stations, station],
      distance: distance,
      transshipments: step.transshipments,
      lines: [...step.lines, step.line],
    },
    ...steps
  ];
}








function drawMenu() {
  const numPage = getElementById('num')!;
  const totalPages = getElementById('total')!;

  changeView(false);

  numPage.textContent = `${page + 1}`;
  total = alternatives.length;
  totalPages.textContent = `${total}`;

  getElementById('prevPage')!.onclick = () => {
    if (page > 0) {
      page--;
      numPage.textContent = `${page + 1}`;
      drawAlternative(alternatives[page]);
      updateUrl();
    }
  };

  getElementById('nextPage')!.onclick = () => {
    if (page < total-1) {
      page++;
      numPage.textContent = `${page + 1}`;
      drawAlternative(alternatives[page]);
      updateUrl();
    }
  };
}

function drawAlternative(step: Step) {
  const stations: Record<string, Station[]> = {};
  const lines = step.lines.unique();

  getElementById('distance')!.textContent = `${(step.distance/1000).toFixed(1)}`;
  getElementById('stops')!.textContent = `${step.stations.length - 1}`;
  getElementById('trans')!.textContent = `${step.transshipments}`;

  const content = getElementById('alternative')!;
  content.clear();
  toggleClass(content, 'linear-view', linearView);

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

  //openLine(lines[0]);
}



function generateHtml(line: Line, stations: Station[], linesAvailable: Line[]): HTMLElement {

  const lineDiv = createElement('div', 'line');
  lineDiv.id = line.id;

  const header = createElement('div', 'line-header', lineDiv);
  const logo = generateHtmlLogo(line);
  logo.onclick = ev => openLine(line, !ev.shiftKey)
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
          html.onclick = ev => openLine(l, !ev.shiftKey);
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

function changeView(change: boolean) {
  const linear = change
    ? !linearView
    : linearView;

  linearView = linear;

  const content = getElementById('alternative')!;
  toggleClass(content, 'linear-view', linear);

  const button = getElementById('change-view')!;
  button.textContent = linear? 'Vista en columnes' : 'Vista lineal';

  if (change) {
    updateUrl();
  }
  if (!linear) {
    querySelectorAll('.line.open').forEach(a => a.classList.remove('open'));
  }
}

function updateUrl() {
  window.history.pushState('', '', `./linies-filter.html?i=${GET_PARAMS.i}&f=${GET_PARAMS.f}&p=${page}${linearView? '' : '&v=0'}`);
}