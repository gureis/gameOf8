const playableMatrix = document.querySelector(`.playable`);
const resolveButton = document.querySelector(`#resolve-button`);

let selectedElement = null;

playableMatrix.addEventListener(`click`, e => {
    if (e.target.className == "element") {
        if(selectedElement != null) {
            selectedElement.className = "element";
        }
        selectedElement = e.target;
        selectedElement.classList.add("selected");
    }
});

window.addEventListener(`keydown`, e => {
    if (selectedElement != null && isNumber(e.key)) {
        selectedElement.innerText = e.key;
        selectedElement.className = "element";
        selectedElement = null;
    }
});

function isNumber(key) {
    return !Number.isNaN(parseInt(key));
}

resolveButton.addEventListener(`click`, e => {
    const strategy = document.querySelector(`#search-strategy`).value;
    let elementsList = playableMatrix.querySelectorAll(`.element`);
    const matrix = adaptToAiMatrix(elementsList);
    const noTest =[
        [2, 3, 6],
        [0, 8, 4],
        [1, 7, 9]
    ];
    const answer = gerarIa(matrix, strategy);
    atualizarAnimacao(answer);
});

function adaptToAiMatrix(elementsList) {
    let elementsListArray = [ ...elementsList ];
    let matrix = new Array();
    for (let i = 0; i < 3; i++) {
        matrix.push(new Array());
        for (let j = 0; j < 3; j++) {
            matrix[i].push(parseInt(elementsListArray.shift().innerText));           
        }
    }
    return matrix;
}

function adaptToDOMMatrix(solutionMatrix) {
    let elementsList = playableMatrix.querySelectorAll(`.element`);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            elementsList[i * 3 + j].innerText = solutionMatrix[i][j];
            if(solutionMatrix[i][j] == 0) {
                elementsList[i * 3 + j].classList.add(`selected`);
            } else {
                elementsList[i * 3 + j].classList.remove(`selected`);
            }
        }
    }
}

function atualizarAnimacao(answer) {
    const answerText = document.createElement(`h4`)
    answerText.innerText = `Total de Movimentos: ${answer.length}`;
    playableMatrix.appendChild(answerText);
    const interval = setInterval(() => {
        if (answer.length == 0) {
            clearInterval(interval);
            return true;
        }
        adaptToDOMMatrix(answer.pop());
    }, 500);
}