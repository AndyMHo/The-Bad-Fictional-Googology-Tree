addLayer("zo", {
    name: "zerohyperoperator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "0+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#2C2C2C",
    requires: new Decimal(0.01), // Can be a function that takes requirement increases into account
    resource: "hyper-zeroators", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        if(hasUpgrade('zo', 12))
        mult = upgradeEffect('zo', 12)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "For the dozenal gods",
            description: "Dozenuple (x12) your point gain.",
            cost: new Decimal(3)
        },
        12: {
            title: "One for themselves",
            description: "Hyper-zeroators boosts itself.",
            cost: new Decimal(15),
            effect() {
                return (player[this.layer].points.sqrt()).sqrt().max(new Decimal(1))
            },
            effectDisplay() { return "×"+format(upgradeEffect(this.layer, this.id)) }
        },
        13: {
            title: "Finally, it's useful now!",
            description: "Hyper-zeroators boosts points.",
            cost: new Decimal(50),
            effect() {
                return player[this.layer].points.sqrt().max(new Decimal(1))
            },
            effectDisplay() { return "×"+format(upgradeEffect(this.layer, this.id)) }
        }
    }
})
