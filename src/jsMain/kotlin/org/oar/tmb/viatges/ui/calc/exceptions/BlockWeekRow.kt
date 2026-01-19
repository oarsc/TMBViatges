package org.oar.tmb.viatges.ui.calc.exceptions

import kotlinx.browser.window
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.BUTTON
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.INPUT
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TD
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TR
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.ui.calc.Common.getData
import org.oar.tmb.viatges.ui.calc.model.CalculationData
import org.oar.tmb.viatges.utils.extensions.DateExt.toLocaleISODateString
import org.oar.tmb.viatges.utils.extensions.DateExt.weekDay
import org.oar.tmb.viatges.utils.extensions.EventExt.onChange
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.w3c.dom.HTMLTableRowElement
import kotlin.js.Date

class BlockWeekRow(
    weekDays: List<Date?>
): HTMLBlock<HTMLTableRowElement>(TR, className = CLASS_NAME) {

    private val defaultUsages = getData().days

    init {
        weekDays.forEachIndexed { idx, day ->
            if (day == null) {
                +TD("d$idx empty")
            } else {
                +TD("d$idx") {
                    val customDays = getData().exceptions[day.toLocaleISODateString()]
                    classList.toggle("edited", customDays != null)

                    val input = INPUT()
                    val button = BUTTON {
                        element {
                            classList.toggle("hidden", customDays == null)
                            onClick {
                                var data = getData()
                                data = data.copy(
                                    exceptions = data.exceptions - day.toLocaleISODateString()
                                )
                                this@TD.classList.remove("edited")
                                classList.add("hidden")
                                input.element.value = day.defaultUsages.toString()
                                updateUrlParam(data)
                            }
                        }
                        -"×"
                    }

                    +DIV {
                        +DIV("dianum") {
                            -day.getUTCDate().toString()
                        }
                        +input.element {
                            value = (customDays ?: day.defaultUsages).toString()
                            onChange {
                                value.toIntOrNull()?.let { value ->
                                    var data = getData()

                                    if (value == day.defaultUsages) {
                                        data = data.copy(
                                            exceptions = data.exceptions - day.toLocaleISODateString()
                                        )
                                        this@TD.classList.remove("edited")
                                        button.classList.add("hidden")
                                    } else {
                                        data = data.copy(
                                            exceptions = data.exceptions + (day.toLocaleISODateString() to value)
                                        )
                                        this@TD.classList.add("edited")
                                        button.classList.remove("hidden")
                                    }
                                    updateUrlParam(data)
                                }
                            }
                        }
                        +button
                    }
                }
            }
        }
    }

    private val Date.defaultUsages get() = this@BlockWeekRow.defaultUsages[weekDay]

    private fun updateUrlParam(data: CalculationData) {
        params["d"] = data.stringify().let(window::btoa)
        updateUrl(redirect = false)
    }

    companion object {
        const val CLASS_NAME = "week"

        init {
            style {
                ".$CLASS_NAME" {
                    "td" {
                        "border" to "1px solid #aaa"
                        "width" to "100px"
                        "transition" to "background-color 0.2s"

                        "> div" {
                            "position" to "relative"
                        }

                        "&:hover" {
                            "background-color" to "#eef9ff"

                            "input" {
                                "border-color" to "#00abff"
                            }
                        }

                        "&.edited" {
                            "background-color" to "#ffdc54"

                            "&:hover" {
                                "background-color" to "#ffc454"
                            }
                        }

                        "&.empty" {
                            "background-color" to "#ddd"
                        }
                    }

                    "input" {
                        "width" to "41px"
                        "height" to "20px"
                        "float" to "right"
                        "text-align" to "center"
                        "background-color" to "#f4f4f4"
                        "border" to "1px solid #aaa"
                        "margin-top" to "8px"
                    }

                    "button" {
                        "position" to "absolute"
                        "top" to "1px"
                        "right" to "0"
                        "border" to "1px solid #ae2e2e"
                        "background-color" to "#ff8686"
                        "width" to "30px"
                        "height" to "18px"
                        "padding" to "0"
                        "transition" to "background-color 0.3s"
                        "color" to "#fff"
                        "font-weight" to "bold"
                        "border-radius" to "5px"
                        "margin" to "1px"
                        "cursor" to "pointer"

                        "&.hidden" {
                            "display" to "none"
                        }
                    }
                }
            }
        }
    }
}