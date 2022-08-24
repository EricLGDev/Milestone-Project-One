//initialize the game
function initialize() {
    startBtn.style.display = 'none';
    moveCount = 10;
    score = 0;
    
    // Create Gems
    for (let x = 0; x < 10; x++) {
        gems[x] = [];
        for (let y = 0; y < 10; y++){
            gems[x][y] = new Gem(x, y);
        }
    }

    // Set Colors
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            while (true) {
                var colorNum = getRandomNum(7);
                if (checkColor(x, y, colorNum)) {
                    gems[x][y].color = colorNum;
                    break;
                }
            }
        }
    }

    timer = setInterval(checkGemStatus, 10);

    draw();
}
//create the gem objects

//define gem colors

//set a way to clear gems once matched

//game over requirement