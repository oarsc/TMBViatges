package org.oar.tmb.viatges.ui.lines.results

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.stationsData
import org.w3c.dom.HTMLDivElement

class BlockResultsHeader: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        val stations = stationsData.values.toList()

        +SPAN("origin") {
            -stations[params["i"]!!.toInt()].name
        }
        +SPAN("arrow") {
            element {
                onmouseenter = { -"⇠" }
                onmouseleave = { -"⇢" }
                onClick {
                    val origin = params["i"]
                    params["i"] = params["f"]!!
                    params["f"] = origin!!
                    updateUrl()
                }
            }
            -"⇢"
        }
        +SPAN("destination") {
            -stations[params["f"]!!.toInt()].name
        }
    }

    companion object {
        const val ID = "results-header"

        init {
            style {
                "#$ID" {
                    "text-align" to "center"
                    "font-weight" to "bold"

                    "> *" {
                        "vertical-align" to "middle"
                    }

                    ".origin, .destination" {
                        "font-size" to "1.3em"
                    }

                    ".arrow" {
                        "font-size" to "2.6em"
                        "cursor" to "pointer"
                        "margin" to "0 12px"
                    }
                }
            }
        }
    }
}