(function() {
        "use strict";
        class Dealer {
            constructor(deckSize) {
                this.deckSize = deckSize;
                this.suits = ["пика", "крести", "бубны", "черви"];
                this.suit = null;
                this.deck = [];
                this.currentRound = 0;
                this.trump = null;
            }


            makeSuit() {
                const MinZ = 0;
                const MaxZ = 3;
                return Math.floor(
                    Math.random() * (MaxZ - MinZ + 1)) + MinZ;
            }


            getTrumpCard() {
                this.suit = this.makeSuit();
                this.trump = this.suits[this.suit];
                console.log(`козырь ${this.trump}`);
                return this.trump;
            }

            makeDeck() {
                for (var i = 0; i < this.deckSize; i++) {
                    var cardI = new Card(i, this.deckSize);
                    cardI.describeCard();
                    this.deck[i] = cardI;
                    console.log(this.deck[i]);
                }
                console.log(`размер колоды ${this.deck.length} карт`);
                return this.deck;
            }


            getRandomInteger(minZ, maxZ) {
                return Math.floor(
                    Math.random() * (maxZ - minZ + 1)) + minZ;
            }

            getShuffleDeck() {
                for (var i = 0; i < this.deckSize; i++) {
                    var card1 = this.deck[i];
                    var index = this.getRandomInteger(0, this.deckSize - 1);
                    var card2 = this.deck[index];
                    this.deck[i] = card2;
                    this.deck[index] = card1;
                }
                console.log(`перемешано ${this.deck.length} карт`);
                return this.deck;
            }


            divideDeck(players) {
                while (this.deck.length >= players.length) {
                    for (var j = 0; j < players.length; j++) {
                        players[j].cards.push(this.deck.pop());
                    }

                }
                for (var j = 0; j < players.length; j++) {
                    console.log(`${players[j].name} получил ${players[j].cards.length} карт`)
                }
                this.currentRound = players[0].cards.length;
                return players;
            }

        }
        window.Dealer = Dealer;

    }
    ()
);
