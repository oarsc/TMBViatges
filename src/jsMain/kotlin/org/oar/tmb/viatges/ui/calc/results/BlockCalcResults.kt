package org.oar.tmb.viatges.ui.calc.results

import kotlinx.browser.window
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.HashController.path
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.Locale.translate
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Card
import org.oar.tmb.viatges.model.cards.YoungCard
import org.oar.tmb.viatges.ui._common.BlockBackButton
import org.oar.tmb.viatges.ui.calc.Common.getData
import org.oar.tmb.viatges.utils.extensions.DateExt.plusDays
import org.oar.tmb.viatges.utils.extensions.DateExt.toLocaleISODateString
import org.oar.tmb.viatges.utils.extensions.EventExt.onClick
import org.oar.tmb.viatges.utils.generateCards
import org.w3c.dom.HTMLDivElement
import kotlin.js.Date

class BlockCalcResults: HTMLBlock<HTMLDivElement>(DIV, id = ID) {
    private val data = getData()

    init {
        val results = calculate()

        +BlockBackButton().element {
            onClick {
                path.remove("subsection")
                updateUrl(pushHistory = true)
            }
        }
        +results(results, data.end)
    }

    private fun results(results: List<CardResults>, lastDay: Date) = DIV("results") {
        val cheapestCost = results.minOf { it.cost }.formatEuro()

        results.forEach { result ->
            val card = result.card

            +DIV("result") {
                +DIV("head") {
                    -card.name
                }
                +DIV("subhead") {
                    val text = "custom.usage-and-cost".translate.split("{cost}")

                    +text[0].replace("{usage}", result.count.toString())

                    val cost = result.cost.formatEuro()
                    +SPAN(if (cheapestCost == cost) "cheap" else null) {
                        -cost
                    }
                    +text[1].replace("{usage}", result.count.toString())
                }
                +DIV("remaining") {
                    val (remainingDays, remainingUsages) = card.remaining(lastDay)
                    val lastDayStr = lastDay.toLocaleISODateString()

                    if (remainingUsages != null) {
                        if (remainingUsages == 0) {
                            -"custom.no-remaining-usages".translate
                        } else if (remainingDays != null) {
                            if (remainingDays == 0) {
                                -"custom.no-remaining-days".translate.replace("{date}", lastDayStr)
                            } else {
                                -"custom.remaining-days-and-usages".translate
                                    .replace("{days}", remainingDays.toString())
                                    .replace("{usages}", remainingUsages.toString())
                                    .replace("{date}", lastDayStr)
                            }
                        } else {
                            -"custom.remaining-usages".translate
                                .replace("{usages}", remainingUsages.toString())
                                .replace("{date}", lastDayStr)
                        }
                    } else if (remainingDays == 0) {
                        -"custom.no-remaining-days".translate.replace("{date}", lastDayStr)
                    } else {
                        -"custom.remaining-days".translate
                            .replace("{days}", remainingDays.toString())
                            .replace("{date}", lastDayStr)
                    }
                }
            }
        }
    }

    private fun calculate(): List<CardResults> {
        val filteredCards = generateCards().toMutableList()

        if (!data.uni) {
            filteredCards.removeAll { it.uniPersonal }
        } else if (!data.young) {
            filteredCards.removeAll { it is YoungCard }
        }

        val results = filteredCards.map(::CardResults)
        var day = data.start
        val endDayTime = data.end.getTime()

        while (day.getTime() < endDayTime) {

            val usages = data.exceptions[day.toLocaleISODateString()] ?: data.days[(day.getDay()+6)%7]

            for (u in 0 until usages) {
                results.forEach { cardResult ->
                    val card = cardResult.card

                    if (!card.started) {
                        card.start(day)
                    }

                    if (card.isExpired(day)) {
                        cardResult.count++
                        card.reset()
                        card.start(day)
                        cardResult.cost += card.prices[data.zone]
                    }

                    val res = card.use(day)
                    if (!res) {
                        val error = Error("Calculation error...")
                        console.log(error)
                        window.alert(error.message ?: "")
                        throw error
                    }
                }
            }

            // Move to next day
            day = day.plusDays(1)
        }

        return results
    }

    inner class CardResults(
        val card: Card,
        var count: Int = 1,
        var cost: Double = card.prices[data.zone]
    )


    private fun Double.formatEuro(): String =
        "${this.asDynamic().toFixed(2)} €"

    companion object {
        const val ID = "calc-results"

        init {
            style {
                "#$ID" {
                    "position" to "relative"

                    ".results" {
                        "padding-top" to "50px"
                    }

                    ".result" {
                        "margin-bottom" to "20px"

                        ".head" {
                            "font-size" to "1.5em"
                            "font-weight" to "bold"
                        }
                        ".subhead" {
                            "margin-left" to "5px"
                            "> span" {
                                "color" to "#fc8544"
                                "font-weight" to "bold"

                                "&.cheap" {
                                    "color" to "#35ba13"
                                }
                            }
                        }
                        ".remaining" {
                            "margin" to "5px 0 0 5px"
                            "color" to "#666"
                        }
                    }
                }
            }
        }
    }
}