let player = {
    name: "Quest",
    chips: 200
}
let dealerCards = []
let dealerSum = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let dealerCardsEl = document.getElementById("dealer-cards")
let dealerSumEl = document.getElementById("dealer-sum")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()

    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    if (sum > 21 && cards.includes(11)) {
        let aceIndex = cards.indexOf(11)
        cards[aceIndex] = 1
        sum -= 10
    }

    dealerCards = [dealerFirstCard, dealerSecondCard]
    dealerSum = dealerFirstCard + dealerSecondCard
    if (dealerSum > 21 && dealerCards.includes(11)) {
        let aceIndex = dealerCards.indexOf(11)
        dealerCards[aceIndex] = 1
        dealerSum -= 10
    }
    renderGame()
}

function renderGame() {

    dealerCardsEl.textContent = "Dealer's Cards: " + dealerCards[0] + " ?"
    dealerSumEl.textContent = "Dealer's Sum: ?"
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21 && cards.length === 2) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else if (sum === 21 && cards.length > 2) {
        message = "You have 21!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        if (sum > 21 && cards.includes(11)) {
            let aceIndex = cards.indexOf(11)
            cards[aceIndex] = 1
            sum -= 10
        }
        renderGame()
    }
}


function stand() {
    if (isAlive === false) {
        message = "You can't stand, you're out of the game!"
        messageEl.textContent = message
        return
    }
    isAlive = false

    while (dealerSum < 17) {
        let card = getRandomCard()
        dealerSum += card
        dealerCards.push(card)
        if (dealerSum > 21 && dealerCards.includes(11)) {
            let aceIndex = dealerCards.indexOf(11)
            dealerCards[aceIndex] = 1
            dealerSum -= 10
        }
    }

    dealerSumEl.textContent = "Dealer's Sum: " + dealerSum
    dealerCardsEl.textContent = "Dealer's Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    if (sum > 21) {
        message = "You busted! Dealer wins!"
    } else if (dealerSum > 21) {
        message = "Dealer busts! You win!"
    } else if (sum === 21 && cards.length === 2 &&
        dealerSum === 21 && dealerCards.length === 2) {
        message = "Both have Blackjack! It's a tie!"
    } else if (sum === 21 && cards.length === 2) {
        message = "Blackjack! You win!"
    } else if (dealerSum === 21 && dealerCards.length === 2) {
        message = "Dealer has Blackjack! You lose!"
    } else if (dealerSum < sum) {
        message = "You win!"
    } else if (dealerSum > sum) {
        message = "You lose!"
    } else {
        message = "It's a tie!"
    }
    messageEl.textContent = message
}