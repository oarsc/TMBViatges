package org.oar.tmb.viatges.ui.calc.model

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import org.oar.tmb.viatges.utils.DateSerializer
import kotlin.js.Date

@Serializable
data class CalculationData(
    @Contextual
    val start: Date,
    @Contextual
    val end: Date,
    val exceptions: Map<String, Int> = emptyMap(),
    val zone: Int = 0,
    val days: List<Int> = listOf(2, 2, 2, 2, 2, 0, 0),
    val uni: Boolean = true,
    val young: Boolean = false
) {
    fun stringify(): String = JsonWithDate.encodeToString(serializer(), this)

    companion object {
        private val JsonWithDate = Json {
            serializersModule = SerializersModule {
                contextual(Date::class, DateSerializer)
            }
        }

        fun parse(json: String): CalculationData =
            JsonWithDate.decodeFromString(serializer(), json)
    }
}