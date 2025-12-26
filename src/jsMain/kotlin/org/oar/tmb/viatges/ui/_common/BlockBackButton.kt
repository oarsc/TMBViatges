package org.oar.tmb.viatges.ui._common

import org.oar.tmb.viatges.Style.PRIMARY_COLOR
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.BUTTON
import org.oar.tmb.viatges.lib.style
import org.w3c.dom.HTMLButtonElement

class BlockBackButton: HTMLBlock<HTMLButtonElement>(BUTTON, className = CLASS_NAME) {

    init {
        -"🡰"
    }

    companion object {
        const val CLASS_NAME = "back-btn"

        init {
            style {
                ".$CLASS_NAME" {
                    "color" to PRIMARY_COLOR
                    "font-size" to "1.2em"
                    "padding" to "4px 10px"
                    "line-height" to "1.1em"
                    "margin" to "13px 0 10px"
                    "z-index" to "1"
                    "position" to "relative"
                    "background-color" to "transparent"
                    "border" to "0"
                    "border-radius" to "5px"
                    "cursor" to "pointer"
                    "font-weight" to "bold"
                    "position" to "absolute"
                    "left" to "0"

                    "&:hover" {
                        "background-color" to "#eee"
                    }
                }
            }
        }
    }
}