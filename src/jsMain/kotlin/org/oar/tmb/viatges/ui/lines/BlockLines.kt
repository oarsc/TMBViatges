package org.oar.tmb.viatges.ui.lines

import org.oar.tmb.viatges.Style.PRIMARY_COLOR
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.utils.Notifier
import org.oar.tmb.viatges.utils.linesData
import org.w3c.dom.HTMLDivElement

class BlockLines: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    private val blocks = linesData.map {
        BlockLine(it).apply {
            element.id = it.id
            addFullLine()
        }
    }

    init {
        listen(Notifier.openLine) { line ->
            blocks.forEach {
                it.toggleOpen(it.element.id == line.id)
            }
        }

        +DIV(id = "all-lines") {
            blocks.forEach { block ->
                +block
            }
        }
    }

    companion object {
        const val ID = "lines"

        init {
            style {
                "#$ID" {
                    "position" to "relative"
                    "text-align" to "center"

                    "#all-lines" {
                        "margin-top" to "10px"
                        "padding-top" to "10px"
                        "border-top" to "3px solid $PRIMARY_COLOR"
                    }
                }
            }
        }
    }
}