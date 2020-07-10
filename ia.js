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
let ultimaPosicao = {
    linha: -1,
    coluna: -1
};

function criarValorAleatorio(existentes, quantidadeElementos) {    
    let aleatorio = Math.floor(Math.random() * (quantidadeElementos + 1));
    
    existentes.forEach(existente => {
        if(aleatorio == existente) {            
            aleatorio = criarValorAleatorio(existentes, quantidadeElementos);
        }
    });

    return aleatorio;
}

function gerarMatrizQuadradaAleatoria(tamanho) {
    let matriz = new Array(tamanho);
    let elementosExistentes = [Math.ceil(tamanho*tamanho/2)];
    
    const quantidadeElementos = Math.pow(tamanho, 2)
    for (let i = 0; i < tamanho; i++) {
        matriz[i] = new Array(tamanho);
        for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] = criarValorAleatorio(elementosExistentes, quantidadeElementos);
            elementosExistentes.push(matriz[i][j]);
        }
    }
    return matriz;
}

function gerarMatrizQuadradaResolvida(tamanho) {
    if(tamanho % 2 == 0) 
        throw new Error("Para ter meio, matriz deve ter tamanho impar");
    let matriz = new Array(tamanho);
    for (let i = 0; i < tamanho; i++) {
        matriz[i] = new Array(tamanho);
        for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] = i*tamanho + j + 1;
            if (i == Math.floor(tamanho/2) && j == Math.floor(tamanho/2))
                matriz[i][j] = 0;
        }
    }
    return matriz;
}


