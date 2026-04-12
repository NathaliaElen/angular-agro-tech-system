# 🚀 GUIA RÁPIDO DE USO - AGRO TECH SYSTEM

## ⚡ Início Rápido

### 1. Instalação e Execução

```bash
# Entre na pasta do projeto
cd c:/angular-agro-tech-system/angular-agro-tech-system

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### 2. Acesse a Aplicação

Abra o navegador em: **http://localhost:4200**

---

## 📱 COMO USAR A APLICAÇÃO

### 🔐 PRIMEIRO ACESSO

1. **Criar Primeiro Usuário**
   - Na tela de login, clique em **"Novo usuário"**
   - Preencha: Nome, E-mail, Senha, Status (Ativo)
   - Clique em **Salvar**
   - Você será redirecionado para o login

2. **Fazer Login**
   - Digite seu e-mail e senha
   - Clique em **Entrar**
   - Você será direcionado para a Tela Principal

---

## 🎯 NAVEGAÇÃO PRINCIPAL

### Menu CADASTROS

Clique em **Cadastros** no menu superior e escolha:

#### 1. **Tipo de Sensor**

- Cadastre tipos como: Temperatura, Umidade, pH, etc.
- Campos: Nome, Unidade de Medida (°C, %, etc.), Descrição, Status

#### 2. **Sensor**

- Cadastre sensores físicos
- Campos: Código, ID Tipo Sensor, ID Área, Intervalo (segundos), Status

#### 3. **Regra**

- Configure regras de alerta
- Campos: Nome, Descrição, Limites (Min/Max), Prioridade, IDs relacionados

#### 4. **Leitura**

- Registre leituras dos sensores
- Campos: ID Sensor, ID Área, Valor

#### 5. **Alerta**

- Gerencie alertas do sistema
- Campos: Título, Mensagem, Prioridade, IDs relacionados

#### 6. **Usuário**

- Cadastre novos usuários
- Campos: Nome, E-mail, Senha, Status

### Menu CONSULTAS

Clique em **Consultas** no menu superior e escolha:

Todas as consultas seguem o mesmo padrão:

- **Grid** mostrando todos os registros
- **Botão Novo**: Abre tela de cadastro
- **Botão Pesquisar**: Abre filtros disponíveis
- **Botão Fechar**: Volta ao menu principal

#### Como Pesquisar/Filtrar

1. Clique em **Pesquisar**
2. Selecione o tipo de filtro (Por ID, Por Nome, etc.)
3. Digite o valor desejado
4. Clique em **Confirmar**
5. O grid será atualizado com os resultados

### Menu SISTEMA

#### **Sobre o Sistema**

- Exibe informações dos autores
- Versão da aplicação

#### **Sair**

- Faz logout e retorna à tela de login

---

## 📋 EXEMPLO DE FLUXO COMPLETO

### Cenário: Monitorar Temperatura de uma Estufa

1. **Criar Tipo de Sensor**
   - Menu: Cadastros > Tipos Sensor
   - Nome: "Temperatura"
   - Unidade: "°C"
   - Status: Ativo
   - **Salvar** e anotar o ID gerado

2. **Criar Sensor Físico**
   - Menu: Cadastros > Sensor
   - Código: "TEMP-ESTUFA-01"
   - ID Tipo Sensor: (usar ID do passo 1)
   - ID Área: "AREA-001"
   - Intervalo: 300 (5 minutos)
   - **Salvar** e anotar o ID

3. **Criar Regra de Alerta**
   - Menu: Cadastros > Regra
   - Nome: "Temperatura Alta Estufa"
   - Limite Min: 18
   - Limite Max: 28
   - Prioridade: Alta
   - ID Tipo Sensor: (do passo 1)
   - **Salvar**

4. **Registrar Leitura**
   - Menu: Cadastros > Leitura
   - ID Sensor: (do passo 2)
   - ID Área: "AREA-001"
   - Valor: 25.5
   - **Salvar**

5. **Consultar Dados**
   - Menu: Consultas > Leituras
   - Clicar em **Pesquisar**
   - Selecionar: "Buscar por Sensor ID"
   - Informar ID do sensor
   - Ver histórico de leituras

---

## 💡 DICAS E RECURSOS

### Botões Principais

| Botão         | Função                |
| ------------- | --------------------- |
| **Salvar**    | Grava os dados na API |
| **Limpar**    | Limpa todos os campos |
| **Fechar**    | Volta à tela anterior |
| **Novo**      | Abre tela de cadastro |
| **Pesquisar** | Abre modal de filtros |

### Status e Prioridades

**Status**: Ativo, Inativo
**Prioridades**: Baixa, Média, Alta

### Validações

- Campos com **\*** são obrigatórios
- E-mails devem ter formato válido
- Números devem ser válidos

### Mensagens

- **Verde**: Operação realizada com sucesso
- **Vermelho**: Erro na operação

---

## 🔧 TROUBLESHOOTING

### Problema: "Erro ao carregar dados"

**Solução**: Verifique se o backend Java está rodando em http://localhost:8080

### Problema: "Credenciais inválidas"

**Solução**: Verifique e-mail e senha. Use o link "Novo usuário" se necessário

### Problema: "Nenhum registro encontrado"

**Solução**:

- Confirme que existem dados cadastrados
- Verifique se o filtro está correto
- Use "Buscar Todos" para ver todos os registros

### Problema: Campos não aparecem

**Solução**: Limpe o cache do navegador (Ctrl+F5)

---

## 📞 ATALHOS DE TECLADO

- **Tab**: Navegar entre campos
- **Enter**: Submeter formulário (Salvar)
- **Esc**: Fechar modais
- **Ctrl+F5**: Recarregar página (limpar cache)

---

## 🎓 CONCEITOS IMPORTANTES

### IDs de Relacionamento

Ao cadastrar, você receberá um **ID único** para cada registro.
Use esses IDs para relacionar entidades:

```
Tipo Sensor (ID: abc123)
    ↓
Sensor (ID: def456, usa ID do Tipo: abc123)
    ↓
Leitura (usa ID do Sensor: def456)
```

### Ordem Sugerida de Cadastro

1. Usuários
2. Tipos de Sensor
3. Sensores
4. Regras
5. Leituras
6. Alertas

---

## ✅ CHECKLIST PÓS-INSTALAÇÃO

- [ ] Backend Java rodando em http://localhost:8080
- [ ] npm install executado com sucesso
- [ ] npm start iniciou sem erros
- [ ] Aplicação acessível em http://localhost:4200
- [ ] Primeiro usuário criado
- [ ] Login realizado com sucesso
- [ ] Menu principal aparecendo
- [ ] Consegue acessar telas de cadastro
- [ ] Consegue acessar telas de consulta

---

## 📚 PRÓXIMOS PASSOS

1. Cadastre tipos de sensores relevantes para seu projeto
2. Configure sensores nas áreas desejadas
3. Defina regras de monitoramento
4. Comece a registrar leituras
5. Monitore alertas gerados

---

**PRONTO PARA USO! 🎉**

Para suporte adicional, consulte o README.md ou PROJETO-COMPLETO.md
