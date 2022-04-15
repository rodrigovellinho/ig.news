<h3 align="center">
  Bootcamp Ignite Rocketseat - Blog onde os usuários podem ter acesso ao conteúdo de cada postagem de acordo com o status de sua assinatura
</h3>

## :rocket: Sobre o desafio

<p align="center">
  <img src="https://github.com/rodrigovellinho/ig.news/blob/main/public/images/Capa.jpg" alt="Ig.News">
</p>

O projeto ig.news é um blog onde os usuários podem ter acesso ao conteúdo de cada postagem de acordo com o status de sua assinatura.
O blog possui um sistema de compra integrado com o STRIPE, e após o usuário realizar o pagamento, sua inscrição estará ativa e pronta para visualizar o conteúdo completo de todo o blog. Caso o usuário não deseje optar pela assinatura, ele terá acesso limitado ao conteúdo das postagens. E todos os dados necessários para se fazer verificações de assinaturas ou dados dos usuários, estão salvos no banco de dados FaunaDB.

A aplicação foi desenvolvida utilizando o framework NextJS aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Site Generation (SSG), STRIPE para pagamentos das subscriptions, NextAuth para autenticação com Github, FaunaDB para armazenar as informações do usuário em um banco de dados e Prismic CMS para adição e gerenciamento do conteúdo dos posts.

## :wrench: Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git clone https://github.com/rodrigovellinho/ig.news.git
# ou use a opção de download.

# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Para iniciar a aplicação
$ yarn dev
# Acesse http://localhost:8080 no seu navagador
```

## 🔨 Tecnologias:

- **[Next.js](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prismic CMS](https://prismic.io/)**
- **[Stripe](https://stripe.com/br)**
- **[Fauna DB](https://fauna.com/)**
- **[Axios](https://github.com/axios/axios)**
- **[Next-Auth](https://next-auth.js.org/)**

---

Feito por [Rodrigo Kloeckner](https://github.com/rodrigovellinho)
