package org.oar.tmb.viatges.ui.calc

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.style
import org.w3c.dom.HTMLDivElement

class BlockCalcPage: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        when (path["subsection"]) {
            "results" -> {

            }
            "days" -> {

            }
            else -> {
                +DIV {
                    -"calc"
                }
            }
        }
    }

    companion object {
        const val ID = "calc-container"

        init {
            style {
                "#$ID" {
                }
            }
        }
    }
}