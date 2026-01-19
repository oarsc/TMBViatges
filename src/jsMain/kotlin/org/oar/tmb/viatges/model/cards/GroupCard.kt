package org.oar.tmb.viatges.model.cards

import org.oar.tmb.viatges.model.Card

class GroupCard(
    prices: List<Double>,
): Card(
    name = "T-Grup",
    prices = prices,
    uniPersonal = false,
    usages = 70,
    days = 30
)