package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class DayCard(
    prices: List<Double>,
): Card(
    name = "T-Dia",
    prices = prices,
    days = 1
)