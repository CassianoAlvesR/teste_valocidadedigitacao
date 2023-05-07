const texto = document.querySelector("#texto")
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alterarTemaBtn = document.querySelector("#alterarTema")

const textos = [
    "Exemplo 1 de digitacao nivel facil.",
    "Exemplo 2 de digitacao nivel medio.",
    "Exemplo 3 de digitacao nivel hard."
];

function novoTexto(){
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
}

function validarDigitacao(){
    iniciarContador();

    if(entrada.value === texto.textContent){
        verificarResultadoDigitacao();
        console.log("verificando.");
    }
}

function iniciarContador(){
    let statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento")); // true => string

    if(!statusDoTeste){
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificarResultadoDigitacao(){
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Parabéns, você digitou o texto em ${tempoGasto} segundos!`;

    criarHistorico(texto.textContent, tempoGasto);
    
    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
}

function criarHistorico(textoDigitado, tempoGasto){
    const itemHistorico = document.createElement("p");

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto} em segundos`;

    historico.appendChild(itemHistorico);
}

function reiniciarTeste(){
    entrada.value = "";
    resultado.textContent = "";
    novoTexto()
    localStorage.setItem("texteEmAndamento", false)
    historico.innerHTML = "";
}

function alterarTema(){
    const body = document.body;

    body.classList.toggle("claro");
    body.classList.toggle("escuro");

    //console.log(body);

    if(body.classList == "escuro"){
        alterarTemaBtn.innerHTML = "Modo Claro";   
    } else {
        alterarTemaBtn.innerHTML = "Modo Escuro";
    } 
}

entrada.addEventListener("keyup", validarDigitacao);
reiniciar.addEventListener("click", reiniciarTeste);
alterarTemaBtn.addEventListener("click", alterarTema);

novoTexto()

