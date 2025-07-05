# Mini Portainer com Node.js e PostgreSQL

> _Este README foi escrito como um artigo interativo, pensado para ser apresentado em sala e rodado no GitHub Codespaces. Os comentários e dicas refletem a experiência de um aluno explicando cada etapa do projeto._

Este projeto é um painel web para gerenciar containers Docker, utilizando Node.js, Express, PostgreSQL e Dockerode. O objetivo é fornecer uma interface visual para controlar containers Docker, com autenticação de usuários e registro de ações.

---

## 🎬 Apresentação no Codespaces

> **Comentário:** _"Escolhi o Codespaces porque ele já vem com Node.js e Docker prontos, então consigo demonstrar tudo sem instalar nada na minha máquina. O PostgreSQL pode ser local ou externo, e o painel web fica acessível direto pelo navegador!"_

---

## Estrutura do Projeto

```text
mini-portainer/
├── server.js          # Ponto de entrada da aplicação (backend Node.js)
├── package.json       # Configurações do projeto e dependências
├── .env               # Variáveis de ambiente sensíveis (NÃO subir para o git)
└── public/
    └── index.html     # Frontend da aplicação (artigo + painel interativo)
```

> **Comentário:** _"Separei o frontend (HTML/JS) do backend para facilitar manutenção e deixar o artigo/tutorial acessível junto do painel."_

---

## Funcionalidades

- Listar containers em execução e todos os existentes.
- Iniciar containers parados com um clique.
- Parar containers ativos com segurança.
- Login seguro e registro de todas as ações no banco de dados.
- Painel web minimalista, fácil de adaptar e expandir.

---

## Pré-requisitos

- Node.js (v12.2+)
- PostgreSQL instalado e rodando
- Docker instalado e funcionando
- Noções básicas de JavaScript, SQL e Docker

> **Comentário:** _"O Codespaces já tem Node.js e Docker, então só precisei me preocupar com o banco de dados e as variáveis de ambiente."_

---

## Instalação e Execução no Codespaces

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu_usuario/mini-portainer.git
   cd mini-portainer
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie o banco e as tabelas no PostgreSQL:
     ```sql
     CREATE DATABASE mini_portainer;
     \c mini_portainer;
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL
     );
     CREATE TABLE actions (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id),
       action_type VARCHAR(50) NOT NULL,
       target VARCHAR(255) NOT NULL,
       timestamp TIMESTAMP NOT NULL DEFAULT NOW()
     );
     ```

4. **Preencha o arquivo `.env` com suas credenciais:**
   ```env
   DB_USER=seu_usuario
   DB_HOST=localhost
   DB_NAME=mini_portainer
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   JWT_SECRET=umasecretfortejwt
   PORT=3000
   ```

5. **Inicie o servidor:**
   ```bash
   node server.js
   ```

6. **Acesse a aplicação:**
   - No Codespaces, o endereço será algo como:
     `https://<seu-workspace>-3000.app.github.dev`

---

## Uso

- Registre-se e faça login para acessar o painel.
- Gerencie seus containers Docker através da interface.
- Todas as ações (start/stop) são auditadas no banco de dados.

> **Comentário:** _"Durante a apresentação, mostrei o artigo/tutorial e o painel funcionando ao vivo, controlando containers Docker direto do Codespaces!"_

---

## Segurança

Mantenha o arquivo `.env` em segredo e não o inclua no controle de versão. Utilize uma chave secreta forte para o JWT.

> **Comentário:** _"Expliquei para a turma a importância de não subir o .env para o git e de usar JWT forte para proteger as sessões."_

---

## Possíveis Expansões

- Adicionar histórico de ações por usuário/container.
- Permitir múltiplos usuários e diferentes permissões.
- Adicionar deploy, remoção e criação de containers via UI.
- Implementar filtros e paginação na listagem de containers.

---

## Contribuições

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades. Compartilhe suas ideias e ajude a evoluir este projeto!

---

## Licença

Este projeto é de uso livre.

## Estrutura do Projeto

```
mini-portainer/
├── server.js          # Ponto de entrada da aplicação
├── package.json       # Configurações do projeto e dependências
├── .env               # Variáveis de ambiente sensíveis
└── public/
    └── index.html     # Frontend da aplicação
```

## Funcionalidades

- Listar containers em execução e todos os existentes.
- Iniciar containers parados com um clique.
- Parar containers ativos com segurança.
- Login seguro e registro de todas as ações no banco de dados.
- Painel web minimalista, fácil de adaptar e expandir.

## Pré-requisitos

- Node.js (v12.2+)
- PostgreSQL instalado e rodando
- Docker instalado e funcionando
- Noções básicas de JavaScript, SQL e Docker

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu_usuario/mini-portainer.git
   cd mini-portainer
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie o banco de dados e as tabelas conforme descrito na documentação.

4. Preencha o arquivo `.env` com suas credenciais.

5. Inicie o servidor:
   ```
   node server.js
   ```

6. Acesse a aplicação em `http://localhost:3000`.

## Uso

- Registre-se e faça login para acessar o painel.
- Gerencie seus containers Docker através da interface.

## Segurança

Mantenha o arquivo `.env` em segredo e não o inclua no controle de versão. Utilize uma chave secreta forte para o JWT.

## Contribuições

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades. Compartilhe suas ideias e ajude a evoluir este projeto!

## Licença

Este projeto é de uso livre.