new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            this.playerAttack(3, 10);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack(5, 12);
        },
        specialAttack: function () {
            this.playerAttack(10, 20);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack(5, 12);
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for 10',
                });
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack(5, 12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttack: function (min, max) {
            damage = this.calculateDamage(min, max);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage,
            });
            this.checkWin();
        },
        playerAttack: function (min, max) {
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            this.checkWin();
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});