// const criaMatriz = require(`./Matriz`);
// const guloso = require(`./guloso`);
// const largura = require(`./largura`);
// const comparaMatrizes = require(`./utils`).comparaMatrizes;

const commands = {
    guloso: expandirNoGuloso, //if nodejs, usar guloso.expandirNoGuloso
    largura: expandirNo //if nodejs, usar largura.expandirNo
}

function criarValorAleatorio(existentes, quantidadeElementos) {    
    let aleatorio = Math.floor(Math.random() * (quantidadeElementos + 1));
    
    existentes.forEach(existente => {
        if(aleatorio == existente) {            
            aleatorio = criarValorAleatorio(existentes, quantidadeElementos);
        }
    });

    return aleatorio;
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

function executarBusca(matriz, matrizSolucao, strategy) {
    let filaNos = new Array();
    filaNos.push(matriz);
        
    let matrizAtual = buscaEmLargura(matrizSolucao, filaNos, strategy);

    let filaMatrizes = Array();
    while (matrizAtual != null) {
        filaMatrizes.push(matrizAtual.getMatriz());
        matrizAtual = matrizAtual.getPai();
    }    

    return filaMatrizes;
}

function buscaEmLargura(matrizSolucao, filaNos, strategy) {
    while(filaNos.length > 0) {
        let no = filaNos.shift();
        if(comparaMatrizes(no.getMatriz(), matrizSolucao.getMatriz())) {                                    
            return no;
        }
        let proximosNos = criarProximosNos(no, matrizSolucao, strategy);
        proximosNos.forEach(proximoNo => {
            filaNos.push(proximoNo);
        });
    }
}

function criarProximosNos(matriz, matrizResposta = null, strategy) {    
    let posicaoDoZero = encontrarPosicaoDoZero(matriz.getMatriz());
    let moviementosDisponiveis = encontrarMovimentosDisponiveis(posicaoDoZero, matriz.length());
    return commands[strategy](matriz, posicaoDoZero, moviementosDisponiveis, matrizResposta);
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

function gerarIa(no, strategy, tamanhoNo = 3) {
    const matrizJogo = criaMatriz(no, null);
    const noResolvido = gerarMatrizQuadradaResolvida(tamanhoNo);
    const matrizResolvida = criaMatriz(noResolvido, null);
    return executarBusca(matrizJogo, matrizResolvida, strategy);
}

const noTest = 
[[2, 3, 6],
 [0, 8, 4],
 [1, 7, 9]
]
const matrizTest = criaMatriz(noTest, null);

// =================================================================================================

function printarMatriz(matrizJogo) {
    matrizJogo.forEach(linha => {
        console.log(linha);
    });
}


// console.log(instanciarIA(3));

