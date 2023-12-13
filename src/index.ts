document.addEventListener("DOMContentLoaded", () => {
  let cards = document.querySelectorAll(".memory-card");
  let clickedCard: Element | null;
  const startBtn = document.querySelector("#startBtn") as HTMLElement;
  const closeBtn = document.querySelector(".close") as HTMLElement;
  let pairsCounter: number = 0;
  let clickedCards: Element[] = [];

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

  function compareCards(): void {
    if (clickedCards.length === 2) {
      const firstCardValue = clickedCards[0].getAttribute("data-card");
      const secondCardValue = clickedCards[1].getAttribute("data-card");

      if (firstCardValue === secondCardValue) {
        pairsCounter++;
        clickedCards = [];
        console.log(pairsCounter);
      } else {
        setTimeout(() => {
          flipCardBack(clickedCards);
          clickedCards = [];
        }, 1000);
      }

      checkWin();
    }
  }

  function checkWin(): void {
    if (pairsCounter === 8) {
      console.log("win");
      
      const overlay = document.querySelector(".overlay") as HTMLElement;
      overlay.classList.toggle("show");
    }
  }

  function flipCard(clickedCard: any): void {
    if (clickedCard) {
    clickedCard.classList.toggle("flip")
    }
  }

  function flipCardBack(clickedCards: Element[]): void {
    clickedCards.forEach((clickedCard) => {
      
      clickedCard.classList.toggle("flip")
    });
  }

  function shuffleCards(): void {
    const cardsArray = Array.from(cards);
    const shuffledCards = shuffleArray(cardsArray);
    const gameContainer = document.querySelector(".memory-cards");
    gameContainer.innerHTML = "";
    shuffledCards.forEach((card) => {
      gameContainer.appendChild(card);
    });
  }

  function shuffleArray(array: Array<any>) {
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
