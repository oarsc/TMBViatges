package org.oar.tmb.viatges.ui.lines

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.BUTTON
import org.oar.lib.HTMLDefinitionConstants.DIV
import org.oar.lib.HTMLDefinitionConstants.OPTION
import org.oar.lib.HTMLDefinitionConstants.TABLE
import org.oar.lib.HTMLDefinitionConstants.TBODY
import org.oar.lib.HTMLDefinitionConstants.TD
import org.oar.lib.HTMLDefinitionConstants.TR
import org.oar.lib.HashController.params
import org.oar.lib.HashController.path
import org.oar.lib.HashController.updateUrl
import org.oar.lib.Locale.translate
import org.oar.lib.style
import org.oar.tmb.viatges.Style.TMB_STYLE
import org.oar.tmb.viatges.ui.support.BlockInput
import org.oar.tmb.viatges.ui.support.BlockSelect
import org.oar.tmb.viatges.utils.extensions.DateExt.toLocaleISODateString
import org.oar.tmb.viatges.utils.extensions.EventExt.dispatchChange
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.stationsData
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLSelectElement
import kotlin.js.Date

class BlockJourneyFilter: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    private val originSelect = BlockSelect(param = "i", className = TMB_STYLE) {
        addStationOptions()
    }

    private val destinationSelect = BlockSelect(param = "f", className = TMB_STYLE) {
        addStationOptions()
    }

    private val dayInput = BlockInput(param = "w", className = TMB_STYLE)

    init {
        dayInput.element {
            placeholder = "AAAA-MM-DD"
            autocomplete = "off"
        }

        +TABLE {
            +TBODY {
                +TR {
                    +TD { -"origin".translate }
                    +TD {
                        element.colSpan = 2
                        +originSelect
                    }
                }
                +TR {
                    +TD { -"destination".translate }
                    +TD {
                        element.colSpan = 2
                        +destinationSelect
                    }
                }
                +TR {
                    +TD { -"day".translate }
                    +TD { +dayInput }
                    +TD {
                        +BUTTON(TMB_STYLE) {
                            element.apply {
                                onClick {
                                    dayInput.element.apply {
                                        value = Date().toLocaleISODateString()
                                        dispatchChange()
                                    }
                                }
                            }
                            -"today".translate
                        }
                    }
                }
                +TR {
                    +TD()
                    +TD("submit-buttons") {
                        element.colSpan = 2

                        +BUTTON("$TMB_STYLE tertiary see-maintenance") {
                            element.onClick {
                                path["subsection"] = "maintenance"
                                updateUrl(pushHistory = true)
                            }
                            -"maintenance-works".translate

                        }
                        +BUTTON("$TMB_STYLE submit") {
                            element.onClick {
                                path["subsection"] = "results"
                                params.remove("p") // go to first page
                                originSelect.setParamValue()
                                destinationSelect.setParamValue()
                                dayInput.setParamValue()
                                updateUrl(pushHistory = true)
                            }
                            -"search".translate
                        }
                    }
                }
            }
        }
    }

    private fun HTMLBlock<HTMLSelectElement>.addStationOptions() {
        stationsData.values.forEachIndexed { idx, station ->
            +OPTION {
                element.value = "$idx"
                -station.name
            }
        }
    }

    companion object {
        const val ID = "journey-filter"

        init {
            style {
                "#$ID" {
                    "> table" {
                        "margin" to "auto"

                        "select.$TMB_STYLE" {
                            "width" to "100%"
                        }
                    }

                    ".submit-buttons" {
                        "text-align" to "right"
                        "position" to "relative"

                        ".submit" {
                            "padding" to "5px 40px"
                            "font-size" to "1em"
                        }

                        ".see-maintenance" {
                            "left" to "0"
                            "position" to "absolute"
                            "font-weight" to "normal"
                            "font-size" to "0.95em"
                        }
                    }
                }
            }
        }
    }
}