function compararMatrizSolucao(matriz, matrizSolucao) {
    for (let i = 0; i < matriz[0].length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if(matriz[i][j] != matrizSolucao[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function execBuscaEmLargura(matriz, matrizSolucao) {
    let filaNos = new Array();
    filaNos.push(matriz);
        
    let matrizAtual = buscaEmLargura(matrizSolucao, filaNos);

    let filaMatrizes = Array();
    while (matrizAtual != null) {
        filaMatrizes.push(matrizAtual.getMatriz());
        matrizAtual = matrizAtual.getPai();
    }    

    return filaMatrizes;
}

function buscaEmLargura(matrizSolucao, filaNos) {
    while(filaNos.length > 0) {
        let no = filaNos.shift();
        if(compararMatrizSolucao(no.getMatriz(), matrizSolucao.getMatriz())) {                                    
            return no;
        }
        let proximosNos = criarProximosNos(no);
        proximosNos.forEach(proximoNo => {
            filaNos.push(proximoNo);
        });
    }
}

function criarProximosNos(matriz) {    
    let posicaoDoZero = encontrarPosicaoDoZero(matriz.getMatriz());
    let moviementosDisponiveis = encontrarMovimentosDisponiveis(posicaoDoZero, matriz.length());
    return expandirNo(matriz, posicaoDoZero, moviementosDisponiveis);
}

function encontrarPosicaoDoZero(matriz) {
    for (let linha = 0; linha < matriz.length; linha++) {
        for (let coluna = 0; coluna < matriz.length; coluna++) {
            if(matriz[linha][coluna] == 0) {
                return {
                    linha,
                    coluna
                }
            }
        }
    }
}

function encontrarMovimentosDisponiveis(posZero, tamanhoMatriz) {
    let movimentosDisponiveis = new Array();
    if((posZero.coluna - 1) >= 0) {
        movimentosDisponiveis.push({
            linha: posZero.linha,
            coluna: posZero.coluna - 1
        });
    }
    if((posZero.coluna + 1) < tamanhoMatriz) {
        movimentosDisponiveis.push({
            linha: posZero.linha,
            coluna: posZero.coluna + 1
        });
    }
    if((posZero.linha - 1) >= 0) {
        movimentosDisponiveis.push({
            linha: posZero.linha - 1,
            coluna: posZero.coluna
        });
    }
    if((posZero.linha + 1) < tamanhoMatriz) {
        movimentosDisponiveis.push({
            linha: posZero.linha + 1,
            coluna: posZero.coluna
        });
    }
    
    return movimentosDisponiveis;
}

function expandirNo(matriz, posZero, movimentosDisponiveis) {
    let matrizesExapandidas = new Array();

    movimentosDisponiveis.forEach(movimentoDisponivel => {
        const novoNo = trocarElementos(matriz.getMatriz(), posZero, movimentoDisponivel);
        const novaMatriz = criaMatriz(novoNo, matriz);
        matrizesExapandidas.push(novaMatriz);
    });

    return matrizesExapandidas;
}

function trocarElementos(matrizJogo, posZero, posElemento) {   
    let novaMatriz = matrizJogo.map(linha => {
        return linha.slice();
    });
    
    novaMatriz[posZero.linha][posZero.coluna] = novaMatriz[posElemento.linha][posElemento.coluna]
    novaMatriz[posElemento.linha][posElemento.coluna] = 0;

    return novaMatriz;
}
const no = gerarMatrizQuadradaAleatoria(3);
const noResolvido = gerarMatrizQuadradaResolvida(3);
const matrizResolvida = criaMatriz(noResolvido, null);
const matriz = criaMatriz(no, null);
const noTest = 
[[2, 3, 6],
 [1, 0, 4],
 [7, 8, 9]
]
const matrizTest = criaMatriz(noTest, null);
console.table(execBuscaEmLargura(matrizTest, matrizResolvida));




// =================================================================================================

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

function somaPesoPosicao(matrizTeste, matrizResposta) {
    let posicaoCorreta = 0;
    const tamanho = matrizResposta.length;
    for (let linhaMatrizTeste = 0; linhaMatrizTeste < tamanho; linhaMatrizTeste++) {
        for (let colunaMatrizTeste = 0; colunaMatrizTeste < tamanho; colunaMatrizTeste++) {
            if (matrizTeste[linhaMatrizTeste][colunaMatrizTeste] != matrizResposta[linhaMatrizTeste][colunaMatrizTeste]) {
                posicaoCorreta += 1;
            }
        }
    }  
    return posicaoCorreta;
}

function definirProximaMatriz(matrizJogo, matrizResolvida, movimentosDisponiveis, posZero) {
    let distanciaManhattan = undefined;
    let novaMatriz = [];
    // let menoresCaminhos = [];
    let matrizesTeste = [];
    for (let i = 0; i < posicoes.length; i++) {
        let proximoMovimentoPossivel = movimentosDisponiveis[posicoes[i]];
        if (proximoMovimentoPossivel != -1) {

            if(proximoMovimentoPossivel.linha != ultimaPosicao.linha || proximoMovimentoPossivel.coluna != ultimaPosicao.coluna) {
                
                const matrizAuxiliar = trocarElementos(matrizJogo, posZero, proximoMovimentoPossivel);
                const posicaoCorreta = somaPesoPosicao(matrizAuxiliar, matrizResolvida);             
                const distanciaManhattanAuxiliar = calcularDistanciaManhattanMatriz(matrizAuxiliar, matrizResolvida) + posicaoCorreta;    
                console.log(distanciaManhattanAuxiliar + ' auxiliar');
                            
                if (distanciaManhattan == undefined || distanciaManhattanAuxiliar < distanciaManhattan) {
                    distanciaManhattan = distanciaManhattanAuxiliar;                    
                    novaMatriz = JSON.parse(JSON.stringify(matrizAuxiliar));
                } else if (distanciaManhattanAuxiliar == distanciaManhattan) {
                    const manhattanNova = calcularDistanciaManhattanMatriz(novaMatriz, matrizResolvida) + somaPesoPosicao(novaMatriz, matrizResolvida);
                    const manhattanAuxiliar = calcularDistanciaManhattanMatriz(matrizAuxiliar, matrizResolvida) + somaPesoPosicao(matrizAuxiliar, matrizResolvida);
                    console.log('manhattan igual');
                    if(manhattanNova > manhattanAuxiliar) {
                        novaMatriz = JSON.parse(JSON.stringify(matrizAuxiliar));
                    }
                    // matrizesTeste.push(matrizAuxiliar);
                    // const index = Math.floor(Math.random() * matrizesTeste.length);
                    // novaMatriz = matrizesTeste[index];
                }
            }
        }
    }
    // if(menoresCaminhos != []) {
    //     const i = Math.floor(Math.random() * matrizesTeste.length);
    //     novaMatriz = matrizesTeste[i];
    //     console.log('aqui');
        
    // }
    ultimaPosicao = JSON.parse(JSON.stringify(posZero));
    // console.log(novaMatriz);
    console.log(distanciaManhattan + ' funcao');
    
    return novaMatriz;
}

function proximaJogada(tamanho, matrizJogo, matrizResposta) {    
    const posZero = encontrarPosicaoDoZero(matrizJogo);
    const movimentosDisponiveis = encontrarMovimentosDisponiveis(posZero, tamanho);
    matrizJogo = definirProximaMatriz(matrizJogo, matrizResposta, movimentosDisponiveis, posZero);
    return matrizJogo;
}

function instanciarIA(tamanho) {
    console.clear();
    
    let matrizJogo = gerarMatrizQuadradaAleatoria(tamanho);
    console.log(matrizJogo);
    const matrizResposta = gerarMatrizQuadradaResolvida(tamanho);
    let distanciaManhattan = calcularDistanciaManhattanMatriz(matrizJogo, matrizResposta);
    
    let totalDeJogadas = 0;
    while (distanciaManhattan != 0) {
        printarMatriz(matrizJogo);

        matrizJogo = proximaJogada(tamanho, matrizJogo, matrizResposta);
        distanciaManhattan = calcularDistanciaManhattanMatriz(matrizJogo, matrizResposta) + somaPesoPosicao(matrizJogo, matrizResposta);
        console.log(distanciaManhattan + ' final');
        
        totalDeJogadas++;
        // console.log(totalDeJogadas);
        
        pause(500);
        console.clear();
    }
    return totalDeJogadas;
}

function printarMatriz(matrizJogo) {
    matrizJogo.forEach(linha => {
        console.log(linha);
    });
}

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

// console.log(instanciarIA(3));

