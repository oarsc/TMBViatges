package org.oar.tmb.viatges.utils.extensions

import kotlin.js.Date
import kotlin.math.abs
import kotlin.math.ceil

object DateExt {
    fun Date.middleDate(other: Date): Date = Date((this.getTime() + other.getTime()) / 2)

    fun Date.toLocaleISOString(): String = buildString {
        append(toLocaleISODateString())
        append("T")
        append(toLocaleISOTimeString())
    }

    fun Date.toLocaleISODateString(): String {
        fun pad(n: Int, d: Int = 2): String = n.toString().padStart(d, '0')

        val year = getFullYear()
        val month = pad(getMonth() + 1)
        val day = pad(getDate())

        return "$year-$month-$day"
    }

    fun Date.toLocaleISOTimeString(): String {
        fun pad(n: Int, d: Int = 2): String = n.toString().padStart(d, '0')

        val hours = pad(getHours())
        val minutes = pad(getMinutes())
        val seconds = pad(getSeconds())
        val millis = pad(getMilliseconds(), 3)

        return "$hours:$minutes:$seconds.$millis"
    }

    fun Date.startOfTheDay(): Date = Date.UTC(
        year = getUTCFullYear(),
        month = getUTCMonth(),
        day = getUTCDate(),
        hour = 0,
        minute = 0,
        second = 0,
        millisecond = 0
    ).let(::Date)

    fun Date.plusDays(days: Int): Date =
        Date(getTime() + (days.toLong() * MILLIS_PER_DAY))

    fun Date.firstDayOfNextMonth(): Date = Date.UTC(
        year = getUTCFullYear(),
        month = getUTCMonth() + 1,
        day = 1,
        hour = 0,
        minute = 0,
        second = 0,
        millisecond = 0
    ).let(::Date)

    operator fun Date.compareTo(other: Date): Int {
        val t1 = this.getTime()
        val t2 = other.getTime()
        return when {
            t1 < t2 -> -1
            t1 > t2 -> 1
            else -> 0
        }
    }

    fun Date.diffDays(otherDate: Date): Int = getTime().diffDays(otherDate.getTime())
    fun Double.diffDays(otherDate: Double): Int {
        val diffTime = abs(this - otherDate)
        return ceil(diffTime / (1000 * 60 * 60 * 24)).toInt()
    }

    val Date.weekDay get() = (getUTCDay() + 6) % 7

    private const val MILLIS_PER_DAY = 86_400_000
}