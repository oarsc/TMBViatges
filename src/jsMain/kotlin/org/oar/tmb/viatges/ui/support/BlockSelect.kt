package org.oar.tmb.viatges.ui.support

import org.oar.lib.HTMLBlock
import org.oar.lib.HTMLDefinitionConstants.SELECT
import org.oar.lib.HashController.params
import org.oar.lib.HashController.updateUrl
import org.oar.tmb.viatges.utils.extensions.EventExt.onChange
import org.w3c.dom.HTMLSelectElement

open class BlockSelect(
    private val param: String,
    className: String? = null,
    id: String? = null,
    extraBuild: HTMLBlock<HTMLSelectElement>.() -> Unit
): HTMLBlock<HTMLSelectElement>(SELECT, className = className, id = id) {
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