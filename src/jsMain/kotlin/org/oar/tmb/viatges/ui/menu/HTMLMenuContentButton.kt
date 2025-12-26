package org.oar.tmb.viatges.ui.menu

import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.utils.Notifier

class HTMLMenuContentButton(
    text: String,
    menuId: Int
): HTMLMenuButton(
    text = text,
    onClick = { notify(Notifier.menuIdChanged, menuId) }
) {

    var selected by renderProperty(false, 1)

    override fun render(identifier: Int) {
        when (identifier) {
            1 -> {
                classList.toggle("selected", selected)
            }
        }
    }

    companion object {
        init {
            style {
                "#$ID.selected" {
                    "background-color" to "#a1c6ff"
                }
            }
        }
    }
}