package org.oar.tmb.viatges.model

data class Station(
    val name: String,
    val lines: List<Line>,
    var nextStations: List<StationLink> = emptyList(),
    var prevStations: List<StationLink> = emptyList(),
)

data class StationLink(
    val line: Line,
    val station: Station,
    val distance: Int,
)