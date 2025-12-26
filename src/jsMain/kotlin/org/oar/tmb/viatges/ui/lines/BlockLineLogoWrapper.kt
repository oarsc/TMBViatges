package org.oar.tmb.viatges.ui.lines

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Line
import org.w3c.dom.HTMLSpanElement

class BlockLineLogoWrapper(line: Line) : HTMLBlock<HTMLSpanElement>(SPAN, className = CLASS_NAME) {

    init {
        +SPAN("line-logo").element {
            style.backgroundColor = line.color
            setAttribute("content", line.logo)
        }
    }

    companion object {
        const val CLASS_NAME = "logo-wrapper"
        init {
            style {
                ".$CLASS_NAME" {
                    "display" to "inline-block"
                    "white-space" to "initial"
                    "vertical-align" to "middle"

                    ".line-logo" {
                        "display" to "flex"
                        "align-items" to "center"
                        "justify-content" to "center"
                        "color" to "#fff"
                        "font-weight" to "bold"
                        "font-size" to "0.85em"
                        "width" to "23px"
                        "height" to "23px"
                        "padding" to "3px"
                        "text-align" to "center"

                        "&::after" {
                            "content" to "attr(content)"
                            "overflow-wrap" to "anywhere"
                            "line-height" to "1em"
                        }
                    }
                }
            }
        }
    }
}