package org.oar.tmb.viatges.utils

import org.oar.tmb.viatges.model.Line
import org.oar.tmb.viatges.model.MaintenanceWork
import org.oar.tmb.viatges.model.Station
import org.oar.tmb.viatges.model.StationLink
import org.oar.tmb.viatges.model.cards.CasualCard
import org.oar.tmb.viatges.model.cards.DayCard
import org.oar.tmb.viatges.model.cards.FamiliarCard
import org.oar.tmb.viatges.model.cards.GroupCard
import org.oar.tmb.viatges.model.cards.SimpleCard
import org.oar.tmb.viatges.model.cards.UsualCard
import org.oar.tmb.viatges.model.cards.YoungCard
import kotlin.js.Date

val zones = 7

fun generateCards() = listOf(
    SimpleCard(prices = listOf(2.90, 4.15, 5.40, 6.90, 8.80, 10.25, 11.60)),
    FamiliarCard(prices = listOf(11.50, 21.75, 30.80, 39.95, 45.65, 47.95, 49.70)),
    DayCard(prices = listOf(12.00, 18.30, 22.95, 25.65, 28.70, 32.10, 34.70)),
    CasualCard(prices = listOf(13.00, 25.50, 34.70, 44.65, 51.20, 54.45, 57.60)),
    UsualCard(prices = listOf(22.80, 30.55, 42.70, 52.15, 59.60, 63.85, 67.65)),
    YoungCard(prices = listOf(45.50, 45.50, 45.50, 45.50, 45.50, 45.50, 45.50)),
    GroupCard(prices = listOf(91.00, 178.50, 242.90, 312.55, 358.40, 381.15, 403.20))
    //air 2.35, 4.60, 6.25, 8.05, 9.25, 9.80, 10.65
)

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

val maintenanceWorks = listOf(
    MaintenanceWork(
        start = Date("2024-06-25T00:00:00"),
        end = Date("2024-08-25T00:00:00"),
        line = linesData.first { it.id == "l2" },
        stations = listOfNotNull(
            stationsData["Monumental"],
            stationsData["Tetuan"],
            stationsData["Passeig de Gràcia"],
            stationsData["Universitat"],
            stationsData["Sant Antoni"],
            stationsData["Paral·lel"],
        )
    ),
    MaintenanceWork(
        start = Date("2024-08-05T00:00:00"),
        end = Date("2024-08-25T00:00:00"),
        line = linesData.first { it.id == "l10n" },
        stations = listOfNotNull(
            stationsData["Gorg"],
        )
    ),
    MaintenanceWork(
        start = Date("2024-07-27T00:00:00"),
        end = Date("2024-08-22T00:00:00"),
        line = linesData.first { it.id == "l4" },
        stations = listOfNotNull(
            stationsData["El Maresme | Fòrum"],
            stationsData["Besòs Mar"],
            stationsData["Besòs"],
            stationsData["La Pau"],
        )
    ),
    MaintenanceWork(
        start = Date("2024-06-25T00:00:00"),
        end = Date("2024-09-01T00:00:00"),
        line = linesData.first { it.id == "l5" },
        stations = listOfNotNull(
            stationsData["Ernest Lluch"],
            stationsData["Pubilla Cases"],
            stationsData["Can Vidalet"],
            stationsData["Can Boixeres"],
            stationsData["Sant Ildefons"],
            stationsData["Gavarra"],
            stationsData["Cornellà Centre"],
        )
    )
)
