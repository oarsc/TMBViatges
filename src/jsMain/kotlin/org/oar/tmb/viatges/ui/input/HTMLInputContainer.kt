package org.oar.tmb.viatges.ui.input

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.utils.Notifier
import org.w3c.dom.HTMLDivElement

class HTMLInputContainer: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        listen(Notifier.fileLoaded) {
            classList.toggle("hide", true)
        }

        listen(Notifier.showLoadFile) {
            classList.toggle("hide")
        }

        +HTMLInputFileReader()
        +HTMLInputLoading()
    }

    companion object {
        const val ID = "input-container"
        init {
            style {
                "#$ID" {
                    "margin" to "50px auto"
                    "max-width" to "400px"
                    "padding" to "20px"
                    "background-color" to "#f5f5f5"
                    "border" to "1px solid black"

                    "&.hide" {
                        "display" to "none"
                    }
                }
            }
        }
    }
}