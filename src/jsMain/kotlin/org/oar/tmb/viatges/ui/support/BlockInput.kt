package org.oar.tmb.viatges.ui.support

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.INPUT
import org.oar.lib.HashController.params
import org.oar.lib.HashController.updateUrl
import org.oar.tmb.viatges.utils.extensions.EventExt.onChange
import org.w3c.dom.HTMLInputElement

open class BlockInput(
    private val param: String,
    className: String? = null,
    id: String? = null,
    extraBuild: HTMLBlock<HTMLInputElement>.() -> Unit = {}
): HTMLBlock<HTMLInputElement>(INPUT, className = className, id = id) {
    init {
        extraBuild()
        element.apply {
            name = param
            params[param]?.also {
                element.value = it
            }
            onChange {
                setParamValue()
                updateUrl(redirect = false)
            }
        }
    }

    fun setParamValue() {
        if (element.value.isBlank()) params.remove(param)
        else params[param] = element.value
    }
}