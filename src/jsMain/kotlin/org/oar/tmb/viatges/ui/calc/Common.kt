package org.oar.tmb.viatges.ui.calc

import kotlinx.browser.window
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.ui.calc.model.CalculationData
import org.oar.tmb.viatges.utils.extensions.DateExt.plusDays
import org.oar.tmb.viatges.utils.extensions.DateExt.startOfTheDay
import kotlin.js.Date

object Common {
    fun getData() = params["d"]?.let(window::atob)?.let(CalculationData::parse)
        ?: CalculationData(
            start = Date().startOfTheDay(),
            end = Date().plusDays(30).startOfTheDay()
        )
}