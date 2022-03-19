const suits = ["spades", "diamonds", "clubs", "hearts"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const createCards = () => {
    const deck1 = []
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {
                value: values[j],
                suit: suits[i]
            }
            deck1.push(card)
        }
    }
    return deck1
}

const currentDeck = createCards()

const takenCards = []

const takeACard = () => { currentDeck.length !== 0 ? takenCards.push(currentDeck.pop()) : 'Deck finished' }

const shuffleDeck = (shuffleRate) => {
    for (let i = 0; i < shuffleRate; i++) {
        let index1 = Math.floor(Math.random() * currentDeck.length)
        let index2 = Math.floor(Math.random() * currentDeck.length)

        let holdCard = currentDeck[index1]
        currentDeck[index1] = currentDeck[index2]
        currentDeck[index2] = holdCard
    }
    return currentDeck
}
