package org.oar.tmb.viatges.model

import kotlin.js.Date

data class MaintenanceWork(
    val start: Date,
    val end: Date,
    val line: Line,
    val stations: List<Station>
)