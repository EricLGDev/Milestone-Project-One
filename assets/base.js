var canvas = document.getElementById("ptbreak"),
    c = canvas.getContext("2d"),
    gems = [],
    moves = []
let gemList = [];

let startBtn = document.getElementById("startBtn");
let timeBtn = document.getElementById('timeBtn');
let resetBtn = document.getElementById('resetBtn');

let pressStart = document.getElementById('pressStart');
let volumeImg = document.getElementById('volumeImg');


let moveCount = 0;
let timeCount = 0;
let score = 0;
let timer;