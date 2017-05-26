(function() {
    "use strict";
    class Game {
        constructor(deckSize, playerNames) {
            this.deckSize = deckSize;
            this.playerNames = playerNames;
            this.players = [];
            this.dealer = null;
            this.resalts = null;
        }


        createPlayers() {
            for (var i = 0; i < this.playerNames.length; i++) {
                var playerI = new Player(this.playerNames[i]);
                this.players.push(playerI);

            }
            var element1 = document.querySelector('div.player1 > h1');
            element1.innerHTML = `${this.players[0].name}`;
            var element2 = document.querySelector('div.player2 > h1');
            element2.innerHTML = `${this.players[1].name}`;
            console.log(`всего игроков ${this.players.length}`);
            return this.players;
        }


        compareRank(i) {
            if (this.players[0].cards[i].cardRank > this.players[1].cards[i].cardRank) {
                this.players[0].score = this.players[0].score + 1;
                return this.players;
            }
            else if (this.players[0].cards[i].cardRank < this.players[1].cards[i].cardRank) {
                this.players[1].score = this.players[1].score + 1;
                return this.players;
            }
            else
                return this.players;

        }

        compareCard(i) {
            if (this.players[0].cards[i].suitName == this.dealer.trump && this.players[1].cards[i].suitName !== this.dealer.trump) {
                this.players[0].score = this.players[0].score + 1;
                var elements = document.querySelector('div.score > h1');
                elements.innerHTML = `${this.players[0].score} : ${this.players[1].score}`;
                return this.players;
            }
            else if (this.players[0].cards[i].suitName !== this.dealer.trump && this.players[1].cards[i].suitName == this.dealer.trump) {
                this.players[1].score = this.players[1].score + 1;
                var elements = document.querySelector('div.score > h1');
                elements.innerHTML = `${this.players[0].score} : ${this.players[1].score}`;
                return this.players;
            }
            else
                this.compareRank(i);
            var elements = document.querySelector('div.score > h1');
            elements.innerHTML = `${this.players[0].score} : ${this.players[1].score}`;
            return this.players;
        }


        findWinner() {
            var winner = document.querySelector('.three > h1');
            winner.style.color = "rgb(255,105,180)";
            if (this.players[0].score == this.players[1].score) {
                console.log("победитель не выявлен");
                winner.innerHTML = "Победитель не выявлен";
                return;
            }
            else if (this.players[0].score > this.players[1].score) {
                console.log(`победил ${this.playerNames[0]}`)
                winner.innerHTML = `${this.playerNames[0]}! Ты лучший!`;
                return;
            }
            else console.log(`победил ${this.playerNames[1]}`)
            winner.innerHTML = `${this.playerNames[1]}! Ты лучший!`;
            return;
        }

        showDivideDeck() {
            var dealerDeck = document.querySelectorAll('.hands');
            for (var i = 0; i < dealerDeck.length; i++) {
                dealerDeck[i].style.display = "block";
            }
        }

        hideDivideDeck() {
            var dealerDeck = document.querySelectorAll('.hands');
            for (var i = 0; i < dealerDeck.length; i++) {
                dealerDeck[i].style.display = "none";
            }
        }


        showTrumpCard() {
            var dealerDrum = document.querySelector('.drum > img');
            if (this.dealer.suit == 0) {
                dealerDrum.style.transform = "rotate(270deg)";
            }
            else if (this.dealer.suit == 1) {
                dealerDrum.style.transform = "rotate(90deg)";
            }
            else if (this.dealer.suit == 2) {
                dealerDrum.style.transform = "rotate(180deg)";
            }
            else {
                dealerDrum.style.transform = "rotate(0deg)";
            };

            dealerDrum.classList.add("roll");

        }

        faceDown() {

            var newImgFace1 = document.createElement('div');
            newImgFace1.classList.add("preface");
            newImgFace1.innerHTML = `<img src = assets/img/faceDown.png>`;
            newImgFace1.style.animation = "flyFaceLeft 0.8s ease";
            document.body.appendChild(newImgFace1);
            var newImgFace2 = document.createElement('div');
            newImgFace2.classList.add("preface");
            newImgFace2.innerHTML = `<img src = assets/img/faceDown.png>`;
            newImgFace2.style.animation = "flyFaceRight 0.8s ease";
            document.body.appendChild(newImgFace2);


            setTimeout(function() {
                newImgFace1.parentNode.removeChild(newImgFace1);
                newImgFace2.parentNode.removeChild(newImgFace2);
            }, 800);
        }


        createTable() {
            var tabElem = document.createElement('table');
            var strElem = `<tr><th>${this.playerNames[0]}</th><th>${this.playerNames[1]}</th></tr>`;
            for (var i = (this.players[0].cards.length) - 1; i >= 0; i--) {
                var number1 = this.players[0].cards[i].cardIndex;
                var number2 = this.players[1].cards[i].cardIndex;
                strElem += `<tr><td><img src="assets/img/${number1}.png"></td>`;
                strElem += `<td><img src="assets/img/${number2}.png"></td></tr>`;


            }
            tabElem.innerHTML = strElem;

            tabElem.cellSpacing = "2";
            tabElem.cellPadding = "5";
            tabElem.style.marginLeft = "auto";
            tabElem.style.marginRight = "auto";
            tabElem.border = "1px solid black";
            tabElem.tableLayout = "auto";

            var del = document.querySelectorAll('div.history');
            setTimeout(function() {
                for (var i = 0; i < del.length; i++) {
                    del[i].parentNode.removeChild(del[i]);
                }
            }, 3000);
            return tabElem;
        }



        nextRound() {
            if (this.dealer.currentRound <= 0) {
                this.findWinner();
                return;
            }
            else {
                var card1 = this.players[0].cards[this.dealer.currentRound - 1];
                console.log(`${this.dealer.currentRound} раунд - ${this.players[0].name} ${card1.suitName} ${card1.cardName}`);
                var handPlayer1 = card1.addToHTML();
                this.faceDown();
                handPlayer1.style.animation = "flyLeft 4s ease forwards";


                var card2 = this.players[1].cards[this.dealer.currentRound - 1];
                console.log(`${this.dealer.currentRound} раунд - ${this.players[1].name} ${card2.suitName} ${card2.cardName}`);
                var handPlayer2 = card2.addToHTML();
                handPlayer2.style.animation = "flyRight 4s ease forwards";

            }



            if (this.dealer.currentRound == 1) {
                this.hideDivideDeck();
                this.resalts = this.createTable();
                document.body.appendChild(this.resalts);
            }
            var prev1 = this.players[0].score;
            var prev2 = this.players[1].score;

            this.compareCard(this.dealer.currentRound - 1);

            if (prev1 < this.players[0].score) {
                setTimeout(function() {
                    handPlayer1.style.border = "solid rgb(255,105,180)"
                }, 1000);
            }

            else if (prev2 < this.players[1].score) {
                setTimeout(function() {
                    handPlayer2.style.border = "solid rgb(255,105,180)"
                }, 1000);
            };



            console.log(`${this.dealer.currentRound} - раунд ${this.players[0].score} : ${this.players[1].score}`);

            this.dealer.currentRound = this.dealer.currentRound - 1;

            var that = this;
            setTimeout(function() {
                that.nextRound();
            }, 5500);

            return;
        }




        startPlay() {

            this.players = this.createPlayers();
            this.dealer = new Dealer(this.deckSize);
            this.dealer.makeDeck();
            this.dealer.getShuffleDeck();
            this.dealer.getTrumpCard();
            this.showTrumpCard();

            var that = this;
            setTimeout(function() {
                var dealerDrum = document.querySelector('.drum > img');
                var dealerSuit = document.querySelector('.mainSuit');
                dealerDrum.style.display = "none";
                console.log(`${that.dealer.suit}`);
                dealerSuit.innerHTML = `<img src="assets/img/suit${that.dealer.suit}.png">`;
                that.showDivideDeck();
                that.dealer.divideDeck(that.players);
                that.nextRound();
            }, 11000);


        }


    }

    window.Game = Game;
}());
