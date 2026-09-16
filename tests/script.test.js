const { obterFraseAleatoria } = require("../script");

describe("Gerador de frases", () => {

    test("deve retornar uma frase da lista", () => {

        const frases = [
            "Frase 1",
            "Frase 2",
            "Frase 3"
        ];

        const resultado = obterFraseAleatoria(frases);

        expect(frases).toContain(resultado);
    });

    test("deve informar quando não existem frases", () => {

        const resultado = obterFraseAleatoria([]);

        expect(resultado).toBe("Nenhuma frase disponível.");
    });

});