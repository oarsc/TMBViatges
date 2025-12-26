package org.oar.tmb.viatges.ui.input

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.P
import org.oar.tmb.viatges.lib.style
import org.w3c.dom.HTMLParagraphElement

class HTMLInputLoading: HTMLBlock<HTMLParagraphElement>(P, id = ID) {

    init {
        -"Loading..."
    }

    companion object {
        const val ID = "input-loading"
        init {
            style {
                "#$ID" {
                    "display" to "none"
                }
            }
        }
    }
}