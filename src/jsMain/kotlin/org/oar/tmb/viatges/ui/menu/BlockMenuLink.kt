package org.oar.tmb.viatges.ui.menu

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.A
import org.oar.lib.style
import org.oar.tmb.viatges.Style.PRIMARY_COLOR
import org.w3c.dom.HTMLAnchorElement

class BlockMenuLink(
    text: String,
): HTMLBlock<HTMLAnchorElement>(A, className = CLASS_NAME) {

    var select = false
        set(value) {
            field = value
            element.classList.toggle("selected", value)
        }

    init {
        -text
    }

    companion object {
        const val CLASS_NAME = "menu-button"

        init {
            style {
                ".$CLASS_NAME" {
                    "color" to PRIMARY_COLOR
                    "cursor" to "pointer"
                    "text-decoration" to "none"

                    "&:hover" {
                        "text-decoration" to "underline"
                    }

                    "&.selected" {
                        "color" to "#888"

                        "&:hover" {
                            "text-decoration" to "none"
                        }
                    }
                }
            }
        }
    }
}