document.addEventListener("DOMContentLoaded", () => {
    let cards = document.querySelectorAll(".memory-card");
    let clickedCard;
    const startBtn = document.querySelector("#startBtn");
    const closeBtn = document.querySelector(".close");
    let pairsCounter = 0;
    let clickedCards = [];
    shuffleCards();
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const cardValue = card.getAttribute("data-card");
            clickedCard = card;
            flipCard(clickedCard);
            clickedCards.push(clickedCard);
            compareCards();
        });
    });
    function compareCards() {
        if (clickedCards.length === 2) {
            const firstCardValue = clickedCards[0].getAttribute("data-card");
            const secondCardValue = clickedCards[1].getAttribute("data-card");
            if (firstCardValue === secondCardValue) {
                pairsCounter++;
                clickedCards = [];
                console.log(pairsCounter);
            }
            else {
                setTimeout(() => {
                    flipCardBack(clickedCards);
                    clickedCards = [];
                }, 1000);
            }
            checkWin();
        }
    }
    function checkWin() {
        if (pairsCounter === 8) {
            console.log("win");
            const overlay = document.querySelector(".overlay");
            overlay.classList.toggle("show");
        }
    }
    function flipCard(clickedCard) {
        if (clickedCard) {
            clickedCard.classList.toggle("flip");
        }
    }
    function flipCardBack(clickedCards) {
        clickedCards.forEach((clickedCard) => {
            clickedCard.classList.toggle("flip");
        });
    }
    function shuffleCards() {
        const cardsArray = Array.from(cards);
        const shuffledCards = shuffleArray(cardsArray);
        const gameContainer = document.querySelector(".memory-cards");
        gameContainer.innerHTML = "";
        shuffledCards.forEach((card) => {
            gameContainer.appendChild(card);
        });
    }
    function shuffleArray(array) {
        // fisher-yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    startBtn.addEventListener("click", () => {
        window.location.reload();
    });
    closeBtn.addEventListener("click", () => {
        window.location.reload();
    });
});
