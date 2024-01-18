// get DOM elements needed for game
const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// current and new colors object
const colorObj = {
    color1: {current: "#006400", new: "#00ff00"},
    color2: {current: "#800000", new: "#ff0000"},
    color3: {current: "#0000b8", new: "#0000ff"}, // Alterado a cor de #00008b para #0000b8
    color4: {current: "#808000", new: "#ffff00"},
};

// game variables
let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// function to get a random color from colors object
const getRandomColor = (colorsObj) => { // Acertado o getRandomColors retirando somente o "S"
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)]; // Foi retirado o "=" do return colorKeys.
};

// function to pause execution of game for given amount of time

const delay = async (time) => { // Foi alterado o Daley para Delay
    return await new Promise((resolve) => setTimeout(resolve, time));
};

// function to generate a random path of colors

const generateRandomPath = async () => {
    randomColors.push(getRandomColor(colorObj)); // Acertado o getRandomColors retirando somente o "S"
    score = randomColors.length;
    isPathGenerating = true;
    await showPath(randomColors);
}

// function to show the path of colors to player

const showPath = async (colors) => {
    scoreEl.innerHTML = score;
    // loop through each color in the array
    for (let color of colors) {
        const currentColor = document.querySelector(`.${color}`);
        // pause execution for 500 milliseconds
        await delay(200);
        // set background to new color
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(300);
        // set background to old color
        currentColor.style.backgroundColor = colorObj[color].current;
        await delay(300);
    }
    // set flag to indicate the game is no longer generation path
    isPathGenerating = false;
};

// function to end the game and show final score

const andGame = () => {
    resultEl.innerHTML = `<span> Your Score : </span> ${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerHTML = "Play Again";
    startBtn.classList.remove("hide");
};

// function to reset game after ending

const resetGame = () => {
    score = 0;
    clickCount = 0;
    randomColors = [];
    isPathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide"); // Não foi colocado essa linha na function reset
    generateRandomPath();
};

// function to handle a color being clicked 

const handleColorClick = async (e) => {
    // if the path id currently being generated, ignore click
    if(isPathGenerating){
        return false;
    }
    // if clicked color is correct, update score and continue generating the path
    if(e.target.classList.contains(randomColors[clickCount])) {
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
        await delay(200);
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
        clickCount++;
        if (clickCount === score) {
            clickCount = 0;
            generateRandomPath();
        }
        // if the clicked color is incorrect, end game
    } else {
        andGame();
    }
};

// Event Listeners
startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => color.addEventListener("click", handleColorClick));
