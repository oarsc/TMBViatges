package org.oar.tmb.viatges.ui.lines

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.LABEL
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Line
import org.oar.tmb.viatges.model.Station
import org.oar.tmb.viatges.utils.Notifier
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.stationsData
import org.w3c.dom.HTMLDivElement

class BlockLine(
    val line: Line,
    title: String? = null
) : HTMLBlock<HTMLDivElement>(DIV, className = CLASS_NAME) {
    private val isOpen: Boolean get() = classList.contains("open")
    private val isLinearView: Boolean get() = classList.contains("linear-view")

    private val stationsBlock = DIV("stations") {
        +DIV("color-line").element {
            style.backgroundColor = line.color
        }
    }

    init {
        stationsBlock.element {
            onClick { ev ->
                toggleOpen(true)
            }
        }

        +DIV("line-header") {
            +BlockLineLogoWrapper(line).element {
                onClick { ev ->
                    toggleOpen()
                }
            }
            +LABEL("title") {
                if (title != null) {
                    +title
                } else {
                    +line.stations.first()
                    +" ⥊ "
                    +line.stations.last()
                }
            }
        }
        +stationsBlock
    }

    fun addFullLine() {
        line.stations.forEach(::addStation)
    }

    fun addStation(stationName: String, focusLines: List<Line> = emptyList()): HTMLBlock<HTMLDivElement> = addStation(stationsData[stationName]!!)
    fun addStation(station: Station, focusLines: List<Line> = emptyList()) = stationsBlock.apply {
        +DIV("station") {
            +SPAN("circle").element {
                style.backgroundColor = line.color
            }
            +SPAN("station-line") {
                +LABEL("title") {
                    -station.name
                }
                +SPAN("other-lines") {
                    station.lines.filter { it != line }.forEach { otherLine ->
                        +BlockLineLogoWrapper(otherLine).element {
                            if (focusLines.isNotEmpty()) {
                                classList.toggle("faded", !focusLines.contains(otherLine))
                            }

                            onClick { ev ->
                                notify(Notifier.openLine, otherLine)
                                ev.stopPropagation()
                            }
                        }
                    }
                }
            }
        }
    }

    fun toggleOpen(force: Boolean? = null) {
        val originalStatus = isOpen
        val action = force ?: !isOpen
        classList.toggle("open", action)
        if (!originalStatus && action) {
            notify(Notifier.openLine, line)
        }
    }

    fun toggleLinearView(force: Boolean = !isLinearView) {
        classList.toggle("linear-view", force)
    }

    companion object {
        const val CLASS_NAME = "line"

        init {
            style {
                ".$CLASS_NAME" {
                    "display" to "inline-block"
                    "vertical-align" to "top"
                    "overflow" to "hidden"
                    "transition" to "width 0.2s"
                    "width" to "35px"
                    "text-align" to "left"

                    ".logo-wrapper.faded" {
                        "opacity" to "0.2"
                        "transition" to "opacity 0.2s"

                        "&:hover" {
                            "opacity" to "1"
                        }
                    }

                    "&.linear-view" {
                        "display" to "block"
                        "margin" to "auto"
                        "width" to "300px"
                        "cursor" to "initial"

                        "> .line" {
                            "cursor" to "initial"
                        }

                        ".logo-wrapper" {
                            "opacity" to "1"
                        }

                        "&:not(:first-child)" {
                            "margin-top" to "40px"
                        }
                    }

                    "&:not(.open)" {
                        "cursor" to "pointer"
                    }

                    "&.open" {
                        "width" to "300px"
                    }

                    ".line-header" {
                        "white-space" to "nowrap"

                        ".logo-wrapper" {
                            "cursor" to "pointer"
                            "margin-right" to "10px"
                        }

                        ".title" {
                            "font-weight" to "bold"
                        }
                    }

                    ".station-line" {
                        "white-space" to "nowrap"

                        ".title" {
                            "margin-left" to "10px"
                        }

                        ".other-lines .logo-wrapper" {
                            "margin-left" to "5px"
                            "cursor" to "pointer"
                        }
                    }

                    ".color-line" {
                        "position" to "absolute"
                        "width" to "4px"
                        "left" to "13px"
                        "top" to "19px"
                        "bottom" to "19px"
                    }

                    ".stations" {
                        "position" to "relative"
                    }

                    ".station" {
                        "height" to "38px"
                        "display" to "flex"
                        "align-items" to "center"
                        "margin-left" to "5px"
                    }

                    ".circle" {
                        "height" to "20px"
                        "width" to "20px"
                        "min-height" to "20px"
                        "min-width" to "20px"
                        "display" to "inline-block"
                        "border-radius" to "10px"
                    }
                }
            }
        }
    }
}