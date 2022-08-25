var canvas = document.getElementById("ptbreak"),
    c = canvas.getContext("2d"),
    gems = [],
    moves = []
let gemList = [jackFrost, pyroJack, pixie, morgana, necronomicon, arsene, jokerMask];
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
let personaBG = document.getElementById('persona')

function setBackgroundImg() {
    c.drawImage(personaBG, 0, 0, 600, 700);
}

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

function setRemoveFlag() {
    for (let x = 0; x < 10; x++) {
        var c0 = gems[x][0].color;
        var count = 1;

        for (var y = 1; y < 10; y++) {
            var c1 = gems[x][y].color;
            if (c0 === c1) {
                count++;
                if (count >= 3) {
                    gems[x][y - 2].remove = true;
                    gems[x][y - 1].remove = true;
                    gems[x][y].remove = true;
                } 
            } else {
                c0 = c1;
                count = 1;
            }
        }
    }

    for (let y = 0; y < 10; y++) {
        var c0 = gems[0][y].color;
        var count = 1;

        for (var x = 1; x < 10; x++) {
            var c1 = gems[x][y].color;
            if (c0 === c1) {
                count++;
                if (count >= 3) {
                    gems[x - 2][y].remove = true;
                    gems[x - 1][y].remove = true;
                    gems[x][y].remove = true;
                } 
            } else {
                c0 = c1;
                count = 1;
            }
        }
    }
}

//gem fall
function fall() {
    for (var x = 0; x < 10; x++) {
        for (var y = 9, z = 9; y >= 0; y-- , z--) {
            while (z >= 0) {
                if (gems[x][z].remove) {
                    z--;
                } else {
                    break;
                }
            }

            if (y !== z) {
                var colorNum = (z >= 0) ? gems[x][z].color : getRandomNum(7);
                gems[x][y].moveGem(x, z, colorNum);
            }
        }
    }
    //score update should go here probably
}

//fun discovery with js, this should fetch the other js files once game start is initialized
function setJS(filename) {
    let elm = document.createElement('script');
    elm.type = 'text/javascript';
    elm.src = "./assets/" + filename;
    document.body.appendChild(elm);

    //remove buttons and initialize game
    setTimeout(function () {
        startBtn.style.display = 'none';
        timeBtn.style.display = 'none';
        resetBtn.style.display = 'inline';
        c.clearRect(0, 0, 600, 700)
        initialize();
    }, 200)
}