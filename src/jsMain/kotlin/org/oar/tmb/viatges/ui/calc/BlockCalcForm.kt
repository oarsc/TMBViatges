package org.oar.tmb.viatges.ui.calc

import kotlinx.browser.window
import org.oar.tmb.viatges.Style.TMB_STYLE
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.BUTTON
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.INPUT
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.LABEL
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.OPTION
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SELECT
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TABLE
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TBODY
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TD
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TH
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.THEAD
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.TR
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.Locale.translate
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.ui.calc.Common.getData
import org.oar.tmb.viatges.utils.Constants.WEEK_DAYS
import org.oar.tmb.viatges.utils.extensions.DateExt.diffDays
import org.oar.tmb.viatges.utils.extensions.DateExt.plusDays
import org.oar.tmb.viatges.utils.extensions.DateExt.toLocaleISODateString
import org.oar.tmb.viatges.utils.extensions.EventExt.onChange
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.generateCards
import org.oar.tmb.viatges.utils.zones
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLTableSectionElement
import kotlin.js.Date

class BlockCalcForm: HTMLBlock<HTMLDivElement>(DIV, id = ID) {
    private var data = getData()

    private val tableBody = TBODY()

    init {
        +SELECT(TMB_STYLE) {
            repeat(zones) {
                +OPTION {
                    val zone = it + 1
                    element.value = zone.toString()
                    -"${"zone".translate} $zone"
                }
            }
            element.apply {
                onChange {
                    data = data.copy(
                        zone = value.toInt() - 1
                    )
                    tableBody.refreshBody()
                    updateUrlParam()
                }
                value = (data.zone + 1).toString()
            }
        }

        +TABLE("main") {
            element.border=""
            +THEAD {
                +TR {
                    +TH { -"name".translate }
                    +TH { -"price".translate }
                    +TH { -"week-usages".translate }
                    +TH { -"dates".translate }
                }
            }
            +tableBody
        }

        val youngCardCheck = INPUT()

        +DIV {
            +LABEL {
                +INPUT.element {
                    type = "checkbox"
                    checked = data.uni
                    onChange {
                        youngCardCheck.element.disabled = !checked
                        youngCardCheck.element.checked = false
                        data = data.copy(young = false, uni = checked)
                        updateUrlParam()
                    }
                }
                +"label.show-unipersonal-cards".translate
            }
        }
        +DIV {
            +LABEL {
                +youngCardCheck.element {
                    type = "checkbox"
                    disabled = !data.uni
                    checked = data.young
                    onChange {
                        data = data.copy(young = checked)
                        updateUrlParam()
                    }
                }
                +"label.show-young-cards".translate
            }
        }
        +DIV("buttons-separator") {
            +BUTTON(TMB_STYLE) {
                element {
                    onClick {
                        path["subsection"] = "results"
                        updateUrl(pushHistory = true)
                    }
                }
                -"calculate".translate
            }
            +BUTTON(TMB_STYLE) {
                -"exceptional-days".translate
                element {
                    onClick {
                        path["subsection"] = "days"
                        updateUrl(pushHistory = true)
                    }
                }
            }
        }
        +BUTTON(TMB_STYLE) {
            -"clean".translate
            element {
                onClick {
                    params.remove("d")
                    data = getData()
                    updateUrl()
                }
            }
        }
        tableBody.refreshBody()
    }

    private fun HTMLBlock<HTMLTableSectionElement>.refreshBody() {
        clear(detachMode = DetachMode.DETACH_ONLY_CHILDREN)

        val cards = generateCards()
        cards.forEachIndexed { idx, card ->
            +TR {
                +TD("card-name") { -card.name }
                +TD { -card.prices[data.zone].formatEuro() }

                if (idx == 0) {
                    +TD("centered") {
                        element.apply {
                            rowSpan = cards.size
                            +buildWeekDays()
                        }
                    }

                    +TD {
                        element.apply {
                            rowSpan = cards.size
                            +buildDaysRange()
                        }
                    }
                }
            }
        }
    }

