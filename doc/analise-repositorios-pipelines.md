# Análise de Repositórios com Pipeline CI/CD

## Sobre a pipeline do projeto

A pipeline deste repositório (`.github/workflows/ci-cd.yml`) já está configurada para rodar automaticamente a cada `push` na branch `main` (e também em `pull_request` para `main`), atendendo ao requisito de acionamento automático.

## Repositórios analisados

### 1. [openapistack/openapi-client-axios](https://github.com/openapistack/openapi-client-axios)

**O que é:** biblioteca que gera clientes HTTP a partir de especificações OpenAPI, usando o Axios por baixo.

- **Gatilhos:** `push` nas branches `main` e em qualquer tag (`*`); `pull_request` para `main`.
- **Funcionalidades:** o job `test` roda em matriz, testando o projeto contra três versões diferentes do Axios (mais antiga suportada, última 0.x e última 1.x), além de lint e testes automatizados. Existe um segundo job, `publish`, que só executa quando o `push` é de uma tag (`if: startsWith(github.ref, 'refs/tags/')`) e depende do job `test` ter passado (`needs: test`).
- **Histórico:** pipeline enxuta e focada em compatibilidade — o uso de matriz de versões existe justamente para garantir que a lib continue funcionando com diferentes releases da dependência principal.

### 2. [expressjs/express](https://github.com/expressjs/express)

**O que é:** framework web mais usado do ecossistema Node.js.

- **Gatilhos:** `push` e `pull_request`, cobrindo o build "Linux" via GitHub Actions.
- **Funcionalidades:** roda lint (ESLint) e testes automatizados; historicamente o projeto combinava GitHub Actions (Linux) com AppVeyor (Windows) e Coveralls para cobertura de testes, mostrando uma pipeline que integra mais de uma ferramenta externa além do GitHub Actions.
- **Histórico:** repositório extremamente ativo, com badges de build, cobertura e licença expostos no próprio README — o status da pipeline funciona como selo público de qualidade do projeto.

### 3. [ember-cli/ember-cli](https://github.com/ember-cli/ember-cli)

**O que é:** CLI oficial do framework Ember.js.

- **Gatilhos:** `push` em várias branches (`master`, `beta`, `release`, `next`) e padrões de tag (`v*`, `release-*`, `lts-*`); `pull_request`; e também `schedule` com cron diário (`0 3 * * *`), rodando a pipeline mesmo sem alterações no código.
- **Funcionalidades:** pipeline dividida em múltiplos jobs encadeados via `needs` — `linting` e `basic-tests` (matriz de sistemas operacionais) rodam primeiro; depois `tests` (matriz de versões do Node × SO) e `feature-flags` (testa combinações de flags do projeto) só iniciam se os anteriores passarem. Usa `concurrency` para cancelar execuções antigas quando um novo commit chega.
- **Histórico:** é o exemplo mais robusto dos três — mistura testes agendados, múltiplas matrizes e dependência entre jobs, útil para um projeto grande com muitas combinações de ambiente a validar.

## Comparativo

| Característica | openapi-client-axios | expressjs/express | ember-cli/ember-cli |
|---|---|---|---|
| Gatilho por push | Sim (main + tags) | Sim | Sim (várias branches + tags) |
| Gatilho por pull request | Sim | Sim | Sim |
| Gatilho agendado (cron) | Não | Não | Sim (diário) |
| Testes em matriz | Versões do Axios | Não identificado | SO × versão do Node |
| Deploy/publish automático | Sim (ao criar tag) | Não | Não identificado |
| Jobs dependentes entre si (`needs`) | Sim | Não identificado | Sim |
| Ferramenta externa integrada | — | AppVeyor + Coveralls | — |

## Conclusão

Os três repositórios usam o GitHub Actions como base, mas com níveis de complexidade diferentes: o `openapi-client-axios` foca em compatibilidade de versões e publicação automática; o `express` combina GitHub Actions com ferramentas externas de build e cobertura; e o `ember-cli` é o mais elaborado, com execução agendada, múltiplas matrizes e dependência entre jobs — mostrando como a mesma ferramenta se adapta ao tamanho e à necessidade de cada projeto.
