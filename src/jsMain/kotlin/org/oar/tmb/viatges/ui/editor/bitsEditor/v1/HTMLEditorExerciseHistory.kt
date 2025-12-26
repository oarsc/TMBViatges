package org.oar.tmb.viatges.ui.editor.bitsEditor.v1

import org.oar.tmb.viatges.model.Output
import org.oar.tmb.viatges.model.OutputBit
import org.oar.tmb.viatges.ui._common.HTMLCommonExerciseHistory

class HTMLEditorExerciseHistory(
    output: Output,
    bits: MutableList<OutputBit>
) : HTMLCommonExerciseHistory(output, bits) {
    override val columns = super.columns - Column.ACTION
}