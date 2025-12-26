package org.oar.tmb.viatges.ui.menu

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.process.ExportProcess
import org.oar.tmb.viatges.utils.Export
import org.oar.tmb.viatges.utils.Notifier
import org.w3c.dom.HTMLDivElement

class HTMLMenu: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    private var selectedOption: Int by renderProperty(CALENDAR_OPTION, 1)
    private var menuItems = mapOf(
        CALENDAR_OPTION to HTMLMenuContentButton("Calendar", CALENDAR_OPTION),
        EDITOR_OPTION to HTMLMenuContentButton("Editor", EDITOR_OPTION)
    )

    init {
        listen(Notifier.menuIdChanged) { selectedOption = it }
        expose(Export.menuId) { selectedOption }

        menuItems.forEach {
            +it.value
            if (it.key == selectedOption) {
                it.value.selected = true
            }
        }

        +createLoadFileButton()
        +createExportButton()
    }

    private fun createLoadFileButton() = HTMLMenuButton(
        text = "Load file",
        onClick = {
            classList.toggle("selected")
            notify(Notifier.showLoadFile, true)
        }
    ).apply {
        classList.add("selected")

        listen(Notifier.fileLoaded) {
            classList.toggle("selected", false)
        }
    }

    private fun createExportButton() = HTMLMenuButton(
        text = "Export",
        onClick = {
            read(Export.output)?.also(ExportProcess::export)
            notify(Notifier.reload)
        }
    )

    override fun render(identifier: Int) {
        when (identifier) {
            1 -> {
                menuItems.forEach {
                    it.value.selected = it.key == selectedOption
                }
            }
        }
    }

    companion object {
        const val CALENDAR_OPTION = 1
        const val EDITOR_OPTION = 2

        const val ID = "menu"
        init {
            style {
                "#$ID" {
                    "padding" to "10px 0 0"
                    "text-align" to "center"
                }
            }
        }
    }
}