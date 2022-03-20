// create a function that returns an object with all the needed methods
// createCards - create a deck of 52 cards
// shuffle deck - shuffle the cards as many times as you wish

// Values dictionary:
const realValues = {
    'A': 14,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13
}

// this function is called when the game starts!
function getObjDeck() {
    const suits = ["spades", "diamonds", "clubs", "hearts"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    const createCards = () => {
        const deck = []
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let card = {
                    value: values[j],
                    suit: suits[i]
                }
                deck.push(card)
            }
        }
        return deck
    }

    const shuffleDeck = (currentDeck, shuffleRate) => {
        for (let i = 0; i < shuffleRate; i++) {
            let index1 = Math.floor(Math.random() * currentDeck.length)
            let index2 = Math.floor(Math.random() * currentDeck.length)

            let holdCard = currentDeck[index1]
            currentDeck[index1] = currentDeck[index2]
            currentDeck[index2] = holdCard
        }
        return currentDeck
    }

    let deck = shuffleDeck(createCards(), 20000)
    alert('A deck with 52 cards had been created!')

    return {
        deck,
        shuffle(shuffleRate) {
            this.deck = shuffleDeck(this.deck, shuffleRate)
            alert('successfuly shuffled')
            return this.deck
        },
        // the next function divides the cards equaly between the computer and the player
        // it should be used after the deck has been created and shuffled.
        dealCards() {
            const player = {}
            player.hand = []
            player.stack = [] //contains the cards that "player" won
            player.getStack = getStack() //this method will be used when the cards in hand ran out

            const computer = {}
            computer.hand = []
            computer.stack = [] //contains the cards that "computer" won
            computer.getStack = getStack() //this method will be used when the cards in hand ran out

            // start from the top down, because the deck length will be reduced...
            for (let i = this.deck.length - 1; i >= 0; i--) {
                let card = this.deck.pop()
                i % 2 === 0 ? player.hand.push(card) : computer.hand.push(card)
            }
            return {
                player,
                computer
            }
        }
    }
}

// this function is called at the beggining of every turn - when open cards button is clicked.
function openCards(hand) {
    if (hand.length !== 0) {
        let card = hand.pop()
        return card
    } else {
        console.log(`Error: ${hand} ran out of cards.
        pick up your stack and suffle!`)
    }
}

function compareCards(compCard, playerCard) {
    if (realValues[`${compCard.value}`] > realValues[`${playerCard.value}`]) {
        computerStack.push(compCard, playerCard)
        gameOver() //check if one of the players had lost
        return 'computer won this round'
    } else {
        if (realValues[`${compCard.value}`] < realValues[`${playerCard.value}`]) {
            playerStack.push(compCard, playerCard)
            gameOver() //check if one of the players had lost
            return 'player won this round'
        } else {
            gameOver() //check if one of the players had lost
            return 'TIE - open another card!'
        }
    }
}

// this function is called when the player finished his cards "on-hand" and wants to continue
function getStack() {
    if (this.hand.length === 0 && this.stack.length !== 0) {
        // take the stack to your hand
        this.hand = [...this.stack]
        // empty stack array
        this.stack = []
        return 'continue to play'
    } else {
        if (this.stack.length === 0) {
            gameOver()
        } else {
            return 'you must finish your cards first!'
        }
    }
}

// the game is over when one of the players loses all the cards (hand and stack cards)
function gameOver() {
    if (this.hand.length === 0 && this.stack.length === 0) {
        return `Game Over! ${this} lost :(`
    } else {
        if (this.hand.length === 0 && this.stack.length !== 0) {
            return 'click on get stack!'
        }
    }
    return 'next round'
}