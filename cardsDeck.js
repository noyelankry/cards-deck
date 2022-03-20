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
    const suits = ["spades", "diams", "clubs", "hearts"]
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
            return this.deck
        },
        // the next function divides the cards equaly between the computer and the player
        // it should be used after the deck has been created and shuffled.
        dealCards() {
            const player = {}
            player.deck = []
            player.stack = [] //contains the cards that "player" won
            player.getStack = getStack.bind(player)

            const computer = {}
            computer.deck = []
            computer.stack = [] //contains the cards that "computer" won
            computer.getStack = getStack.bind(computer)

            // start from the top down, because the deck length will be reduced..
            for (let i = this.deck.length - 1; i >= 0; i--) {
                let card = this.deck.pop()
                i % 2 === 0 ? player.deck.push(card) : computer.deck.push(card)
            }

            return {
                player,
                computer
            }
        }
    }
}

//global variables:
let computer, player
let deckObj = {}

//at the start of every game we need to create the deck, shuffle it, and deal cards.
function startGame() {
    deckObj = getObjDeck()
    deckObj.shuffle(20000);

    ({ computer, player } = deckObj.dealCards())

    compareCards(
        openCards.call(computer, computer, 'computer'),
        openCards.call(player, player, 'player')
    )
}

function nextRound() {
    if (computer === undefined) {
        alert('click START to begin playing!')
        return
    }
    if (!gameOver()) {
        compareCards(
            openCards.call(computer, computer, 'computer'),
            openCards.call(player, player, 'player')
        )
    }
}

// this function is called at the beggining of every turn - when open cards button is clicked.
function openCards(obj, name) {
    if (obj.deck.length !== 0) {
        let card = obj.deck.pop()

        let newLine = `
            <div class='card'>
                <span class='centered ${card.suit}'>
                    ${card.value} &${card.suit};
                </span>
            </div>
            `
        document.getElementById(name).innerHTML = newLine

        return card
    }
}

function compareCards(compCard, playerCard) {
    document.getElementById('player').classList.remove('winner')
    document.getElementById('computer').classList.remove('winner')

    if (realValues[`${compCard.value}`] > realValues[`${playerCard.value}`]) {
        computer.stack.push(compCard, playerCard)
        gameOver() //check if one of the players had lost
        document.getElementById('computer').classList.add('winner')
    } else {
        if (realValues[`${compCard.value}`] < realValues[`${playerCard.value}`]) {
            player.stack.push(compCard, playerCard)
            gameOver() //check if one of the players had lost
            document.getElementById('player').classList.add('winner')
        } else {
            gameOver() //check if one of the players had lost
            setTimeout(function () { alert('TIE - open another card!') }, 300)
        }
    }
}

// this function is called when the player finished his cards "on-hand" and wants to continue
function getStack() {
    if (this.deck.length === 0 && this.stack.length !== 0) {
        // take the stack to your hand
        this.deck = [...this.stack]
        deckObj.shuffle.call(this, 20000)
        // empty stack array
        this.stack = []
    }
}

// the game is over when one of the players loses all the cards (hand and stack cards)
function gameOver() {
    if (computer.deck.length === 0 && computer.stack.length === 0) {
        alert('Game Over! You won!')
        return true
    } else {
        if (computer.deck.length === 0 && computer.stack.length !== 0) {
            computer.getStack()
        }
    }

    if (player.deck.length === 0 && player.stack.length === 0) {
        alert('Game Over! You lost!')
        return true
    } else {
        if (player.deck.length === 0 && player.stack.length !== 0) {
            player.getStack()
        }
    }
    return false
}