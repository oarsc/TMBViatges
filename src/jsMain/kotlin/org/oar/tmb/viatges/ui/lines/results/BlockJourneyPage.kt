package org.oar.tmb.viatges.ui.lines.results

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.DIV
import org.oar.lib.HashController.path
import org.oar.lib.HashController.updateUrl
import org.oar.lib.style
import org.oar.tmb.viatges.ui._common.BlockBackButton
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.w3c.dom.HTMLDivElement

class BlockJourneyPage: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        +BlockBackButton().element {
            onClick {
                path.remove("subsection")
                updateUrl(pushHistory = true)
            }
        }
        +BlockResultsHeader()
        +BlockJourneyContainer()
    }

    companion object {
        const val ID = "results"

        init {
            style {
                "#$ID" {
                    "text-align" to "center"
                }
            }
        }
    }
}