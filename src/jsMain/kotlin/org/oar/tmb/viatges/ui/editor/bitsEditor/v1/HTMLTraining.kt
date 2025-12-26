package org.oar.tmb.viatges.ui.editor.bitsEditor.v1

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.H2
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Output
import org.oar.tmb.viatges.model.OutputBit
import org.oar.tmb.viatges.model.OutputExercise
import org.w3c.dom.HTMLDivElement

class HTMLTraining(
    private val output: Output,
    private val exercise: OutputExercise,
    private val trainingBitGroups: List<List<OutputBit>>,
): HTMLBlock<HTMLDivElement>(DIV, className = org.oar.tmb.viatges.ui.editor.bitsEditor.v1.HTMLTraining.Companion.CLASS_NAME) {

    private val trainingId: Int

    init {
        val firstTrainingBit = trainingBitGroups.first().first()
        trainingId = firstTrainingBit.trainingId

        +H2 { - "Training #$trainingId" }
        trainingBitGroups.forEach {
            +org.oar.tmb.viatges.ui.editor.bitsEditor.v1.HTMLEditorExerciseHistory(output, it.toMutableList())
        }
    }

    companion object {
        const val CLASS_NAME = "training"
        init {
            style {
                ".${org.oar.tmb.viatges.ui.editor.bitsEditor.v1.HTMLTraining.Companion.CLASS_NAME}" {
                    "h2" {
                        "margin" to "40px 0 0"
                    }

                    ".training-exercise" {
                        "margin-top" to "25px"
                    }
                }
            }
        }
    }
}