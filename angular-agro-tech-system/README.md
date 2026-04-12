# Agro Tech System - Frontend Angular 19

Sistema de gerenciamento de sensores agrícolas desenvolvido em Angular 19, integrado com backend Java 21 usando arquitetura hexagonal.

## 📋 Descrição

Aplicação web completa para gerenciamento de sensores agrícolas, incluindo:

- Autenticação e controle de acesso
- Gerenciamento de tipos de sensores
- Cadastro e monitoramento de sensores
- Configuração de regras de monitoramento
- Registro de leituras de sensores
- Sistema de alertas
- Gerenciamento de usuários

## 🚀 Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **Angular Router** - Sistema de rotas
- **Angular Forms** - Formulários reativos e template-driven
- **HttpClient** - Comunicação com API REST

## 📁 Estrutura do Projeto

```
src/app/
├── components/       # Componentes da aplicação
│   ├── login/       # Tela de login
│   ├── principal/   # Tela principal com menu
│   ├── cadastro/    # 6 componentes de cadastro
│   └── consulta/    # 6 componentes de consulta
├── models/          # Interfaces TypeScript
├── services/        # Serviços HTTP (7 serviços)
├── guards/          # Guards de autenticação
├── interceptors/    # Interceptors HTTP
└── environments/    # Configurações de ambiente
```

## ⚙️ Configuração

### Pré-requisitos

- Node.js 18 ou superior
- Backend Java 21 rodando em http://localhost:8080

### Instalação

```bash
npm install
npm start
```

Acesse: `http://localhost:4200`

## 🔌 Endpoints Integrados

A aplicação consome todos os endpoints do backend Java 21:

- **Auth**: POST /auth/login
- **Tipos Sensor**: CRUD + filtros (por id, nome, status)
- **Sensores**: CRUD + filtros (por id, código, área, status)
- **Regras**: CRUD + filtros (por id, tipo sensor, sensor, prioridade, área)
- **Leituras**: CRUD + filtros (por id, sensor, área)
- **Alertas**: CRUD + filtros (por id, tipo sensor, sensor, prioridade, área)
- **Usuários**: CRUD + filtros (por id, nome, email)

## 🎯 Funcionalidades

### Tela de Login

- Campos: email, senha
- Botões: Entrar, Cancelar
- Link: Novo usuário

### Menu Principal

- **Cadastros**: Tipos Sensor, Sensor, Regra, Leitura, Alerta, Usuário
- **Consultas**: Todas as entidades com grids e filtros
- **Sistema**: Sobre (autores), Sair

### Padrão de Cadastro

- Formulário validado
- Botões: Salvar, Limpar, Fechar
- Mensagens de sucesso/erro
- Auto-limpeza após salvar

### Padrão de Consulta

- Grid de dados
- Botões: Novo, Pesquisar, Fechar
- Modal de pesquisa com filtros dinâmicos

## 👥 Autores

- Elizeu Barros
- Nathália Elen
- Nelson Fornazeiro

## 📝 Scripts

```bash
npm start        # Servidor desenvolvimento
npm run build    # Build produção
npm test         # Testes
```

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.23.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
