<div align="center">
  <img src="https://cdn.discordapp.com/attachments/752375682608398357/959085665256091718/logo_1.png"/>
</div>

##
<h3 align="center"> Uma Newsletter de React </h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/tinellin/ignite-ignews?color=525dcb">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tinellin/ignite-ignews?color=525dcb">
  	
  <img alt="Made by Enzo Tinelli" src="https://img.shields.io/badge/made%20by-Enzo Tinelli-%2304D361?color=525dcb">
	
  
  <a href="https://github.com/tinellin/ignite-ignews/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tinellin/ignite-ignews?color=525dcb">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=525dcb">
</p>

<img src="https://cdn.discordapp.com/attachments/752375682608398357/959119992341815316/desktop.png" alt="ig.news tela principal"/>

<h2> 📄 Sobre o projeto </h2>

<p>O projeto consiste em uma Newsletter de React com um sistema de inscrição, na qual o usuário paga uma mensalidade para acessar os posts. O app possui um sistema de pagamento com o Stripe, listagem de posts e visualização de posts padronizados (utilizando o Prismic CMS). Esse App tem como objetivo principal aprender a utilizar o framework Next.js.</p>

<h2> 🧪 Tecnologias </h2>

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/br)
- [FaunaDB](https://fauna.com/)
- [PrismicCMS](https://prismic.io/)

<h2> 💡 Conteúdos abordados</h2>

- React, React Hooks
- SASS com CSS Modules
- Consumir Next.js API Routes e API Externas
- SSR (Server Side Rendering)
- SSG (Static Site Generation)
- Uso do Stripe para controlar o sistema de pagamento de assinaturas
- OAuth Github com NextAuth.js
- FaunaDB (No-SQL) para o armazenamento dos dados do usuário e sua respectiva inscrição
- PrismicCMS para fornecer os posts padronizados

<h2> 🚀 Como executar </h2>

<p> Antes de tudo, crie uma conta nesses serviços externos </p>

- [FaunaDB](https://fauna.com/)
- [Stripe](https://stripe.com/br)
- [PrismicCMS](https://prismic.io/)

<p> E, configure: </p>

<h3> 💽 FaunaDB </h3>

- Crie uma base de dados
- Configure as Collections:
  - "subscriptions"
  - "users"
- Crie os seguintes indexes:

```md
  {
    name: "subscription_by_id",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: [
      {
        field: ["data", "id"]
      }
    ]
  }

  {
    name: "subscription_by_status",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: [
      {
        field: ["data", "status"]
      }
    ]
  }

  {
    name: "subscription_by_user_ref",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: [
      {
        field: ["data", "userId"]
      }
    ]
  }

  {
    name: "user_by_email",
    unique: true,
    serialized: true,
    source: "users",
    terms: [
      {
        field: ["data", "email"]
      }
    ]
  }

  {
    name: "user_by_stripe_customer_id",
    unique: false,
    serialized: true,
    source: "users",
    terms: [
      {
        field: ["data", "stripe_customer_id"]
      }
    ]
  }
```

<h3> 💰 Stripe (Sistema de pagamentos) </h3>

- Crie a empresa fake, e um produto com o nome "subscription" e seu respectivo valor.
- Na aba "desenvolvedores", crie e configure o Webhook utilizando localmente ou inserindo um endpoint hospedado.
- Ambos os casos devem ser usados a rota: ```{root}/api/webhooks```

<h3> 📦 PrismicCMS </h3>

- Crie um bloco para seu app. Navegue até a aba "Custom Types" e crie um documento dessa forma (nessa ordem):
  - Tipo: Repeatable Type
  - Nome: publication
  - Campos: UID, Title, RichText (com múltiplos parágrafos)
- Por fim, na aba "Documents" crie seus posts

<h3> 🔑 Variáveis Ambiente </h3>

- Com o download feito e o projeto aberto faça:
  - Crie um arquivo ```.env.local``` no diretório raiz do projeto.
  - Copie as variáveis do arquivo ```.env.example``` e cole no ```.env.local```.

##

<h3> 💻 Clonar e executar App </h3>

```bash
git clone https://github.com/tinellin/ignite-ignews.git
cd ignews

#Instale todas as depêndencias com
yarn

#Inicialize a aplicação com
yarn dev
```

<h3> 🧾 Licença </h3>
Este projeto esta sob a MIT license para mais detalhes.

##

Feito com ❤️ por Enzo Tinelli</br>
By Rocketseat
