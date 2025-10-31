# 🎨 Portfólio Artístico - Back-end

API em **Node.js + Express + Firebase Firestore** responsável por gerenciar dados dinâmicos de um portfólio artístico — incluindo **artes, eventos** e conteúdo configurável via painel administrativo.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (v18.x recomendada)
- **Express.js**
- **Firebase Firestore** (banco de dados NoSQL)
- **Firebase Authentication** (autenticação de usuários)
- **dotenv** para gerenciamento de variáveis de ambiente
- **CORS** e **body-parser** nativos do Express

---

## 📁 Estrutura do Projeto

```

project-root/
│
├── src/
│   ├── controllers/      # Controladores das rotas
│   ├── models/           # Regras de negócio e acesso ao Firestore
│   ├── routes/           # Definição de rotas da API
│   └── config/           # Configuração do Firebase
│
├── .env
├── .nvmrc
├── .gitignore
├── package.json
├── package-lock.json
├── server.js             # Ponto de entrada da aplicação
└── README.md

````

---

## ⚙️ Configuração do Ambiente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/download) versão **18.x** ou superior.
- Conta no [Firebase Console](https://console.firebase.google.com/).

### 2. Instalar dependências

```bash
npm install
````

### 4. Executar o servidor local

Use `node server.js` para executar diretamente.

A API estará disponível em:
👉 `http://localhost:5000/api`

---

## 🧠 Estrutura das Rotas

| Método     | Rota                              | Descrição                                                                   |
| ---------- | --------------------------------- | --------------------------------------------------------------------------- |
| **GET**    | `/api/v1/arts`                    | Retorna todas as artes                                                      |
| **POST**   | `/api/v1/arts`                    | Cria uma nova arte                                                          |
| **GET**    | `/api/v1/arts/:id`                | Retorna uma arte específica                                                 |
| **DELETE** | `/api/v1/arts/:id`                | Exclui uma arte                                                             |
| **PUT**    | `/api/v1/arts/:id`                | Atualiza uma arte existente                                                 |
| **GET**    | `/api/v1/arts/category/:category` | Retorna todas as artes de uma categoria específica (ex: pintura, escultura) |
| **GET**    | `/api/v1/arts/featured`           | Retorna apenas as artes destacadas no portfólio                             |
| **GET**    | `/api/v1/arts/recent`             | Retorna as artes mais recentes (ordenadas por data de criação)              |
| **GET**    | `/api/v1/arts/search?q=termo`     | Busca por artes a partir de um termo (nome, técnica, descrição)             |
| **GET**    | `/api/v1/arts/random`             | Retorna uma arte aleatória (para destaque dinâmico no site)                 |
| **PATCH**  | `/api/v1/arts/:id/like`           | Incrementa o contador de curtidas de uma arte (interação do público)        |

| Método     | Rota                                   | Descrição                                                                         |
| ---------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| **GET**    | `/api/v1/events`                       | Lista todos os eventos                                                            |
| **POST**   | `/api/v1/events`                       | Cria um novo evento                                                               |
| **GET**    | `/api/v1/events/:id`                   | Retorna detalhes de um evento específico                                          |
| **PUT**    | `/api/v1/events/:id`                   | Atualiza um evento existente                                                      |
| **DELETE** | `/api/v1/events/:id`                   | Remove um evento                                                                  |
| **GET**    | `/api/v1/events/upcoming`              | Retorna os próximos eventos futuros (por data > hoje)                             |
| **GET**    | `/api/v1/events/past`                  | Retorna os eventos passados (data < hoje)                                         |
| **GET**    | `/api/v1/events/next`                  | Retorna o evento mais próximo (o mais próximo no tempo)                           |
| **GET**    | `/api/v1/events/latest`                | Retorna o último evento ocorrido                                                  |
| **GET**    | `/api/v1/events/location/:city`        | Lista eventos por cidade/localidade                                               |
| **GET**    | `/api/v1/events/highlighted`           | Retorna eventos marcados como destaque                                            |
| **GET**    | `/api/v1/events/participation/:status` | Filtra eventos por status da artista (`upcoming`, `past`, `invited`, `confirmed`) |
| **GET**    | `/api/v1/events/search?q=termo`        | Busca por eventos a partir do nome, local ou descrição                            |

---

## 🧩 Boas Práticas

### ✅ Estilo de Código

* Utilize **ESModules** (`import/export`) em vez de `require`.
* Prefira **async/await** em vez de callbacks.
* Nomeie variáveis e funções de forma clara e consistente.
* Padronize formatação com [Prettier](https://prettier.io/) ou [ESLint](https://eslint.org/).

### 🔄 Versionamento (Git)

1. Crie uma **branch** a partir da `master`:

   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. Faça commits descritivos:

   ```
   git commit -m "feat: adiciona rota para criação de artes"
   ```

3. Envie a branch e abra um **Pull Request** no GitHub:

   * Inclua título e descrição claros.
   * Referencie issues (ex: `Closes #12`).
   * Solicite revisão antes de mergear.

4. Após aprovação:

   ```bash
   git checkout master
   git pull origin master
   git merge feature/nome-da-feature
   git push origin master
   ```

---

## 👥 Contribuidores

* **[Beatriz Pimentel]** — Back-end Developer
* **[Lucas Lopes Baroni]** — Back-end Developer

---

## 📝 Licença

Distribuído sob a licença MIT.
Consulte o arquivo `LICENSE` para mais informações.

---

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-blue)

