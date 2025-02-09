import {model} from "./model.js";

document.addEventListener("DOMContentLoaded", function () {
    init();
})

// view
function drawGame() {
    model.appElement.innerHTML = model.shuffledElements.join("");
}

function updateGame() {
    if (model.firstSelectedImg.id === model.clickedId) {
        updateImgSource(model.firstSelectedImg);
    } else {
        updateImgSource(model.secondSelectedImg);
    }
    if (!model.isEqual) {
        turnWrongPair(model.firstSelectedImg);
        turnWrongPair(model.secondSelectedImg);
        model.isEqual = true;
    }
}

function updateImgSource(img) {
    return img.src = `img/${model.clickedId.slice(0, 2)}.jpg`;
}

function turnWrongPair(img) {
    return img.src = `img/front.jpg`;
}

// control
function init() {
    let elementIds = createImgId(model.totalCardIds);
    model.elementsToSet = makeCards(elementIds);
    model.shuffledElements = shuffleCards(model.elementsToSet);
    getAppElement();
    drawGame();
    getImageElements(model.appElement);
    listener();
}

function equalityImgCheck() {
    model.disableClickGlobal = true;
    // timeOutLength set in ms;
    const timeOutLength = 1100;

    if (model.id1Prefix !== model.id2Prefix) {
        setTimeout(() => {
            model.isEqual = false;
            resetSharedVars();
            enableSquare();
            updateGame();
        }, timeOutLength)
    } else {
        setTimeout(() => {
            model.totalFoundPair++;
            resetSharedVars();
            updateGame();
        }, timeOutLength)
    }
}

function resetSharedVars() {
    model.id1Prefix = "";
    model.id2Prefix = "";
    model.disableClickGlobal = false;
}

function listener() {
    model.imgElements.forEach((imgElement) => {
        imgElement.addEventListener("click", () => {
            handleClick(imgElement);
        });
    })
}

function handleClick(element) {
    if(!model.disableClickGlobal) {

        if(!model.disabledSquares.has(element.id)) {
            model.clickedId = element.id;
                setPrefixAndElem(element);
        }
    }
}
function setPrefixAndElem(cardImg) {
    if (!model.id1Prefix) {
        model.id1Prefix = model.clickedId.slice(0, 2);
        model.firstSelectedImg = cardImg;
        disableSquare();
    } else {
        model.id2Prefix = model.clickedId.slice(0, 2);
        model.secondSelectedImg = cardImg;
        disableSquare();
        equalityImgCheck();
    }
    updateGame();
}

function disableSquare() {
    model.disabledSquares.add(model.clickedId);
}

function enableSquare() {
    let arr = [...model.disabledSquares];
    arr = arr.slice(-2);
    model.disabledSquares.delete(arr[0]);
    model.disabledSquares.delete(arr[1]);
}

function getAppElement() {
    model.appElement = document.getElementById("app")
}

function getImageElements(element) {
    model.imgElements = element.querySelectorAll("img");
}

function makeCards(ids) {
    let cardElements = [];
    for (let i = 0; i < ids.length; i++) {
        cardElements.push(makeCardHTML(ids[i]));
    }
    return cardElements;
}

function makeCardHTML(id) {
    return `
        <div class="card"><img id="${id}" src="img/front.jpg"/></div>
    `
}

function shuffleCards(elements) {
    let newElements = [...elements];
    for (let i = newElements.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newElements[i];
        newElements[i] = newElements[j];
        newElements[j] = temp;
    }
    return newElements;
}

function createImgId(amount) {
    let num = 1;
    let arr = [];
    for (let i = 0; i < amount; i++) {
        let num2 = Math.floor(i % 2) + 1;
        if (num2 === 1 && i > 0) {
            num++;
        }
        arr.push(`c${num}-${num2}`);
    }
    return arr;
}