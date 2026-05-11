# FluxoSaúde - Plataforma de Gestão de Filas para Saúde Pública

## 📋 Visão Geral

FluxoSaúde é uma plataforma web operacional de transformação digital para otimizar o atendimento em Unidades Básicas de Saúde (UBSs) e Unidades de Pronto Atendimento (UPAs) através de:

- **Fila Virtual Personalizada**: Check-in digital remoto com notificações em tempo real
- **Geofencing Inteligente**: Sincronização automática da posição do paciente com o fluxo de atendimento
- **Mapa de Calor da Rede**: Visualização de ocupação e distribuição de carga
- **Dashboard Operacional**: Métricas em tempo real para gestores
- **Inteligência de Dados**: Algoritmo de predição de tempos de espera

## 🎯 Objetivos do MVP

1. **Reduzir tempo de permanência física** em salas de espera (meta: 70%)
2. **Melhorar previsibilidade** do atendimento
3. **Aumentar segurança sanitária** dos pacientes
4. **Otimizar fluxo operacional** das unidades
5. **Fornecer inteligência** para gestores

## 🏗️ Estrutura do Projeto

```
FluxoSaude/
├── index.html                 # Página principal
├── css/
│   └── style.css             # Estilos responsivos
├── js/
│   ├── main.js              # Script principal
│   ├── data.js              # Dados mock e helpers
│   ├── map.js               # Integração com Leaflet
│   ├── dashboard.js         # Dashboard com Chart.js
│   └── fila.js              # Lógica de fila virtual
├── README.md                 # Este arquivo
└── LICENSE                   # Licença
```

## 🚀 Como Executar

### Opção 1: Localmente com Live Server

1. Clone o repositório:
```bash
git clone https://github.com/Claudio61455226/FluxoSaude.git
cd FluxoSaude
```

2. Abra com um servidor local (VS Code Live Server):
```bash
code .
# Clique com direito em index.html > Open with Live Server
```

3. Acesse em seu navegador: `http://localhost:5500`

### Opção 2: GitHub Pages

1. Vá para Settings > Pages
2. Selecione "Deploy from a branch"
3. Escolha a branch "main"
4. Acesse: `https://claudio61455226.github.io/FluxoSaude`

## 📱 Funcionalidades

### 1. Dashboard Operacional
- KPIs em tempo real:
  - Total de pacientes na rede
  - Tempo médio de espera
  - Ocupação média
  - Unidades disponíveis
- Gráficos:
  - Fluxo de atendimentos (últimas 24h)
  - Distribuição por especialidade

### 2. Mapa de Calor
- Visualização de todas as unidades com código de cores:
  - 🟢 Verde: Baixa Ocupação (0-30%)
  - 🟡 Amarelo: Média Ocupação (31-60%)
  - 🔴 Vermelho: Alta Ocupação (61-100%)
- Click nos marcadores para mais informações
- Lista de unidades próximas ordenadas por ocupação

### 3. Fila Virtual
- Check-in digital com:
  - Seleção de unidade
  - Tipo de atendimento (Consulta, Medicação, Curativo, Emergência)
  - Dados do paciente (Nome, CPF)
- Status em tempo real:
  - ID do paciente
  - Posição na fila
  - Tempo estimado de espera
  - Status (Na fila / Próximo!)

### 4. Sistema de Notificações
- Alertas em tempo real quando próximo do atendimento
- Geofencing automático
- Inteligência preditiva com ML
- Segurança de dados criptografados

## 🎨 Design e UX

- **Responsivo**: Funciona em desktop, tablet e mobile
- **Acessível**: Interface com alta legibilidade para população idosa
- **Intuitivo**: Poucos cliques para operações principais
- **Inclusivo**: Compatível com leitores de tela

## 📊 Dados Mock

O sistema utiliza dados simulados de 6 unidades na região de São Paulo:

1. **UBS Central** - Av. Paulista, 1000
2. **UBS Vila Mariana** - Rua Vergueiro, 500
3. **UPA Zona Leste** - Rua Colégio Militar, 2000
4. **UBS Jardins** - Av. Brasil, 3000
5. **UPA Centro** - Pça. da Sé, 1000
6. **UBS Vila Madalena** - Rua Mourato Coelho, 1500

Os dados são atualizados simulando operação em tempo real a cada 5-10 segundos.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - HTML5 / CSS3
  - JavaScript (Vanilla)
  - Leaflet.js (Mapas)
  - Chart.js (Gráficos)
  - Font Awesome (Ícones)

- **Recursos**:
  - OpenStreetMap (Mapas)
  - CSS Grid e Flexbox (Layout)
  - Animações CSS

## 📈 KPIs Principais

| Métrica | Alvo | Status |
|---------|------|--------|
| Redução tempo permanência | -70% | 📊 Mensurável |
| Taxa de utilização app | >60% | 📊 A medir |
| Satisfação pacientes | >85% | 📊 A medir |
| Uptime do sistema | >99.5% | 🎯 Esperado |

## 🔒 Segurança

- Dados de pacientes armazenados localmente (localStorage)
- Compatível com LGPD e regulamentações de saúde
- Criptografia de dados em trânsito (HTTPS)

## 📞 Contato

- **Email**: contato@fluxosaude.gov.br
- **Telefone**: +55 (11) 3000-0000
- **Endereço**: São Paulo, SP - Brasil

## 📄 Licença

Este projeto está sob a licença MIT. Veja LICENSE para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

## 📝 Notas

- Este é um MVP (Mínimo Produto Viável) para demonstração
- Dados são simulados para fins de prototipagem
- Próximas fases incluirão integração com APIs reais (e-SUS)
- Backend em desenvolvimento com WebSockets para comunicação full-duplex

---

**FluxoSaúde**: Transformando a experiência de atendimento na saúde pública 🏥✨