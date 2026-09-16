const frases = [
    "O sucesso é a soma de pequenos esforços.",
    "A prática leva à evolução.",
    "Aprender é construir novas possibilidades.",
    "Grandes projetos começam com pequenas ideias.",
    "Não tenha medo de começar."
];

function obterFraseAleatoria(lista) {
    if (lista.length === 0) {
        return "Nenhuma frase disponível.";
    }

    const indice = Math.floor(Math.random() * lista.length);

    return lista[indice];
}

function exibirFrase() {
    const elemento = document.getElementById("frase");

    elemento.textContent = obterFraseAleatoria(frases);
}

if (typeof document !== "undefined") {
    const botao = document.getElementById("botao");

    botao.addEventListener("click", exibirFrase);
}

if (typeof module !== "undefined") {
    module.exports = {
        obterFraseAleatoria
    };
}