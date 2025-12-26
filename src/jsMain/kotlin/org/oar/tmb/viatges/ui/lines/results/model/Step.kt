package org.oar.tmb.viatges.ui.lines.results.model

import org.oar.tmb.viatges.model.Line
import org.oar.tmb.viatges.model.Station

data class Step(
    // TO REMOVE???
    val stations: List<Station> = emptyList(),

    val distance: Int = 0,
    val done: Boolean = false,
    val route: List<Route> = emptyList()
)

data class Route(
    val line: Line,
    val inStation: Station,
    val outStation: Station,
    val forward: Boolean = true,
)