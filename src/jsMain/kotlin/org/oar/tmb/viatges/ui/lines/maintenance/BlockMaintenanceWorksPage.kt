package org.oar.tmb.viatges.ui.lines.maintenance

import org.oar.tmb.viatges.Style.PRIMARY_COLOR
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.H2
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.Locale.translate
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.MaintenanceWork
import org.oar.tmb.viatges.ui._common.BlockBackButton
import org.oar.tmb.viatges.ui.lines.BlockLine
import org.oar.tmb.viatges.utils.extensions.DateExt.toLocaleISODateString
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.maintenanceWorks
import org.w3c.dom.HTMLDivElement

class BlockMaintenanceWorksPage: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    init {
        +BlockBackButton().element {
            onClick {
                path.remove("subsection")
                updateUrl(pushHistory = true)
            }
        }

        +H2 {
            -"works-affected-stations".translate
        }

        maintenanceWorks.forEach {
            +generateMaintenanceWork(it)
        }
    }

    private fun generateMaintenanceWork(work: MaintenanceWork) = SPAN("work") {
        +DIV("stations") {
            val title = buildString {
                append(work.start.toLocaleISODateString())
                append(" - ")
                append(work.end.toLocaleISODateString())
            }

            +BlockLine(work.line, title, open = true, hideConnections = true, clickable = false).apply {
                work.stations.forEach(::addStation)
            }
        }
    }

    companion object {
        const val ID = "maintenance-works"

        init {
            style {
                "#$ID" {
                    "h2" {
                        "padding-top" to "13px"
                        "margin-bottom" to "34px"
                        "padding-bottom" to "10px"
                        "border-bottom" to "3px solid $PRIMARY_COLOR"
                        "text-align" to "center"
                    }

                    ".work" {
                        "display" to "inline-block"
                        "text-align" to "left"
                        "vertical-align" to "top"
                        "margin" to "0 20px 20px"
                    }
                }
            }
        }
    }
}