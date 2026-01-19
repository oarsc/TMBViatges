package org.oar.tmb.viatges.model

data class StationLink(
    val line: Line,
    val station: Station,
    val distance: Int,
)