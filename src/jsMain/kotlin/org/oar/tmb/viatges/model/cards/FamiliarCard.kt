package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class FamiliarCard(
    prices: List<Double>,
): Card(
    name = "T-Familiar",
    prices = prices,
    uniPersonal = false,
    usages = 8,
    days = 30
)