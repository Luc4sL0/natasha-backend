# 🎨 Portfólio Artístico - Back-end

API em **Node.js + Express + Firebase Firestore + Firebase Authentication** responsável por gerenciar dados dinâmicos de um portfólio artístico — incluindo **artes, eventos** e conteúdo configurável via painel administrativo.

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
👉 `http://localhost:3000/api`

ATENÇÃO -> PARA EXECUTAR LOCALMENTE E TESTAR A API, O ARQUIVO src/config/firebase-service-account.json PRECISA SER SUBSTITUÍDO PELA ARQUIVO COM AS CREDENCIAIS ATUALMENTE ATIVAS (ARQUIVO PRESENTE NA ENTREGA DO TRABALHO). 

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

