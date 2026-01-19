package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class YoungCard(
    prices: List<Double>,
): Card(
    name = "T-Jove",
    prices = prices,
    days = 90
)