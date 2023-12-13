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
            /*   console.log(`You clicked: ${cardValue}`); */
            clickedCard = card;
            flipCard(clickedCard);
            clickedCards.push(clickedCard);
            /* console.log(clickedCards); */
            if (clickedCards.length === 2) {
                const firstCardValue = clickedCards[0].getAttribute("data-card");
                const secondCardValue = clickedCards[1].getAttribute("data-card");
                /* console.log(firstCardValue)
                console.log(secondCardValue) */
                if (firstCardValue === secondCardValue) {
                    pairsCounter++;
                    clickedCards = [];
                    console.log(pairsCounter);
                }
                else {
                    // Le carte non sono una coppia, esegui azione desiderata
                    /*  console.log("Le carte non sono una coppia."); */
                    setTimeout(() => {
                        flipCardBack(clickedCards);
                        clickedCards = [];
                    }, 1000);
                }
                if (pairsCounter === 8) {
                    console.log("win");
                    const gameContainer = document.querySelector(".memory-cards");
                    gameContainer.style.display = "none";
                    startBtn.style.display = "none";
                    const overlay = document.querySelector(".overlay");
                    overlay.classList.add("show");
                }
            }
        });
    });
    function flipCard(clickedCard) {
        if (clickedCard) {
            /*  console.log(clickedCard); */
            const frontSide = clickedCard.querySelector(".front");
            const backSide = clickedCard.querySelector(".back");
            frontSide.style.backfaceVisibility = "visible";
            frontSide.style.transform = "none";
            backSide.style.display = "none";
        }
    }
    function flipCardBack(clickedCards) {
        clickedCards.forEach((clickedCard) => {
            const frontSide = clickedCard.querySelector(".front");
            const backSide = clickedCard.querySelector(".back");
            frontSide.style.backfaceVisibility = "hidden";
            frontSide.style.transform = "rotateY(180deg)";
            backSide.style.display = "block";
        });
    }
    startBtn.addEventListener("click", () => {
        window.location.reload();
    });
    closeBtn.addEventListener("click", () => {
        window.location.reload();
    });
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
        //fisher-yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
