package org.oar.tmb.viatges

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLBlock.Companion.HTMLBodyBlock
import org.oar.tmb.viatges.lib.HTMLBlock.Companion.listen
import org.oar.tmb.viatges.lib.HTMLBlock.Companion.read
import org.oar.tmb.viatges.lib.HTMLBlock.DetachMode
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.ui.calendar.HTMLCalendarContainer
import org.oar.tmb.viatges.ui.editor.HTMLEditorContainer
import org.oar.tmb.viatges.ui.input.HTMLInputContainer
import org.oar.tmb.viatges.ui.menu.HTMLMenu
import org.oar.tmb.viatges.ui.menu.HTMLMenu.Companion.CALENDAR_OPTION
import org.oar.tmb.viatges.ui.menu.HTMLMenu.Companion.EDITOR_OPTION
import org.oar.tmb.viatges.utils.Export
import org.oar.tmb.viatges.utils.Notifier
import org.w3c.dom.HTMLDivElement

fun main() {
    Style.load()

    val divContainer = DIV()

//    HTMLBodyBlock.apply {
//        +HTMLMenu()
//        +HTMLInputContainer()
//        +divContainer
//
//        listen(Notifier.fileLoaded) {
//            detachAll(listeners = true)
//
//            listen(Notifier.fileLoaded) {
//                divContainer.loadContent()
//            }
//
//            listen(Notifier.menuIdChanged) {
//                divContainer.loadContent(it)
//            }
//
//            divContainer.loadContent()
//        }
//    }
}

//fun HTMLBlock<HTMLDivElement>.loadContent(
//    content: Int = read(Export.menuId)!!
//) {
//    clear(detachMode = DetachMode.DETACH_ONLY_CHILDREN)
//    when(content) {
//        CALENDAR_OPTION -> +HTMLCalendarContainer()
//        EDITOR_OPTION -> +HTMLEditorContainer()
//    }
//}
