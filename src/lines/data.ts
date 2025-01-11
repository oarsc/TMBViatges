import { Line, Station } from './models';

interface Data {
  line: string,
  name: string,
  logo: string,
  color: string,
  stations: Array<string | number>
}

export interface Work {
  start: Date,
  end: Date,
  line: string,
  stations: string[]
}

export const lines: Record<string, Line> = {};
export const stations: Record<string, Station> = {};

const linesData: Data[] = [
  {
    line: 'l1',
    name: 'Línia 1',
    logo: 'L1',
    color: '#DC0404',
    stations: [
      'Fondo', 860,
      'Santa Coloma', 689,
      'Baró de Viver', 500,
      'Trinitat Vella', 666,
      'Torras i Bages', 744,
      'Sant Andreu', 1000,
      'Fabra i Puig', 1004,
      'La Sagrera', 577,
      'Navas', 647,
      'Clot', 869,
      'Glòries', 821,
      'Marina', 603,
      'Arc de Triomf', 790,
      'Urquinaona', 300,
      'Catalunya', 468,
      'Universitat', 522,
      'Urgell', 586,
      'Rocafort', 632,
      'Espanya', 480,
      'Hostafrancs', 487,
      'Plaça de Sants', 468,
      'Mercat Nou', 567,
      'Santa Eulàlia', 1000,
      'Torrassa', 561,
      'Florida', 542,
      'Can Serra', 600,
      'Rambla Just Oliveras', 680,
      'Av. Carrilet', 1040,
      'Bellvitge', 900,
      'Hospital de Bellvitge',
    ]
  },
  {
    line: 'l2',
    name: 'Línia 2',
    logo: 'L2',
    color: '#90278E',
    stations: [
      'Badalona Pompeu Fabra', 772,
      'Pep Ventura', 579,
      'Gorg', 771,
      'Sant Roc', 900,
      'Artigues | Sant Adrià', 750,
      'Verneda', 850,
      'La Pau', 650,
      'Sant Martí', 596,
      'Bac de Roda', 925,
      'Clot', 544,
      'Encants', 750,
      'Sagrada Família', 595,
      'Monumental', 792,
      'Tetuan', 816,
      'Passeig de Gràcia', 531,
      'Universitat', 648,
      'Sant Antoni', 675,
      'Paral·lel',
    ]
  },
  {
    line: 'l3',
    name: 'Línia 3',
    logo: 'L3',
    color: '#2EA83B',
    stations: [
      'Trinitat Nova', 609,
      'Roquetes', 1150,
      'Canyelles', 952,
      'Valldaura', 732,
      'Mundet', 596,
      'Montbau', 667,
      'Vall d\'Hebron', 832,
      'Penitents', 697,
      'Vallcarca', 755,
      'Lesseps', 450,
      'Fontana', 995,
      'Diagonal', 783,
      'Passeig de Gràcia', 444,
      'Catalunya', 757,
      'Liceu', 536,
      'Drassanes', 683,
      'Paral·lel', 656,
      'Poble Sec', 873,
      'Espanya', 522,
      'Tarragona', 405,
      'Sants Estació', 594,
      'Plaça del Centre', 608,
      'Les Corts', 670,
      'Maria Cristina', 709,
      'Palau Reial', 521,
      'Zona Universitària',
    ]
  },
  {
    line: 'l4',
    name: 'Línia 4',
    logo: 'L4',
    color: '#FFC10E',
    stations: [
      'Trinitat Nova', 704,
      'Via Júlia', 789,
      'Llucmajor', 1630,
      'Maragall', 990,
      'Guinardó | Hospital de Sant Pau', 767,
      'Alfons X', 814,
      'Joanic', 817,
      'Verdaguer', 708,
      'Girona', 574,
      'Passeig de Gràcia', 580,
      'Urquinaona', 708,
      'Jaume I', 741,
      'Barceloneta', 934,
      'Ciutadella | Vila Olímpica', 986,
      'Bogatell', 614,
      'Llacuna', 720,
      'Poblenou', 685,
      'Selva de Mar', 828,
      'El Maresme | Fòrum', 350,
      'Besòs Mar', 773,
      'Besòs', 461,
      'La Pau',
    ]
  },
  {
    line: 'l5',
    name: 'Línia 5',
    logo: 'L5',
    color: '#0078BD',
    stations: [
      'Vall d\'Hebron', 453,
      'El Coll | La Teixonera', 901,
      'El Carmel', 863,
      'Horta', 774,
      'Vilapicina', 553,
      'Virrei Amat', 703,
      'Maragall', 389,
      'Congrés', 567,
      'La Sagrera', 886,
      'Camp de l\'Arpa', 597,
      'Sant Pau | Dos de Maig', 821,
      'Sagrada Família', 826,
      'Verdaguer', 711,
      'Diagonal', 1030,
      'Hospital Clínic', 727,
      'Entença', 517,
      'Sants Estació', 798,
      'Plaça de Sants', 669,
      'Badal', 770,
      'Collblanc', 550,
      'Ernest Lluch', 500,
      'Pubilla Cases', 720,
      'Can Vidalet', 892,
      'Can Boixeres', 708,
      'Sant Ildefons', 800,
      'Gavarra', 400,
      'Cornellà Centre',
    ]
  },
  {
    line: 'l9n',
    name: 'Línia 9 Nord',
    logo: 'L9\nN',
    color: '#FF7800',
    stations: [
      'Can Zam', 917,
      'Singuerlín', 798,
      'Església Major', 618,
      'Fondo', 859,
      'Santa Rosa', 551,
      'Can Peixauet', 1200,
      'Bon Pastor', 1440,
      'Onze de Setembre', 1560,
      'La Sagrera',
    ]
  },
  {
    line: 'l9s',
    name: 'Línia 9 Sud',
    logo: 'L9\nS',
    color: '#FF7800',
    stations: [
      'Zona Universitària', 1190,
      'Collblanc', 853,
      'Torrassa', 1170,
      'Can Tries | Gornal', 730,
      'Europa | Fira', 780,
      'Fira', 1530,
      'Parc Logístic', 1710,
      'Mercabarna', 1310,
      'Les Moreres', 2120,
      'El Prat Estació', 1080,
      'Cèntric', 1020,
      'Parc Nou', 1650,
      'Mas Blau', 985,
      'Aeroport T2', 3660,
      'Aeroport T1',
    ]
  },
  {
    line: 'l10n',
    name: 'Línia 10 Nord',
    logo: 'L10\nN',
    color: '#01A0C7',
    stations: [
      'Gorg', 862,
      'La Salut', 620,
      'Llefià', 1280,
      'Bon Pastor', 1440,
      'Onze de Setembre', 1560,
      'La Sagrera',
    ]
  },
  {
    line: 'l10s',
    name: 'Línia 10 Sud',
    logo: 'L10\nS',
    color: '#01A0C7',
    stations: [
      'Collblanc', 853,
      'Torrassa', 1130,
      'Can Tries | Gornal', 505,
      'Provençana', 714,
      'Ciutat de la Justícia', 639,
      'Foneria', 625,
      'Foc', 1620,
      'Zona Franca', 859,
      'Port Comercial | La Factoria', 717,
      'Ecoparc', 780,
      'ZAL | Riu Vell',
    ]
  },
  {
    line: 'l11',
    name: 'Línia 11',
    logo: 'L11',
    color: '#97D146',
    stations: [
      'Can Cuiàs', 240,
      'Ciutat Meridiana', 597,
      'Torre Baró | Vallbona', 1100,
      'Casa de l\'Aigua', 303,
      'Trinitat Nova',
    ]
  },
];

