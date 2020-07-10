const criaMatriz = (matrizParam, paiParam, pesoParam = 0) => {
    const matriz = matrizParam;
    const matrizPai = paiParam;
    let pesoMatriz = pesoParam;

    return {
        getMatriz() {
            return matriz;
        },
        getPai() {
            return matrizPai;
        },
        getPeso() {
            return pesoMatriz;
        },
        setPeso(novoPeso) {
            pesoMatriz = novoPeso;
        },
        length() {
            return matriz.length;
        }
    }
}

module.exports = criaMatriz