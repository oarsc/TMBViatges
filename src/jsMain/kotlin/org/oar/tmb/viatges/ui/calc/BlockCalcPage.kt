package org.oar.tmb.viatges.ui.calc

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.ui.calc.exceptions.BlockCalcDays
import org.oar.tmb.viatges.ui.calc.results.BlockCalcResults
import org.w3c.dom.HTMLDivElement

class BlockCalcPage: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        append(
            when (path["subsection"]) {
                "results" -> BlockCalcResults()
                "days" -> BlockCalcDays()
                else -> BlockCalcForm()
            }
        )
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