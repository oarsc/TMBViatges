package org.oar.tmb.viatges

import org.oar.tmb.viatges.lib.style

object Style {
    fun load() {
        style {
            "body" {
                "margin" to "0 auto 200px"
                "font-family" to "Arial,Helvetica,sans-serif"
                "max-width" to "700px"
                "min-width" to "615px"
                "font-size" to "15px"
            }

            "button.$TMB_STYLE" {
                "transition" to "background-color 0.2s"

                "&.secondary:hover" {
                    "color" to PRIMARY_FOCUS_COLOR
                }

                "&:hover" {
                    "background-color" to PRIMARY_FOCUS_COLOR
                }
            }

            "select.$TMB_STYLE, button.$TMB_STYLE, input.$TMB_STYLE" {
                "border" to "0"
                "background-color" to PRIMARY_COLOR
                "color" to PRIMARY_FOREGROUND_COLOR
                "font-weight" to "bold"
                "padding" to "7px 15px"
                "border-radius" to "5px"
                "cursor" to "pointer"

                "&.secondary" {
                    "background-color" to "inherit"
                    "color" to PRIMARY_COLOR
                    "padding" to "5px 13px"
                    "border" to "2px solid $PRIMARY_COLOR"
                    "transition" to "border-color 0.2s, color 0.2s"
                }
            }

            "input[type=date], input[type=datetime-local]" {
                "height" to "19px"
            }

            "input.subtle, select.subtle" {
                "&:not(:focus)" {
                    "background-color" to "transparent"
                    "border" to "1px solid transparent"
                }

                "&:hover:not(:disabled)" {
                    "border-color" to "#5f5f68"
                }
            }
        }
    }

    const val TMB_STYLE = "o-tmb"

    const val PRIMARY_COLOR = "#E30613"
    const val PRIMARY_FOCUS_COLOR = "#F53A46"
    const val PRIMARY_FOREGROUND_COLOR = "#FFF"
}