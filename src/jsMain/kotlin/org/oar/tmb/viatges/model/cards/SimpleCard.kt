package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class SimpleCard(
    prices: List<Double>,
): Card(
    name = "Bitllet Senzill",
    prices = prices,
    uniPersonal = false,
    usages = 1
)