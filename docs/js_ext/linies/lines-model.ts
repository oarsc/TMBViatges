export class Line {
  constructor(
    public id: string,
    public name: string,
    public color: string,
    public firstStation: Station,
    public lastStation: Station,
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
}

export class Station {
  nextStations: Array<StationLink> = [];
  prevStations: Array<StationLink> = [];
  lines: Line[] = [];
  linesDistance: Array<LinesDistance> = [];

  constructor(public name: string) {
  }

  nextStationLink(line: Line): StationLink | undefined {
    return this.nextStations.find(link => link.line == line);
  }

  prevStationLink(line: Line): StationLink | undefined {
    return this.prevStations.find(link => link.line == line);
  }
}

export type LinesDistance = [Line, Line, number];
export type StationLink = {line: Line, station: Station, distance: number};
