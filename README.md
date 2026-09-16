# Gerador de Frases — Pipeline CI/CD

## Sobre o projeto

Projeto desenvolvido a partir do repositório base fornecido pelo professor, com o objetivo de estender a pipeline de integração e entrega contínua utilizando o GitHub Actions.

- **Repositório original:** [deivisontakatu/projeto-pipelines-devops](https://github.com/deivisontakatu/projeto-pipelines-devops)

A aplicação é uma página simples em HTML, CSS e JavaScript que exibe frases aleatórias ao usuário. Sobre essa base, foi construída uma pipeline com 9 etapas, incorporando 3 Actions do GitHub Marketplace para automatizar segurança, empacotamento e deploy.

## Tecnologias

- HTML, CSS, JavaScript
- Node.js / npm
- Jest (testes)
- ESLint (qualidade de código)
- GitHub Actions (CI/CD)

## Pipeline

A pipeline é disparada a cada `push` ou `pull request` na branch `main` e roda as etapas em sequência — se uma falhar, as seguintes não são executadas.

```
build → lint → test → security → package → deploy-dev → smoke-test → deploy-homolog → deploy-prod
```

| Etapa | O que faz |
|---|---|
| build | Instala as dependências do projeto |
| lint | Roda o ESLint para checar padrões de código |
| test | Roda os testes automatizados com Jest |
| security | Escaneia o projeto em busca de vulnerabilidades |
| package | Empacota os arquivos da aplicação como artefato |
| deploy-dev | Simula a publicação no ambiente de desenvolvimento |
| smoke-test | Simula um teste rápido de sanidade pós-deploy |
| deploy-homolog | Simula a publicação no ambiente de homologação |
| deploy-prod | Publica a aplicação em produção (GitHub Pages) |

## Actions do GitHub Marketplace utilizadas

### 1. [aquasecurity/trivy-action](https://github.com/aquasecurity/trivy-action)
Usada na etapa **security**. Escaneia os arquivos do repositório em busca de vulnerabilidades conhecidas (CVEs) nas dependências, com foco em falhas de severidade crítica e alta. Garante que o código só avance na pipeline se estiver dentro dos padrões de segurança definidos.

### 2. [actions/upload-artifact](https://github.com/actions/upload-artifact)
Usada na etapa **package**. Empacota os arquivos da aplicação (`index.html`, `style.css`, `script.js`) e os salva como artefato do workflow, disponível para download na aba Actions. Isso garante que o mesmo artefato gerado no build seja o que é promovido entre os ambientes.

### 3. [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
Usada na etapa **deploy-prod**. Publica automaticamente o conteúdo da aplicação na branch `gh-pages`, disponibilizando o site em produção via GitHub Pages, sem necessidade de deploy manual.

## Como executar localmente

```bash
git clone https://github.com/rafaelariganti/ProjetoPipeline.git
cd ProjetoPipeline
npm install
npm run lint
npm test
```

## Como acompanhar a pipeline

Após um `push` na branch `main`, acesse a aba **Actions** do repositório para ver cada etapa sendo executada em tempo real.
