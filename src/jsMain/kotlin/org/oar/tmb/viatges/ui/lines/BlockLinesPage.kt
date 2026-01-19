package org.oar.tmb.viatges.ui.lines

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.ui.lines.maintenance.BlockMaintenanceWorksPage
import org.oar.tmb.viatges.ui.lines.results.BlockJourneyPage
import org.w3c.dom.HTMLDivElement

class BlockLinesPage: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        when (path["subsection"]) {
            "maintenance" -> {
                +BlockMaintenanceWorksPage()
            }
            "results" -> {
                +BlockJourneyPage()
            }
            else -> {
                +BlockJourneyFilter()
                +BlockLines()
            }
        }
    }

    companion object {
        const val ID = "lines-container"

        init {
            style {
                "#$ID" {
                    "position" to "relative"
                }
            }
        }
    }
}