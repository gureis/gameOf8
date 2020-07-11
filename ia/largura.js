// const criaMatriz = require(`./Matriz`);
// const trocarElementos = require(`./utils`).trocarElementos;

function expandirNo(matriz, posZero, movimentosDisponiveis) {
    let matrizesExapandidas = new Array();

    movimentosDisponiveis.forEach(movimentoDisponivel => {
        const novoNo = trocarElementos(matriz.getMatriz(), posZero, movimentoDisponivel);
        const novaMatriz = criaMatriz(novoNo, matriz);
        matrizesExapandidas.push(novaMatriz);
    });

    return matrizesExapandidas;
}

// module.exports = {
//     expandirNo
// }