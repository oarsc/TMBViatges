package org.oar.tmb.viatges.ui.lines.results

import org.oar.tmb.viatges.lib.HTMLBlock
import org.oar.tmb.viatges.lib.HTMLDefinitionConstants.DIV
import org.oar.tmb.viatges.lib.HashController.params
import org.oar.tmb.viatges.lib.HashController.updateUrl
import org.oar.tmb.viatges.lib.style
import org.oar.tmb.viatges.model.Station
import org.oar.tmb.viatges.ui.lines.BlockLine
import org.oar.tmb.viatges.ui.lines.results.model.Route
import org.oar.tmb.viatges.ui.lines.results.model.Step
import org.oar.tmb.viatges.utils.Notifier
import org.oar.tmb.viatges.utils.stationsData
import org.w3c.dom.HTMLDivElement

class BlockJourneyViewer: HTMLBlock<HTMLDivElement>(DIV, id = ID) {

    var step: Step? by renderProperty(null, 1)
    var linearView: Boolean by renderProperty(params["v"] != "1", 2)

    private val blockLines = mutableListOf<BlockLine>()

    init {
        listen(Notifier.openLine) { line ->
            blockLines.forEach {
                it.toggleOpen(it.line == line)
            }
        }
    }

    override fun render(identifier: Int) {
        when(identifier) {
            1 -> {
                clear(detachMode = DetachMode.DETACH_ONLY_CHILDREN)
                blockLines.clear()
                addJourney(step!!)
                blockLines.forEach(::append)
                if (linearView) {
                    blockLines.forEach {
                        it.toggleLinearView(true)
                    }
                }
            }
            2 -> {
                blockLines.forEach {
                    it.toggleLinearView(linearView)
                }
                if (linearView) params.remove("v")
                else params["v"] = "1"
                updateUrl(redirect = false)
            }
        }
    }

    private fun addJourney(step: Step) {
        val allLines = step.route.map { it.line }

        step.route.forEach { route ->
            val line = BlockLine(
                line = route.line,
                title = "⤳ ${route.getEndStation()}"
            )
            blockLines.add(line)

            var station = route.inStation
            while (station != route.outStation) {
                line.addStation(station, allLines)
                station = route.getNextStation(station) ?: break
            }
            line.addStation(station, allLines)
        }
    }

    private fun Route.getEndStation(): String =
        if (forward) line.stations.last()
        else line.stations.first()

    private fun Route.getNextStation(station: Station): Station? {
        val stationIdx = line.stations.indexOf(station.name)
        val nextIdx = if (forward) stationIdx+1 else stationIdx-1
        return stationsData[line.stations[nextIdx]]
    }

    companion object {
        const val ID = "journey-viewer"

        init {
            style {
                "#$ID" {
                }
            }
        }
    }
}
