package org.oar.tmb.viatges.ui.lines.results

import org.oar.tmb.viatges.Style.TMB_STYLE
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.BUTTON
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TABLE
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TBODY
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TD
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TR
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Station
import org.oar.tmb.viatges.ui.lines.results.model.Route
import org.oar.tmb.viatges.ui.lines.results.model.Step
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.stationsData
import org.w3c.dom.HTMLDivElement
import kotlin.js.Date

class BlockJourneyContainer: HTMLBlock<HTMLDivElement>(DIV, id = ID) {
    private val alternatives = findAlternatives()
    private var page by renderProperty(
        initial = params["p"]?.toIntOrNull()?.let { it - 1 } ?: 0,
        identifier = 1
    )

    private val pageNum = SPAN("num")
    private val distance = SPAN("distance")
    private val stops = SPAN("stops")
    private val transfers = SPAN("transfers")
    private val journeyViewer = BlockJourneyViewer()

    init {
        +DIV ("journey-selector") {
            +BUTTON("prevPage $TMB_STYLE") {
                element {
                    onClick {
                        if (page > 0) page--
                    }
                }
                -"<"
            }
            +pageNum
            +"/"
            +SPAN("total") { -"${alternatives.size}" }
            +BUTTON("nextPage $TMB_STYLE") {
                element {
                    onClick {
                        if (page < alternatives.size - 1) page++
                    }
                }
                -">"
            }
            +BUTTON("change-view $TMB_STYLE") {
                element {
                    onClick {
                        journeyViewer.linearView = !journeyViewer.linearView
                        if (journeyViewer.linearView) {
                            -"Vista en columnes"
                        } else {
                            -"Vista lineal"
                        }
                    }
                }
                -if (params["v"] == "1") "Vista lineal" else "Vista en columnes"
            }

            +TABLE("stats") {
                +TBODY {
                    +TR {
                        +TD { -"Distància total:" }
                        +TD {
                            +distance
                            +"km"
                        }
                    }
                    +TR {
                        +TD { -"Parades:" }
                        +TD { +stops }
                    }
                    +TR {
                        +TD { -"Transbords:" }
                        +TD { +transfers }
                    }
                }
            }
        }
        +journeyViewer
    }

    override fun render(identifier: Int) {
        when(identifier) {
            -1, 1 -> {
                val alternative = alternatives[page]
                distance.apply { -"${alternative.distance/1000.0}" }
                stops.apply { -"${alternative.stations.size - 1}" }
                transfers.apply { -"${alternative.route.size -1}" }
                pageNum.apply { -"${page + 1}" }
                journeyViewer.step = alternative

                if (identifier == 1) {
                    params["p"] = "${page + 1}"
                    updateUrl(redirect = false)
                }
            }
        }
    }

    private fun findAlternatives(): List<Step> {
        val stations = stationsData.values.toList()
        val origin = stations[params["i"]!!.toInt()]
        val destination = stations[params["f"]!!.toInt()]
        val date: Date? = null

        if (origin == destination) {
            return Step(
                stations = listOf(origin),
                done = true,
                route = listOf(
                    Route(
                        line = origin.lines.first(),
                        forward = true,
                        inStation = origin,
                        outStation = origin
                    )
                )
            ).let(::listOf)
        }


        //let pendingSteps = origin.getOperativeLines(date)
        var pendingSteps = origin.lines
            .flatMap { line ->
                listOf(
                    Step(
                        stations = listOf(origin),
                        route = listOf(
                            Route(
                                line = line,
                                forward = true,
                                inStation = origin,
                                outStation = origin
                            )
                        )
                    ),
                    Step(
                        stations = listOf(origin),
                        route = listOf(
                            Route(
                                line = line,
                                forward = false,
                                inStation = origin,
                                outStation = origin
                            )
                        )
                    )
                )
            }

        val finalSteps = mutableListOf<Step>()

        while (pendingSteps.isNotEmpty()) {
            pendingSteps = pendingSteps
                .flatMap { step -> nextSteps(step, destination, date) }
                .filter { step ->
                    if (step.done) {
                        finalSteps.add(step)
                    }
                    !step.done
                }
        }

        return finalSteps.sortedWith(compareBy(
            { it.route.size },
            { it.distance }
        ))
    }

    private fun nextSteps(step: Step, destination: Station, date: Date?): List<Step> {
        val currentRoute = step.route.last()
        val currentStation = currentRoute.outStation

        val next =
            if (date == null) {
                val forward = currentRoute.forward
                if (forward) currentStation.nextStations.find { it.line == currentRoute.line }
                else currentStation.prevStations.find { it.line == currentRoute.line }
            } else {
                // TODO
                val forward = currentRoute.forward
                if (forward) currentStation.nextStations.find { it.line == currentRoute.line }
                else currentStation.prevStations.find { it.line == currentRoute.line }
            }
            ?: return emptyList()

        val distance = step.distance + next.distance
        val station = next.station

        if (step.stations.indexOf(station) >= 0) return emptyList()

        val updateRoute = step.route.dropLast(1) + currentRoute.copy(
            outStation = station
        )

        if (station == destination) {
            return listOf(
                step.copy(
                    stations = step.stations + station,
                    distance = distance,
                    done = true,
                    route = updateRoute
                )
            )
        }

        //const steps = station.getOperativeLines(date)
        val steps = station.lines
            .filter { line -> step.route.map { it.line }.indexOf(line) < 0 }
            .flatMap { line ->
                listOf(
                    Step(
                        stations = step.stations + station,
                        distance = distance,
                        route = updateRoute + Route(
                            line = line,
                            forward = true,
                            inStation = station,
                            outStation = station
                        )
                    ),
                    Step(
                        stations = step.stations + station,
                        distance = distance,
                        route = updateRoute + Route(
                            line = line,
                            forward = false,
                            inStation = station,
                            outStation = station
                        )
                    )
                )
            }

        return listOf(
            step.copy(
                stations = step.stations + station,
                distance = distance,
                route = updateRoute
            )
        ) + steps
    }

    companion object {
        const val ID = "journey-viewer"

        init {
            style {
                "#$ID" {
                    ".num, .change-view" {
                        "margin-left" to "5px"
                    }
                    ".total" {
                        "margin-right" to "5px"
                    }

                    ".journey-selector" {
                        "position" to "relative"
                        "margin" to "5px 0 10px"
                        "padding-bottom" to "20px"
                        "border-bottom" to "3px solid #E30613"
                    }

                    ".stats" {
                        "position" to "absolute"
                        "bottom" to "5px"
                        "padding-right" to "5px"
                        "font-size" to "0.8em"
                        "line-height" to "1em"

                        "td" {
                            "text-align" to "left"

                            "&:first-child" {
                                "font-weight" to "bold"
                                "text-align" to "right"
                            }
                        }
                    }
                }
            }
        }
    }
}
