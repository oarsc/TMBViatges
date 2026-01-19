package org.oar.tmb.viatges.ui.calc.exceptions

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.ui._common.BlockBackButton
import org.oar.tmb.viatges.ui.calc.Common.getData
import org.oar.tmb.viatges.utils.extensions.DateExt.compareTo
import org.oar.tmb.viatges.utils.extensions.DateExt.firstDayOfNextMonth
import org.oar.tmb.viatges.utils.extensions.DateExt.plusDays
import org.oar.tmb.viatges.utils.extensions.DateExt.weekDay
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.w3c.dom.HTMLDivElement
import kotlin.js.Date

class BlockCalcDays: HTMLBlock<HTMLDivElement>(DIV, id = ID) {
    private var data = getData()

    init {
        var day = data.start

        +BlockBackButton().element {
            onClick {
                path.remove("subsection")
                updateUrl(pushHistory = true)
            }
        }

        +DIV("months") {
            while (day < data.end) {
                +BlockMonth(
                    month = day.getUTCMonth(),
                    year = day.getUTCFullYear()
                ) {
                    calculateWeeks(day).forEach {
                        +BlockWeekRow(it)
                    }
                }

                day = day.firstDayOfNextMonth()
            }
        }
    }

    private fun calculateWeeks(date: Date): MutableList<MutableList<Date?>> {
        val thisMonth = date.getUTCMonth()

        var currentDate = date.plusDays(1)
        var currentWeek: MutableList<Date?> = MutableList(date.weekDay) { null }
        currentWeek.add(date)
        val weeks = mutableListOf(currentWeek)

        while (currentDate.getUTCMonth() == thisMonth && currentDate < data.end) {
            if (currentDate.weekDay == 0) {
                currentWeek = mutableListOf()
                weeks.add(currentWeek)
            }
            currentWeek.add(currentDate)
            currentDate = currentDate.plusDays(1)
        }

        while (currentWeek.size < 7) {
            currentWeek.add(null)
        }
        return weeks
    }

    companion object {
        const val ID = "calc-exceptions"

        init {
            style {
                "#$ID" {
                    "position" to "relative"

                    ".months" {
                        "padding-top" to "50px"
                    }
                }
            }
        }
    }
}