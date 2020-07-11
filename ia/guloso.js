
// const criaMatriz = require(`./Matriz`);
// const trocarElementos = require(`./utils`).trocarElementos;
// const comparaMatrizes = require(`./utils`).comparaMatrizes;

function calcularDistanciaManhattanMatriz(matrizTeste, matrizResposta) {
    let distanciaManhattan = 0;
    const tamanho = matrizResposta.length;

    for (let linhaMatrizTeste = 0; linhaMatrizTeste < tamanho; linhaMatrizTeste++) {
        for (let colunaMatrizTeste = 0; colunaMatrizTeste < tamanho; colunaMatrizTeste++) {
            let aux = comparaElementoDasMatrizes(matrizTeste, matrizResposta, linhaMatrizTeste, colunaMatrizTeste);
            distanciaManhattan += aux;
        }
    }
    return distanciaManhattan;
}

function comparaElementoDasMatrizes(matrizTeste, matrizResposta, linhaMatrizTeste, colunaMatrizTeste) {
    const tamanho = matrizResposta.length;
    let distanciaManhattan = 0;
    if (matrizTeste[linhaMatrizTeste][colunaMatrizTeste] != 0) {
        for (let linhaMatrizResposta = 0; linhaMatrizResposta < tamanho; linhaMatrizResposta++) {
            for (let colunaMatrizResposta = 0; colunaMatrizResposta < tamanho; colunaMatrizResposta++) {
                if (matrizTeste[linhaMatrizTeste][colunaMatrizTeste] == matrizResposta[linhaMatrizResposta][colunaMatrizResposta]) {
                    distanciaManhattan = Math.abs(linhaMatrizTeste - linhaMatrizResposta) + Math.abs(colunaMatrizTeste - colunaMatrizResposta);
                }
            }
        }
    }
    return distanciaManhattan;
}

function calcularDistanciaManhattanMatriz(matrizTeste, matrizResposta) {
    let distanciaManhattan = 0;
    const tamanho = matrizResposta.length;   
     
    for(let linhaMatrizTeste = 0; linhaMatrizTeste < tamanho; linhaMatrizTeste++) {
        for (let colunaMatrizTeste = 0; colunaMatrizTeste < tamanho; colunaMatrizTeste++) {
            let aux = comparaElementoDasMatrizes(matrizTeste, matrizResposta, linhaMatrizTeste, colunaMatrizTeste);            
            distanciaManhattan += aux;                   
        }
    }    
    return distanciaManhattan;
}

function expandirNoGuloso(matriz, posZero, movimentosDisponiveis, matrizResposta) {
    let matrizExpandidaMenorPeso = new Array();

    movimentosDisponiveis.forEach(movimentoDisponivel => {
        const novoNo = trocarElementos(matriz.getMatriz(), posZero, movimentoDisponivel);
        const pesoNovoNo = calcularDistanciaManhattanMatriz(novoNo, matrizResposta.getMatriz());

        const novaMatriz = criaMatriz(novoNo, matriz, pesoNovoNo);

        if (matrizExpandidaMenorPeso[0] != null) {
            if (matrizExpandidaMenorPeso[0].getPeso() > novaMatriz.getPeso() && !ultimoMovimento(matriz, novaMatriz)) {
                matrizExpandidaMenorPeso.pop();
                matrizExpandidaMenorPeso.push(novaMatriz);
            }
        } else {
            matrizExpandidaMenorPeso.push(novaMatriz);
        }
    });
    return matrizExpandidaMenorPeso;
}

function ultimoMovimento(matrizAntiga, matrizNova) {
    if (matrizAntiga.getPai() != null) {  
        const noAntigo = matrizAntiga.getPai().getMatriz();
        const noNovo = matrizNova.getMatriz();
        return comparaMatrizes(noAntigo, noNovo);
    }
    return false;
}

// module.exports = {
//     expandirNoGuloso
// }