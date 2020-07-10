const criaMatriz = (matrizParam, paiParam) => {
    const matriz = matrizParam;
    const matrizPai = paiParam;

    return {
        getMatriz() {
            return matriz;
        },
        getPai() {
            return matrizPai;
        },
        length() {
            return matriz.length;
        }
    }
}