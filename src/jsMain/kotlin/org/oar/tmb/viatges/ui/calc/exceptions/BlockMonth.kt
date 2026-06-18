package org.oar.tmb.viatges.ui.calc.exceptions

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.DIV
import org.oar.lib.HTMLDefinitionConstants.TABLE
import org.oar.lib.HTMLDefinitionConstants.TBODY
import org.oar.lib.HTMLDefinitionConstants.TH
import org.oar.lib.HTMLDefinitionConstants.THEAD
import org.oar.lib.HTMLDefinitionConstants.TR
import org.oar.lib.Locale.translate
import org.oar.lib.style
import org.oar.tmb.viatges.utils.Constants.MONTHS
import org.oar.tmb.viatges.utils.Constants.WEEK_DAYS
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLTableSectionElement

class BlockMonth(
    month: Int,
    year: Int,
    bodyBuilder: HTMLBlock<HTMLTableSectionElement>.() -> Unit = {}
): HTMLBlock<HTMLDivElement>(DIV, className = CLASS_NAME) {
    init {
        +DIV("month-name") {
            -"${MONTHS[month].translate} $year"
        }
        +TABLE {
            +THEAD {
                +TR {
                    WEEK_DAYS.forEach {
                        +TH { -it.translate }
                    }
                }
            }
            +TBODY("days", build = bodyBuilder)
        }
    }

    companion object {
        const val CLASS_NAME = "month"

        init {
            style {
                ".$CLASS_NAME" {
                    ".month-name" {
                        "font-size" to "1.5em"
                        "padding" to "5px 10px"
                        "margin-bottom" to "10px"
                    }

                    "table" {
                        "border-collapse" to "collapse"
                        "border-width" to "1px"

                        "td, th" {
                            "padding" to "3px 6px"
                        }
                    }
                }
            }
        }
    }
}