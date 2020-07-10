const criaMatriz = require(`./Matriz`);
const guloso = require(`./guloso`);
const largura = require(`./largura`);
const comparaMatrizes = require(`./utils`).comparaMatrizes;

const commands = {
    guloso: guloso.expandirNoGuloso,
    largura: largura.expandirNo
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

function executarBusca(matriz, matrizSolucao) {
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
        if(comparaMatrizes(no.getMatriz(), matrizSolucao.getMatriz())) {                                    
            return no;
        }
        let proximosNos = criarProximosNos(no, matrizSolucao);
        proximosNos.forEach(proximoNo => {
            filaNos.push(proximoNo);
        });
    }
}

function criarProximosNos(matriz, matrizResposta = null) {    
    let posicaoDoZero = encontrarPosicaoDoZero(matriz.getMatriz());
    let moviementosDisponiveis = encontrarMovimentosDisponiveis(posicaoDoZero, matriz.length());
    return commands["largura"](matriz, posicaoDoZero, moviementosDisponiveis, matrizResposta);
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

const no = gerarMatrizQuadradaAleatoria(3);
const noResolvido = gerarMatrizQuadradaResolvida(3);
const matrizResolvida = criaMatriz(noResolvido, null);
const matriz = criaMatriz(no, null);
const noTest = 
[[2, 3, 6],
 [0, 8, 4],
 [1, 7, 9]
]
const matrizTest = criaMatriz(noTest, null);
console.table(executarBusca(matrizTest, matrizResolvida));

// =================================================================================================

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