export const works: Work[] = [
/*
  {
    start: new Date('2024-06-25T00:00:00'),
    end: new Date('2024-08-25T00:00:00'),
    line: 'l2',
    stations: [
      'Monumental',
      'Tetuan',
      'Passeig de Gràcia',
      'Universitat',
      'Sant Antoni',
      'Paral·lel',
    ]
  },
  {
    start: new Date('2024-08-05T00:00:00'),
    end: new Date('2024-08-25T00:00:00'),
    line: 'l10n',
    stations: [
      'Gorg',
    ]
  },
  {
    start: new Date('2024-07-27T00:00:00'),
    end: new Date('2024-08-22T00:00:00'),
    line: 'l4',
    stations: [
      'El Maresme | Fòrum',
      'Besòs Mar',
      'Besòs',
      'La Pau',
    ]
  },
  {
    start: new Date('2024-06-25T00:00:00'),
    end: new Date('2024-09-01T00:00:00'),
    line: 'l5',
    stations: [
      'Ernest Lluch',
      'Pubilla Cases',
      'Can Vidalet',
      'Can Boixeres',
      'Sant Ildefons',
      'Gavarra',
      'Cornellà Centre',
    ]
  }
*/
];

linesData.forEach(data => {

  const stationsNames = data.stations
    .filter(content => typeof content === 'string')
    .map(station => station as string);

  const line = lines[data.line] = new Line(
    data.line,
    data.name,
    data.logo,
    data.color,
    getStation(stationsNames[0]),
    getStation(stationsNames.slice(-1)[0]),
    works.filter(work => work.line == data.line),
  );

  let prevStation: Station | undefined;

  stationsNames.map(getStation).forEach((station, idx) => {
    station.lines.push(line);
    if (prevStation) {
      const stationIdx = data.stations.indexOf(prevStation.name);
      const dist = data.stations[stationIdx + 1] ?? '';
      const distValue = typeof dist === 'number' ? dist : 500;

      prevStation.nextStations.push({line, station, distance: distValue});
      station.prevStations.push({line, station: prevStation, distance: distValue});
    }
    prevStation = station;
  });
});


function getStation(name: string): Station {
  const station = stations[name];
  if (station) return station;

  const newStation = new Station(name)
  stations[name] = newStation;
  return newStation;
}