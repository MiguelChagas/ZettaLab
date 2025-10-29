# 🌍 Atlas Mundial

**Plataforma interativa para exploração de dados de países ao redor do mundo**

Aplicação educativa desenvolvida com Angular que consome a API REST Countries para fornecer informações detalhadas sobre países, incluindo um jogo interativo de bandeiras.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Integrada](#-api-integrada)

---

## 🎯 Sobre o Projeto

**Atlas Mundial** é uma aplicação frontend desenvolvida para facilitar o acesso a informações sobre países de todo o mundo. O projeto oferece uma interface moderna e responsiva, consumindo a API REST Countries para exibir dados como população, capital, idiomas, bandeiras e muito mais.

### Objetivos Principais

✅ Facilitar o acesso a informações geográficas e demográficas mundiais  
✅ Promover educação através de interface intuitiva e gamificação  
✅ Oferecer experiência interativa com jogo de adivinhação de bandeiras  
✅ Proporcionar busca rápida e eficiente de países  
✅ Apresentar dados visuais com design moderno e responsivo

---

## ✨ Funcionalidades

### 🗺️ Página Principal (Países)

- Listagem completa de todos os países do mundo
- Cards visuais com bandeira, população e capital
- Ordenação alfabética automática por nome em português
- Navegação para página de detalhes de cada país
- Design responsivo com grid adaptável

### 🔍 Pesquisar

- Busca em tempo real com debounce (otimização de requisições)
- Pesquisa por nome do país em português
- Filtros inteligentes que começam a buscar após 300ms
- Resultados instantâneos com feedback visual
- Mensagens claras para "nenhum resultado encontrado"

### 🎮 Jogo das Bandeiras

- Quiz interativo com 10 rodadas
- 5 opções de resposta por rodada
- Timer de 10 segundos por pergunta
- Sistema de pontuação e estatísticas
- Feedback visual imediato (cores para certo/errado)
- Taxa de acerto calculada ao final
- Botão para reiniciar o jogo

### 📊 Detalhes do País

- Informações detalhadas de cada país:
  - Nome oficial e tradução em português
  - Bandeira em alta resolução
  - População formatada
  - Capital
  - Continente
  - Idiomas falados
- Interface limpa com cards informativos
- Ícones FontAwesome para melhor visualização

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Angular 19.1.5** - Framework principal (Standalone Components)
- **TypeScript 5.7.2** - Linguagem de programação tipada
- **RxJS 7.8.0** - Programação reativa e gerenciamento de observables
- **SCSS** - Pré-processador CSS para estilização avançada
- **Bootstrap 5.3.3** - Framework CSS responsivo

### Bibliotecas e Ferramentas

- **Angular Router** - Navegação entre páginas
- **HttpClient** - Requisições HTTP à API REST Countries
- **FontAwesome** - Ícones vetoriais
- **Google Fonts** (Merriweather & Roboto) - Tipografia

### DevOps & Build

- **Angular CLI** - Ferramenta de linha de comando
- **Node.js** - Ambiente de execução
- **SSR (Server-Side Rendering)** - Renderização no servidor
- **Express** - Servidor Node.js para SSR

---

## 📦 Pré-requisitos

### Para executar com Angular CLI

- **Node.js** versão 18.x ou 20.x
- **npm** versão 9.x ou superior
- **Angular CLI** versão 19.x

### Verificar instalações

```bash
node --version
npm --version
ng version
```

---

## 📥 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/MiguelChagas/ZettaLab.git
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Variáveis de Ambiente

Este projeto não requer configuração de chaves de API, pois utiliza a API pública REST Countries que não exige autenticação.

---

## 🚀 Como Executar

### Método 1: Servidor de Desenvolvimento

#### Passo 1: Inicie o servidor

```bash
npm start
```

ou

```bash
ng serve
```

#### Passo 2: Acesse a aplicação

Abra seu navegador em: **http://localhost:4200**

### Comandos Úteis

```bash
# Rodar em uma porta específica
ng serve --port 3000

# Abrir automaticamente no navegador
ng serve --open

# Build de produção
ng build --configuration production

# Rodar testes unitários
ng test

---

## 📂 Estrutura do Projeto

```

ZettaLab/
│
├── src/
│ ├── app/
│ │ ├── components/ # Componentes de layout
│ │ │ └── layout/
│ │ │ ├── footer/ # Rodapé da aplicação
│ │ │ └── sidebar/ # Menu lateral de navegação
│ │ │
│ │ ├── pages/ # Páginas principais
│ │ │ ├── country-list/ # Listagem de todos os países
│ │ │ ├── country-detail/ # Detalhes de um país específico
│ │ │ ├── search-page/ # Página de busca com filtros
│ │ │ └── flag-game/ # Jogo de adivinhação de bandeiras
│ │ │
│ │ ├── services/ # Serviços (API calls)
│ │ │ ├── country.service.ts # Consumo da API REST Countries
│ │ │ └── country.service.spec.ts # Testes do serviço
│ │ │
│ │ ├── app.component.ts # Componente raiz
│ │ ├── app.component.html # Template principal
│ │ ├── app.component.scss # Estilos do layout principal
│ │ ├── app.component.spec.ts # Testes do componente raiz
│ │ ├── app.routes.ts # Configuração de rotas (client)
│ │ ├── app.routes.server.ts # Configuração de rotas SSR
│ │ ├── app.config.ts # Configuração da aplicação (client)
│ │ ├── app.config.server.ts # Configuração SSR
│ │ └── variables.scss # Variáveis globais de estilo
│ │
│ ├── index.html # HTML principal
│ ├── main.ts # Entry point (client-side)
│ ├── main.server.ts # Entry point (SSR)
│ ├── styles.scss # Estilos globais
│ └── server.ts # Servidor Express para SSR
│
├── angular.json # Configuração do Angular
├── package.json # Dependências do projeto
├── tsconfig.json # Configuração TypeScript
├── tsconfig.app.json # Config TS para aplicação
├── tsconfig.spec.json # Config TS para testes
└── README.md # Este arquivo

````

---

## 🌐 API Integrada

### REST Countries API v3.1

**Base URL:** `https://restcountries.com/v3.1`

#### Endpoints Utilizados:

```typescript
// Buscar todos os países com campos específicos
GET /all?fields=name,flags,population,capital,translations,region,languages

// Buscar país por código
GET /alpha/{code}
````

#### Documentação:

🔗 [restcountries.com](https://restcountries.com/)

#### Características:

✅ **Sem necessidade de autenticação**  
✅ **Dados em tempo real**  
✅ **Cobertura global** (todos os países reconhecidos pela ONU)  
✅ **Múltiplas traduções** (incluindo português)  
✅ **Informações detalhadas** (bandeiras, população, idiomas, moedas, etc.)

#### Campos Retornados:

- `name.common` - Nome comum do país
- `name.official` - Nome oficial
- `translations.por.common` - Nome em português
- `flags.svg` - Bandeira em formato SVG
- `flags.alt` - Texto alternativo da bandeira
- `capital` - Capital(is) do país
- `population` - População
- `region` - Continente
- `languages` - Idiomas falados

---

## 🎨 Padrões de Código

### Componentes Standalone

Este projeto utiliza a arquitetura moderna do Angular com **standalone components**, eliminando a necessidade de módulos NgModule.

### RxJS e Observables

Todas as requisições HTTP utilizam **Observables** do RxJS:

- `subscribe()` - Para receber dados assíncronos
- `pipe()` - Para transformar dados
- `map()` - Para mapear/filtrar resultados
- `debounceTime()` - Para otimizar buscas em tempo real
- `distinctUntilChanged()` - Para evitar buscas duplicadas
- `takeUntil()` - Para gerenciar unsubscription

### TypeScript Interfaces

Interfaces tipadas para garantir type safety:

```typescript
interface Country {
  name: { official: string };
  translations: { por: { common: string } };
  flags: { svg: string; alt: string };
  capital: string[];
  population: number;
  region: string;
  languages: { [key: string]: string };
}
```

---

## 🧪 Testes

### Executar Testes Unitários

```bash
ng test
```

### Executar com Cobertura

```bash
ng test --code-coverage
```

Os testes estão localizados em arquivos `*.spec.ts` ao lado de cada componente e serviço.

---

## 👨‍💻 Desenvolvedor

**Miguel Chagas Figueiredo**  
Desafio ZettaLab 2025

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação
