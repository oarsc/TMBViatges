import { Work } from "./data";

export class Line {
  constructor(
    public id: string,
    public name: string,
    public logo: string,
    public color: string,
    public firstStation: Station,
    public lastStation: Station,
    public lineWorks: Work[]
  ) {}

  contains(station: Station) {
    if (this.firstStation == station || this.lastStation == station) {
      return true;
    }
    return this.getStations().indexOf(station) >= 0;
  }

  getStations(): Station[] {
    const stations = [];
    let station: Station | undefined = this.firstStation;

    while(station) {
      stations.push(station);
      station = station.nextStationLink(this)?.station
    }

    return stations;
  }

  getOperativeStations(date: Date = new Date()): Station[] {
    if (!this.lineWorks.length) {
      return this.getStations();
    }

    const stationsToRemove = this.lineWorks
      .filter(work => work.start <= date && date < work.end)
      .flatMap(work => work.stations);

    const stations = [];
    let station: Station | undefined = this.firstStation;

    while(station) {
      if (stationsToRemove.indexOf(station.name) < 0) {
        stations.push(station);
      }
      station = station.nextStationLink(this)?.station;
    }

    return stations;
  }
}

export class Station {
  nextStations: Array<StationLink> = [];
  prevStations: Array<StationLink> = [];
  lines: Line[] = [];
  linesDistance: Array<LinesDistance> = [];

  constructor(public name: string) {
  }

  getOperativeLines(date: Date | undefined): Line[] {
    return date
      ? this.lines.filter(line => line.getOperativeStations(date).indexOf(this) >= 0)
      : this.lines;
  }

  nextStationLink(line: Line): StationLink | undefined {
    return this.nextStations.find(link => link.line == line);
  }

  prevStationLink(line: Line): StationLink | undefined {
    return this.prevStations.find(link => link.line == line);
  }

  nextOperativeStationLink(line: Line, date: Date): StationLink | undefined {
    const next = line.getOperativeStations(date);

    let station: Station | undefined = this;
    let stationLink: StationLink | undefined;

    do {
      stationLink = station?.nextStations.find(link => link.line == line);
      station = stationLink?.station
    } while (station && next.indexOf(station) < 0)

    return stationLink;
  }

  prevOperativeStationLink(line: Line, date: Date): StationLink | undefined {
    const next = line.getOperativeStations(date);

    let station: Station | undefined = this;
    let stationLink: StationLink | undefined;

    do {
      stationLink = station?.prevStations.find(link => link.line == line);
      station = stationLink?.station
    } while (station && next.indexOf(station) < 0)

    return stationLink;
  }
}

export type LinesDistance = [Line, Line, number];
export type StationLink = {line: Line, station: Station, distance: number};
