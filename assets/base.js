var canvas = document.getElementById("ptbreak"),
    c = canvas.getContext("2d"),
    gems = [],
    moves = []
let gemList = [];
//menu buttons
let startBtn = document.getElementById("startBtn");
let timeBtn = document.getElementById('timeBtn');
let resetBtn = document.getElementById('resetBtn');
let pressStart = document.getElementById('pressStart');
let volumeImg = document.getElementById('volumeImg');
//in-game stats
let moveCount = 0;
let timeCount = 0;
let score = 0;
let timer;

function getRandomNum(n) {
    return Math.floor(Math.random() * n);
}

// define gems
function Gem(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
    this.gapCount = 0;

    this.getY = function () {
        return (this.y1 + (this.y2 - this.y1) * (this.gapCount) / 20) * 60 + 100;
    }

    this.moveGem = function (x2, y2, color) {
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.gapCount = 10;
        moves.push(this);
    }

    this.update = function () {
        this.gapCount--;
        if (this.gapCount <= 0) {
            this.moving = false;
        }
    }
}

//boolean flag checks
function checkColor(x, y, c) {
    var flag = true;
    if (x > 1) {
        var c0 = gems[x - 2][y].color;
        var c1 = gems[x - 1][y].color;
        if (c0 === c1 && c1 === c) {
            flag = false;
        }
    }
    if (y > 1) {
        var c0 = gems[x][y - 2].color;
        var c1 = gems[x][y - 1].color;
        if (c0 === c1 && c1 === c) {
            flag = false;
        }
    }

    return flag;
}