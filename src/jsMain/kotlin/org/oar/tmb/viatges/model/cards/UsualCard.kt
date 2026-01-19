package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class UsualCard(
    prices: List<Double>,
): Card(
    name = "T-Usual",
    prices = prices,
    days = 30
)