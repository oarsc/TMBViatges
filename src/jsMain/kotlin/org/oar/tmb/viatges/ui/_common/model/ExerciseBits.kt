package org.oar.tmb.viatges.ui._common.model

import org.oar.tmb.viatges.model.OutputBit
import org.oar.tmb.viatges.model.OutputExercise
import org.oar.tmb.viatges.model.OutputVariation

data class ExerciseBits(
    var exercise: OutputExercise,
    var variation: OutputVariation,
    var bits: MutableList<OutputBit> = mutableListOf()
)