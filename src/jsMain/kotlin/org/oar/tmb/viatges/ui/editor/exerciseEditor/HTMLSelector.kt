package org.oar.tmb.viatges.ui.editor.exerciseEditor

import org.oar.tmb.viatges.Style.BUTTON_STYLE
import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.BUTTON
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Output
import org.oar.tmb.viatges.model.OutputExercise
import org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog
import org.oar.tmb.viatges.utils.Export
import org.oar.tmb.viatges.utils.Notifier
import org.w3c.dom.HTMLDivElement

class HTMLSelector: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    private var output: Output = read(Export.output)!!
    private var exerciseSelected: OutputExercise? = null

    init {
        +BUTTON("$BUTTON_STYLE big") {
            element.onclick = { showDialog() }
            -"Select exercise"
        }
    }

    private fun showDialog() {
        +org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog(initialExerciseId = exerciseSelected?.exerciseId) {
            if (it != null) {
                val exercise = output.exercise[it]!!
                exerciseSelected = exercise
                notify(Notifier.exerciseSelected, exercise)
            }
        }
    }

    companion object {
        const val ID = "selector"
        init {
            style {
                "#$ID" {
                    "position" to "absolute"
                    "right" to "0"
                    "top" to "0"
                    "margin" to "20px"
                }
            }
        }
    }
}