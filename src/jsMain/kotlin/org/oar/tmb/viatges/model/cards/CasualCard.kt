package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class CasualCard(
    prices: List<Double>,
): Card(
    name = "T-Casual",
    prices = prices,
    usages = 10
)