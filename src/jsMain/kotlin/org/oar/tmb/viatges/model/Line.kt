package org.oar.tmb.viatges.model

data class Line(
    val id: String,
    val name: String,
    val logo: String,
    val color: String,
    val stations: List<String>,
    val distances: List<Int>
)