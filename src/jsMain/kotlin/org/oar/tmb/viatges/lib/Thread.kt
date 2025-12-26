package org.oar.tmb.viatges.lib

import kotlin.js.Promise

class Thread<T : Any>(
    private val runnable: () -> T
) {
    fun start() =
        Promise { resolve, _ ->
            resolve(runnable())
        }
}