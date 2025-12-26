package org.oar.tmb.viatges.utils

import org.oar.tmb.viatges.lib.NotifierId
import org.oar.tmb.viatges.model.Line

object Page {
    const val LINES_PAGE = "lines"
    const val CALC_PAGE = "calc"
}

object Export {
//    val menuId = object : ExportId<Int>() {}
}

object Notifier {
    val openLine = object : NotifierId<Line>() {}

}