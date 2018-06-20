var Furry = require('./furry.js');
var Coin = require('./coin.js');

var Game = function () {
    var self = this;

    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        //this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        var visibleFurry = document.querySelector('.furry');
        visibleFurry.classList.remove('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {

        this.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1;
        } else if (this.furry.direction === "up") {
            this.furry.y -= 1;
        } else if (this.furry.direction === "down") {
            this.furry.y += 1;
        }

        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            var removeCoin = document.querySelector('.coin');
            removeCoin.classList.remove('coin');
            var counter = this.score++;
            var newPoint = document.querySelector('strong');
            newPoint.innerHTML = counter + 1;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert('Koniec gry! Punkty: ' + this.score);
        }
    };

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
};

module.exports = Game;
