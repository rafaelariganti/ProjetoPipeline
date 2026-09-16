# Gerador de Frases

Projeto simples desenvolvido para demonstrar o funcionamento de uma pipeline CI/CD utilizando GitHub Actions.

## Sobre o projeto

A aplicação apresenta frases aleatórias ao usuário.

O projeto utiliza:

- HTML
- CSS
- JavaScript
- Node.js
- Jest
- ESLint
- GitHub Actions

## Pipeline

A pipeline possui as seguintes etapas:

1. Build
2. Lint
3. Test
4. Security
5. Deploy Dev
6. Smoke Test
7. Deploy Homologação
8. Deploy Produção

## Fluxo

```text
Build
  ↓
Lint
  ↓
Test
  ↓
Security
  ↓
Deploy Dev
  ↓
Smoke Test
  ↓
Homologação
  ↓
Produção