    private fun buildWeekDays() = TABLE("days-table") {
        +TBODY {
            WEEK_DAYS.forEachIndexed { idx, dayName ->
                +TR {
                    +TD("week-days-name") { -dayName.translate }
                    +TD("centered") {
                        +INPUT("week-days").element {
                            type = "number"
                            min = "0"
                            max = "99"
                            value = data.days[idx].toString()
                            onChange {
                                data = data.copy(
                                    days = data.days.toMutableList().apply {
                                        set(idx, value.toInt())
                                    }
                                )
                                updateUrlParam()
                            }
                        }
                    }
                }
            }
        }
    }

    private fun buildDaysRange() = TABLE("days-range") {
        +TBODY {
            val startInput = INPUT.element {
                placeholder = "AAAA-MM-DD"
                autocomplete = "off"
                value = data.start.toLocaleISODateString()
            }

            val endInput = INPUT.element {
                placeholder = "AAAA-MM-DD"
                autocomplete = "off"
                value = data.end.toLocaleISODateString()
            }

            val diffInput = INPUT.element {
                type = "number"
                min = "0"
                value = data.start.diffDays(data.end).toString()
            }

            +TR { +TD("label") { -"label.start-day-input".translate }}
            +TR { +TD {
                +startInput.element {
                    onChange {
                        if ("^2\\d{3}-[01]\\d-[0-3]\\d$".toRegex().matches(value)) {
                            val newStartValue = Date(value)
                            val newEndDate = newStartValue.plusDays(diffInput.element.value.toInt())
                            data = data.copy(start = newStartValue, end = newEndDate)
                            endInput.element.value = newEndDate.toLocaleISODateString()
                            updateUrlParam()
                        }
                    }
                }
            }}
            +TR { +TD("day-add-label") {
                +LABEL {
                    val text = "custom.add-days".translate.split("{days}")

                    +text[0].trim()
                    +diffInput.element {
                        onChange {
                            val newEndDate = data.start.plusDays(value.toInt())
                            data = data.copy(end = newEndDate)
                            endInput.element.value = newEndDate.toLocaleISODateString()
                            updateUrlParam()
                        }
                    }
                    +text[1].trim()
                }
            }}
            +TR { +TD("label") { -"label.end-day-input".translate }}
            +TR { +TD {
                +endInput.element {
                    onChange {
                        if ("^2\\d{3}-[01]\\d-[0-3]\\d$".toRegex().matches(value)) {
                            val newEndDate = Date(value)
                            data = data.copy(end = newEndDate)
                            diffInput.element.value = data.start.diffDays(newEndDate).toString()
                            updateUrlParam()
                        }
                    }
                }
            }}
        }
    }

    private fun updateUrlParam() {
        params["d"] = data.stringify().let(window::btoa)
        updateUrl(redirect = false)
    }

    private fun Double.formatEuro(): String =
        "${this.asDynamic().toFixed(2)} €"

    companion object {
        const val ID = "calc-form"

        init {
            style {
                "#$ID" {
                    "button" {
                        "margin" to "1px"
                    }
                    ".buttons-separator" {
                        "margin-top" to "15px"
                    }
                    "table" {
                        "border-collapse" to "collapse"
                        "border-width" to "1px"

                        "&.main" {
                            "margin" to "2px 0"
                        }

                        ".card-name" {
                            "background-color" to "#eee"
                        }

                        "th" {
                            "background-color" to "#333"
                            "color" to "#fff"
                            "border-color" to "#000"
                        }

                        "td, th" {
                            "padding" to "3px 6px"
                        }

                        ".centered" {
                            "text-align" to "center"
                        }

                        ".days-table" {
                            "display" to "inline-block"
                            ".week-days-name" {
                                "text-align" to "right"
                                "font-size" to "0.75em"
                            }

                            ".week-days" {
                                "width" to "35px"
                            }
                        }

                        ".days-range" {
                            ".label" {
                                "font-size" to "0.75em"
                                "font-weight" to "bold"
                            }

                            ".day-add-label" {
                                "padding" to "14px 0"
                                "font-size" to "0.75em"
                                "text-align" to "center"

                                "input" {
                                    "width" to "35px"
                                    "text-align" to "center"
                                    "font-size" to "1em"
                                    "margin" to "0 5px"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}