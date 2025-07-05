# Mini Portainer: Gerenciamento Didático de Containers Docker com Node.js e PostgreSQL

## Resumo

Este projeto apresenta o desenvolvimento de um painel web minimalista para gerenciamento de containers Docker, com backend em Node.js/Express, banco de dados PostgreSQL e autenticação JWT. O objetivo é fornecer uma solução didática, segura e expansível para estudantes e desenvolvedores que desejam aprender, demonstrar ou prototipar automação de containers e boas práticas de backend.

## Motivação

- Facilitar o aprendizado de Docker, Node.js e PostgreSQL de forma integrada.
- Demonstrar autenticação segura, registro de ações e integração com containers.
- Prover um painel visual para gerenciamento básico de containers sem depender de ferramentas externas.

## Estrutura do Projeto

```
mini-portainer/
├── node_modules/
├── server.js
├── package.json
├── .env
├── public/
│   └── index.html
```

## Tecnologias Utilizadas

- **Node.js** e **Express**: Backend RESTful.
- **PostgreSQL**: Banco de dados relacional para usuários e auditoria.
- **Dockerode**: Integração Node.js com Docker Engine.
- **JWT** e **bcryptjs**: Autenticação e segurança.
- **HTML/CSS/JS**: Frontend leve e didático.

## Funcionalidades

- Cadastro e login de usuários com senha protegida por hash.
- Listagem de todos os containers Docker (ativos e inativos).
- Início e parada de containers via painel web.
- Registro de todas as ações no banco para auditoria.
- Interface web responsiva e autoexplicativa.

## Fluxo de Uso

1. **Configuração**: Ajuste o arquivo `.env` com as credenciais do PostgreSQL e JWT.
2. **Banco de Dados**: Crie o banco e as tabelas conforme instruções do projeto.
3. **Execução**: Inicie o backend (`npm start`) e acesse o painel na porta 3000.
4. **Registro/Login**: Crie um usuário e faça login para acessar o painel.
5. **Gerenciamento**: Liste, inicie e pare containers Docker pelo painel.

## Segurança e Boas Práticas

- Senhas nunca são armazenadas em texto puro.
- JWT protege as rotas sensíveis.
- Variáveis sensíveis ficam no `.env` (não versionado).
- Todas as ações são auditadas no banco.

## Possíveis Expansões

- Histórico detalhado de ações por usuário/container.
- Permissões diferenciadas por usuário.
- Deploy, remoção e criação de containers via UI.
- Logs de falhas e tentativas de acesso.

## Conclusão

O Mini Portainer é uma base sólida para estudos, demonstrações e prototipagem de automação de containers, unindo conceitos modernos de backend, segurança e DevOps em um projeto prático e acessível.

---

*Desenvolvido por Abraão Teixeira e colaboradores. Compartilhe, evolua e aprenda!*
