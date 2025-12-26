package org.oar.tmb.viatges.utils

import org.oar.tmb.viatges.model.Line
import org.oar.tmb.viatges.model.Station
import org.oar.tmb.viatges.model.StationLink

val linesData = listOf(
    Line(
        id = "l1",
        name = "Línia 1",
        logo = "L1",
        color = "#DC0404",
        stations = listOf(
            "Fondo",
            "Santa Coloma",
            "Baró de Viver",
            "Trinitat Vella",
            "Torras i Bages",
            "Sant Andreu",
            "Fabra i Puig",
            "La Sagrera",
            "Navas",
            "Clot",
            "Glòries",
            "Marina",
            "Arc de Triomf",
            "Urquinaona",
            "Catalunya",
            "Universitat",
            "Urgell",
            "Rocafort",
            "Espanya",
            "Hostafrancs",
            "Plaça de Sants",
            "Mercat Nou",
            "Santa Eulàlia",
            "Torrassa",
            "Florida",
            "Can Serra",
            "Rambla Just Oliveras",
            "Av. Carrilet",
            "Bellvitge",
            "Hospital de Bellvitge",
        ),
        distances = listOf(860, 689, 500, 666, 744, 1000, 1004, 577, 647, 869, 821, 603, 790, 300, 468, 522, 586, 632, 480, 487, 468, 567, 1000, 561, 542, 600, 680, 1040, 900)
    ),
    Line(
        id = "l2",
        name = "Línia 2",
        logo = "L2",
        color = "#90278E",
        stations = listOf(
            "Badalona Pompeu Fabra",
            "Pep Ventura",
            "Gorg",
            "Sant Roc",
            "Artigues | Sant Adrià",
            "Verneda",
            "La Pau",
            "Sant Martí",
            "Bac de Roda",
            "Clot",
            "Encants",
            "Sagrada Família",
            "Monumental",
            "Tetuan",
            "Passeig de Gràcia",
            "Universitat",
            "Sant Antoni",
            "Paral·lel",
        ),
        distances = listOf(772, 579, 771, 900, 750, 850, 650, 596, 925, 544, 750, 595, 792, 816, 531, 648, 675)
    ),
    Line(
        id = "l3",
        name = "Línia 3",
        logo = "L3",
        color = "#2EA83B",
        stations = listOf(
            "Trinitat Nova",
            "Roquetes",
            "Canyelles",
            "Valldaura",
            "Mundet",
            "Montbau",
            "Vall d'Hebron",
            "Penitents",
            "Vallcarca",
            "Lesseps",
            "Fontana",
            "Diagonal",
            "Passeig de Gràcia",
            "Catalunya",
            "Liceu",
            "Drassanes",
            "Paral·lel",
            "Poble Sec",
            "Espanya",
            "Tarragona",
            "Sants Estació",
            "Plaça del Centre",
            "Les Corts",
            "Maria Cristina",
            "Palau Reial",
            "Zona Universitària",
        ),
        distances = listOf(609, 1150, 952, 732, 596, 667, 832, 697, 755, 450, 995, 783, 444, 757, 536, 683, 656, 873, 522, 405, 594, 608, 670, 709, 521)
    ),
    Line(
        id = "l4",
        name = "Línia 4",
        logo = "L4",
        color = "#FFC10E",
        stations = listOf(
            "Trinitat Nova",
            "Via Júlia",
            "Llucmajor",
            "Maragall",
            "Guinardó | Hospital de Sant Pau",
            "Alfons X",
            "Joanic",
            "Verdaguer",
            "Girona",
            "Passeig de Gràcia",
            "Urquinaona",
            "Jaume I",
            "Barceloneta",
            "Ciutadella | Vila Olímpica",
            "Bogatell",
            "Llacuna",
            "Poblenou",
            "Selva de Mar",
            "El Maresme | Fòrum",
            "Besòs Mar",
            "Besòs",
            "La Pau",
        ),
        distances = listOf(704, 789, 1630, 990, 767, 814, 817, 708, 574, 580, 708, 741, 934, 986, 614, 720, 685, 828, 350, 773, 461)
    ),
    Line(
        id = "l5",
        name = "Línia 5",
        logo = "L5",
        color = "#0078BD",
        stations = listOf(
            "Vall d'Hebron",
            "El Coll | La Teixonera",
            "El Carmel",
            "Horta",
            "Vilapicina",
            "Virrei Amat",
            "Maragall",
            "Congrés",
            "La Sagrera",
            "Camp de l'Arpa",
            "Sant Pau | Dos de Maig",
            "Sagrada Família",
            "Verdaguer",
            "Diagonal",
            "Hospital Clínic",
            "Entença",
            "Sants Estació",
            "Plaça de Sants",
            "Badal",
            "Collblanc",
            "Ernest Lluch",
            "Pubilla Cases",
            "Can Vidalet",
            "Can Boixeres",
            "Sant Ildefons",
            "Gavarra",
            "Cornellà Centre",
        ),
        distances = listOf(453, 901, 863, 774, 553, 703, 389, 567, 886, 597, 821, 826, 711, 1030, 727, 517, 798, 669, 770, 550, 500, 720, 892, 708, 800, 400)
    ),
    Line(
        id = "l9n",
        name = "Línia 9 Nord",
        logo = "L9\nN",
        color = "#FF7800",
        stations = listOf(
            "Can Zam",
            "Singuerlín",
            "Església Major",
            "Fondo",
            "Santa Rosa",
            "Can Peixauet",
            "Bon Pastor",
            "Onze de Setembre",
            "La Sagrera",
        ),
        distances = listOf(917, 798, 618, 859, 551, 1200, 1440, 1560)
    ),
    Line(
        id = "l9s",
        name = "Línia 9 Sud",
        logo = "L9\nS",
        color = "#FF7800",
        stations = listOf(
            "Zona Universitària",
            "Collblanc",
            "Torrassa",
            "Can Tries | Gornal",
            "Europa | Fira",
            "Fira",
            "Parc Logístic",
            "Mercabarna",
            "Les Moreres",
            "El Prat Estació",
            "Cèntric",
            "Parc Nou",
            "Mas Blau",
            "Aeroport T2",
            "Aeroport T1",
        ),
        distances = listOf(1190, 853, 1170, 730, 780, 1530, 1710, 1310, 2120, 1080, 1020, 1650, 985, 3660)
    ),
    Line(
        id = "l10n",
        name = "Línia 10 Nord",
        logo = "L10\nN",
        color = "#01A0C7",
        stations = listOf(
            "Gorg",
            "La Salut",
            "Llefià",
            "Bon Pastor",
            "Onze de Setembre",
            "La Sagrera",
        ),
        distances = listOf(862, 620, 1280, 1440, 1560)
    ),
    Line(
        id = "l10s",
        name = "Línia 10 Sud",
        logo = "L10\nS",
        color = "#01A0C7",
        stations = listOf(
            "Collblanc",
            "Torrassa",
            "Can Tries | Gornal",
            "Provençana",
            "Ciutat de la Justícia",
            "Foneria",
            "Foc",
            "Zona Franca",
            "Port Comercial | La Factoria",
            "Ecoparc",
            "ZAL | Riu Vell",
        ),
        distances = listOf(853, 1130, 505, 714, 639, 625, 1620, 859, 717, 780)
    ),
    Line(
        id = "l11",
        name = "Línia 11",
        logo = "L11",
        color = "#97D146",
        stations = listOf(
            "Can Cuiàs",
            "Ciutat Meridiana",
            "Torre Baró | Vallbona",
            "Casa de l'Aigua",
            "Trinitat Nova",
        ),
        distances = listOf(240, 597, 1100, 303)
    )
)

val stationsData = linesData
        .flatMap { it.stations }
        .sorted()
        .associateWith { stationName ->
            Station(
                name = stationName,
                lines = linesData.filter { it.stations.contains(stationName) }
            )
        }
        .also { stations ->
            stations.forEach { (stationName, station) ->
                val stationLinks = linesData
                    .map { it to it.stations.indexOf(stationName) }
                    .filter { it.second >= 0 }
                    .map { (line, stationPosition) ->
                        val prev = line.stations.getOrNull(stationPosition - 1)
                            ?.let { linkedStationName ->
                                StationLink(
                                    line = line,
                                    station = stations[linkedStationName]!!,
                                    distance = line.distances[stationPosition - 1]
                                )
                            }
                        val next = line.stations.getOrNull(stationPosition + 1)
                            ?.let { linkedStationName ->
                                StationLink(
                                    line = line,
                                    station = stations[linkedStationName]!!,
                                    distance = line.distances[stationPosition]
                                )
                            }
                        prev to next
                    }

                station.prevStations = stationLinks.mapNotNull { it.first }
                station.nextStations = stationLinks.mapNotNull { it.second }
            }
        }