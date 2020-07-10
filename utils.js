
function trocarElementos(matrizJogo, posZero, posElemento) {
    let novaMatriz = matrizJogo.map(linha => {
        return linha.slice();
    });

    novaMatriz[posZero.linha][posZero.coluna] = novaMatriz[posElemento.linha][posElemento.coluna]
    novaMatriz[posElemento.linha][posElemento.coluna] = 0;

    return novaMatriz;
}

function comparaMatrizes(matriz, matrizSolucao) {
    for (let i = 0; i < matriz[0].length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] != matrizSolucao[i][j]) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    trocarElementos,
    comparaMatrizes
}