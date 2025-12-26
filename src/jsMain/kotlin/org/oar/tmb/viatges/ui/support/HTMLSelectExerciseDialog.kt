package org.oar.tmb.viatges.ui.support

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.INPUT
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.SPAN
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.OutputExercise
import org.oar.tmb.viatges.utils.Export
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.ScrollToOptions

open class HTMLSelectExerciseDialog(
    private val initialExerciseId: Int? = null,
    private val onSelect: (Int?) -> Unit,
): org.oar.tmb.viatges.ui.support.HTMLPopup(id = org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.Companion.ID) {

    private val output = read(Export.output)!!

    private val filter = INPUT(className = "exercise-filter")
    private val list = DIV(className = "exercise-list")
    private val muscles = mutableMapOf<Int, org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.MuscleElement>()

    init {
        filter.element.apply {
            onkeyup = { event ->
                when (event.keyCode) {
                    // Escape
                    27 -> submit()
                    // Enter
                    13 -> {
                        val id = filter.element.value.toIntOrNull()
                        if (id != null) {
                            if (output.exercise.containsKey(id)){
                                submit(id)
                            }

                        } else {
                            muscles.values
                                .flatMap { it.exercises }
                                .firstOrNull { !it.block.classList.contains("hide") }
                                ?.also { submit(it.exerciseId) }
                        }
                    }
                    else -> {
                        this@HTMLSelectExerciseDialog.list.element.scrollTo(.0, .0)

                        val value = filter.element.value.trim().lowercase()
                        muscles.values
                            .flatMap { it.exercises }
                            .forEach {
                                it.block.classList.toggle("hide", !match(it.exerciseId, value))
                            }
                        muscles.values.forEach { muscleElements ->
                            val hasVisibleExercise = muscleElements.exercises.any {
                                    val classes = it.block.classList
                                    classes.contains("exercise-item") && !classes.contains("hide")
                                }

                            muscleElements.block.classList.toggle("hide", !hasVisibleExercise)
                        }
                    }
                }
                Unit
            }
        }

        content.apply {
            +filter
            +list.apply {
                output.muscles.values.forEach {
                    +DIV ("exercise-muscle") {
                        muscles[it.muscleId] =
                            org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.MuscleElement(it.muscleId, this)

                        +SPAN("title") {
                            -it.name
                        }
                    }
                }

                output.primaries.forEach { (exerciseId, muscleId) ->
                    val exercise = output.exercise[exerciseId]!!
                    val muscle = muscles[muscleId]!!

                    muscle.block.append(
                        createExerciseListItem(muscle, exercise)
                    )
                }
            }
        }
    }

    override fun render(identifier: Int) {
        when(identifier) {
            -1 -> {
                filter.element.focus()

                if (initialExerciseId != null) {
                    val elem = muscles.values
                        .flatMap { it.exercises }
                        .first { it.exerciseId == initialExerciseId }.block.element

                    list.element.scrollTo(ScrollToOptions(
                        top = elem.offsetTop - list.element.offsetTop - 84.0
                    ))
                }
            }
        }
    }

    private fun match(exerciseId: Int, value: String): Boolean {
        if (value.isBlank()) return true

        value.toIntOrNull()
            ?.also { return exerciseId.toString().contains(value) }

        val exercise = output.exercise[exerciseId]!!
        val exerciseName = exercise.name.lowercase()

        return value
            .split(" ")
            .all { exerciseName.contains(it) }
    }

    private fun createExerciseListItem(muscle: org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.MuscleElement, exercise: OutputExercise): HTMLBlock<HTMLDivElement> =
        DIV(className = "exercise-item") {
                muscle.exercises.add(
                    org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.ExerciseElement(
                        exercise.exerciseId,
                        this
                    )
                )

                element.apply {
                    onclick = { submit(exercise.exerciseId) }
                    classList.toggle("selected", exercise.exerciseId == initialExerciseId)
                }

                +org.oar.tmb.viatges.ui.support.HTMLExerciseIcon(
                    source = exercise.image,
                    hue = output.muscles[muscle.muscleId]!!.colorHue,
                    size = 48,
                )

                +SPAN("exe-id") {
                    -exercise.exerciseId.toString()
                }
                +SPAN("ex") {
                    -exercise.name
                }
            }

    override fun closePopup() = submit(null)

    private fun submit(id: Int? = null) {
        super.closePopup()
        onSelect(id)
    }

    data class MuscleElement(
        val muscleId: Int,
        val block: HTMLBlock<HTMLDivElement>,
        val exercises: MutableList<org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.ExerciseElement> = mutableListOf(),
    )

    data class ExerciseElement(
        val exerciseId: Int,
        val block: HTMLBlock<HTMLDivElement>,
    )

    companion object {
        const val ID = "exercise-dialog"
        init {
            style {
                "#${org.oar.tmb.viatges.ui.support.HTMLSelectExerciseDialog.Companion.ID} .content" {
                    "display" to "flex"
                    "flex-direction" to "column"
                    "width" to "750px"
                    "height" to "min(100vh, 900px)"
                    "min-height" to "200px"
                    "margin" to "auto"
                    "background-color" to "white"

                    ".exercise-filter" {
                        "align-self" to "center"
                        "width" to "650px"
                        "padding" to "12px"
                        "margin" to "10px 0"
                        "font-size" to "1.2em"
                    }

                    ".exercise-muscle" {
                        ".title" {
                            "display" to "block"
                            "text-align" to "center"
                            "font-weight" to "bold"
                            "font-size" to "1.1em"
                            "padding" to "5px 0"
                            "border-bottom" to "1px dotted gray"
                        }

                        "&.hide" {
                            "display" to "none"
                        }
                    }

                    ".exercise-list" {
                        "overflow" to "auto"
                    }

                    ".exercise-item" {
                        "border" to "dotted gray"
                        "border-width" to "0 0 1px"
                        "padding" to "2px 10px"
                        "user-select" to "none"
                        "cursor" to "pointer"
                        "transition" to "background-color 0.3s"

                        "&:hover" {
                            "background-color" to "#EEE"
                        }

                        "&.selected" {
                            "background-color" to "#a1c6ff"
                        }

                        "&.hide" {
                            "display" to "none"
                        }

                        "> *" {
                            "vertical-align" to "middle"
                        }
                    }

                    ".exe-id" {
                        "display" to "inline-block"
                        "text-align" to "right"
                        "width" to "40px"
                        "color" to "gray"
                    }
                    ".ex::before, .exe::before" {
                        "content" to "\" - \""
                    }
                }
            }
        }
    }
}