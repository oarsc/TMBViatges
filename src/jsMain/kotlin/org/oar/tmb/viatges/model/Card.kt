package org.oar.tmb.viatges.model

import org.oar.tmb.viatges.utils.extensions.DateExt.diffDays
import org.oar.tmb.viatges.utils.extensions.DateExt.startOfTheDay
import kotlin.js.Date

abstract class Card(
    val name: String,
    val prices: List<Double>,
    val uniPersonal: Boolean = true,
    private val days: Int? = null,
    private val usages: Int? = null
) {
    private var currentUsages = usages ?: -1
    private var finalDate: Double = 0.0
    var started = false

    init {
        if ((days == null || days == 0) && (usages == null || usages == 0)) {
            throw Error("Card must have a limit")
        }
    }

    fun start(date: Date) {
        started = true
        ifDates {
            finalDate = Date.UTC(
                year = date.getUTCFullYear(),
                month = date.getUTCMonth(),
                day = date.getUTCDate() + days!!,
                hour = 0,
                minute = 0,
                second = 0,
                millisecond = 0
            )
        }
    }

    fun use(date: Date): Boolean {
        ifDates {
            if (finalDate < date.startOfTheDay().getTime()) {
                return false
            }
        }
        ifUsages {
            if (currentUsages > 0) {
                currentUsages--
            } else {
                return false
            }
        }
        return true
    }

    fun isExpired(date: Date): Boolean {
        ifUsages {
            if (currentUsages <= 0) {
                return true
            }
        }
        ifDates {
            return finalDate <= date.startOfTheDay().getTime()
        }
        return false
    }

    fun remaining(date: Date): RemainingInfo {
        var days: Int? = null
        ifDates {
            days = finalDate.diffDays(date.getTime())
        }

        return RemainingInfo(
            uses = this.currentUsages.takeIf { this.usages != null },
            days = days
        )
    }

    fun reset() {
        currentUsages = usages ?: -1
        finalDate = 0.0
        started = false
    }

    private inline fun ifUsages(callback: () -> Unit) {
        if (usages != null && usages > 0) {
            callback()
        }
    }

    private inline fun ifDates(callback: () -> Unit) {
        if (days != null && days > 0) {
            callback()
        }
    }
}