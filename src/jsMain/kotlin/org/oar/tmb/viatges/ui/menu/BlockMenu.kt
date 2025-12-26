package org.oar.tmb.viatges.ui.menu

import org.oar.tmb.viatges.Style.PRIMARY_COLOR
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.IMG
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.utils.Page.CALC_PAGE
import org.oar.tmb.viatges.utils.Page.LINES_PAGE
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.w3c.dom.HTMLDivElement

class BlockMenu: HTMLBlock<HTMLDivElement>(DIV, id = ID) {
    private var selectedPage: String by renderProperty(LINES_PAGE, 1)

    private var menuItems = mapOf(
        LINES_PAGE to BlockMenuLink("Veure linies"),
        CALC_PAGE to BlockMenuLink("Gestionar viatges")
    )

    init {
        +IMG(id = "logo").element {
            src = "./img/Logo-TMB.png"
        }

        +DIV(id = "header-links") {
            menuItems.entries.forEachIndexed { idx, (key, block) ->
                if (idx != 0) {
                    +SPAN("separator") {
                        -"|"
                    }
                }
                +block.element {
                    onClick { select(key) }
                }
            }
        }
    }

    private fun select(page: String) {
        selectedPage = page
        path["section"] = page
        path.remove("subsection")
        updateUrl()
    }

    override fun render(identifier: Int) {
        when (identifier) {
            -1, 1 -> {
                menuItems.entries.forEach { (key, block) ->
                    block.select = key == path["section"]
                }
            }
        }
    }

    companion object {
        const val ID = "menu"

        init {
            style {
                "#$ID" {
                    "position" to "relative"

                    "#logo" {
                        "vertical-align" to "middle"
                    }

                    "#header-links" {
                        "display" to "inline-block"
                        "margin-left" to "50px"

                        ".separator" {
                            "color" to PRIMARY_COLOR
                            "font-size" to "1.5em"
                            "margin" to "0 5px"
                        }
                    }
                }
            }
        }
    }
}