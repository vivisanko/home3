(function() {
    "use strict";
    class Card {
        constructor(cardIndex, deckSize) {
            this.cardIndex = cardIndex;
            this.deckSize = deckSize;
            this.suitIndex = null;
            this.suitName = null;
            this.cardRank = null;
            this.cardName = null;
            this.divCard = document.createElement('div');
        }

        getSuitIndex() {
            this.suitIndex = Math.floor((this.cardIndex / this.deckSize) * 4);
            console.log(this.suitIndex);
            return this.suitIndex;
        }

        getSuitName() {
            var suits = ["пика", "крести", "бубны", "черви"]
            this.suitName = suits[this.suitIndex];
            console.log(this.suitName);
            return this.suitName;
        }

        getCardRank() {
            this.cardRank = this.cardIndex % (this.deckSize / 4);
            console.log(this.cardRank);
            return this.cardRank;
        }

        getCardName() {
            var cards = ["шесть", "семь", "восемь", "девять", "десять", "валет", "дама", "король", "туз"]
            this.cardName = cards[this.cardRank];
            console.log(this.cardName);
            return this.cardName;
        }
        describeCard() {
            this.suitIndex = this.getSuitIndex();
            this.suitName = this.getSuitName();
            this.cardRank = this.getCardRank();
            this.cardName = this.getCardName();
            return;
        }

        addToHTML() {
            this.divCard.innerHTML = `<img src="assets/img/${this.cardIndex}.png" alt="${this.cardName} ${this.suitName}" title="${this.cardName} ${this.suitName}">`;
            this.divCard.classList.add("history");
            document.body.appendChild(this.divCard);
            console.log(this.divCard);
            return this.divCard;
        }
    }
    window.Card = Card;
}());
