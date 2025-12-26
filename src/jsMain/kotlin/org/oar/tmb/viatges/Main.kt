package org.oar.tmb.viatges

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLBlock.Companion.HTMLBodyBlock
import org.oar.tmb.viatges.lib.HTMLBlock.DetachMode
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController
import org.oar.tmb.viatges.lib.model.StrPathParam
import org.oar.tmb.viatges.ui.calc.BlockCalcPage
import org.oar.tmb.viatges.ui.lines.BlockLinesPage
import org.oar.tmb.viatges.ui.menu.BlockMenu
import org.oar.tmb.viatges.utils.Page.CALC_PAGE
import org.oar.tmb.viatges.utils.Page.LINES_PAGE
import org.w3c.dom.HTMLDivElement

fun main() {
    Style.load()

    val container = DIV()

    HashController.init(
        format = listOf(
            StrPathParam("lang", "ca"),
            StrPathParam("section", LINES_PAGE),
            StrPathParam("subsection")
        ),
        onPageChange = {
            loadContent(container, it)
        }
    )

    loadContent(container)

    HTMLBodyBlock.append(container)
}

fun loadContent(container: HTMLBlock<HTMLDivElement>, path: Map<String, String> = HashController.path) {
    container.apply {
        clear(detachMode = DetachMode.DETACH)
        +BlockMenu()
        when(path["section"]) {
            LINES_PAGE -> +BlockLinesPage()
            CALC_PAGE -> +BlockCalcPage()
        }
    }
}
