// Mock Data for FluxoSaúde
const unidades = [
    {
        id: 1,
        nome: 'UBS Central',
        endereco: 'Av. Paulista, 1000 - São Paulo, SP',
        lat: -23.5505,
        lng: -46.6333,
        pacientes: 24,
        ocupacao: 65,
        tempoMedio: 28,
        especialidades: ['Consulta Básica', 'Medicação', 'Curativo'],
        telefone: '(11) 3000-0001',
        horario: '07:00 - 18:00'
    },
    {
        id: 2,
        nome: 'UBS Vila Mariana',
        endereco: 'Rua Vergueiro, 500 - São Paulo, SP',
        lat: -23.5651,
        lng: -46.6198,
        pacientes: 12,
        ocupacao: 35,
        tempoMedio: 15,
        especialidades: ['Consulta Básica', 'Curativo'],
        telefone: '(11) 3000-0002',
        horario: '07:00 - 18:00'
    },
    {
        id: 3,
        nome: 'UPA Zona Leste',
        endereco: 'Rua Colégio Militar, 2000 - São Paulo, SP',
        lat: -23.5219,
        lng: -46.4697,
        pacientes: 48,
        ocupacao: 92,
        tempoMedio: 45,
        especialidades: ['Emergência', 'Consulta Básica', 'Medicação'],
        telefone: '(11) 3000-0003',
        horario: '24 horas'
    },
    {
        id: 4,
        nome: 'UBS Jardins',
        endereco: 'Av. Brasil, 3000 - São Paulo, SP',
        lat: -23.5731,
        lng: -46.5849,
        pacientes: 8,
        ocupacao: 20,
        tempoMedio: 10,
        especialidades: ['Consulta Básica', 'Medicação'],
        telefone: '(11) 3000-0004',
        horario: '07:00 - 18:00'
    },
    {
        id: 5,
        nome: 'UPA Centro',
        endereco: 'Pça. da Sé, 1000 - São Paulo, SP',
        lat: -23.5505,
        lng: -46.6361,
        pacientes: 36,
        ocupacao: 78,
        tempoMedio: 35,
        especialidades: ['Emergência', 'Medicação', 'Curativo'],
        telefone: '(11) 3000-0005',
        horario: '24 horas'
    },
    {
        id: 6,
        nome: 'UBS Vila Madalena',
        endereco: 'Rua Mourato Coelho, 1500 - São Paulo, SP',
        lat: -23.5675,
        lng: -46.6889,
        pacientes: 15,
        ocupacao: 42,
        tempoMedio: 18,
        especialidades: ['Consulta Básica', 'Curativo'],
        telefone: '(11) 3000-0006',
        horario: '07:00 - 18:00'
    }
];

const filas = [
    {
        unidadeId: 1,
        especialidade: 'consulta',
        pacientes: 12,
        tempoMedio: 30,
        fila: [
            { posicao: 1, nome: 'Maria Silva', cpf: '123.456.789-01', horario: '14:30' },
            { posicao: 2, nome: 'João Santos', cpf: '234.567.890-12', horario: '14:45' },
            { posicao: 3, nome: 'Ana Costa', cpf: '345.678.901-23', horario: '15:00' }
        ]
    },
    {
        unidadeId: 1,
        especialidade: 'medicacao',
        pacientes: 8,
        tempoMedio: 15,
        fila: [
            { posicao: 1, nome: 'Carlos Oliveira', cpf: '456.789.012-34', horario: '14:15' }
        ]
    },
    {
        unidadeId: 1,
        especialidade: 'curativo',
        pacientes: 4,
        tempoMedio: 20,
        fila: []
    },
    {
        unidadeId: 3,
        especialidade: 'emergencia',
        pacientes: 20,
        tempoMedio: 60,
        fila: []
    }
];

const pacienteEmFila = {
    checkin: false,
    dados: null
};

// Função para obter cores baseado na ocupação
function getOcupacaoColor(ocupacao) {
    if (ocupacao <= 30) return '#4CAF50'; // Verde
    if (ocupacao <= 60) return '#FFC107'; // Amarelo
    return '#FF5722'; // Vermelho
}

// Função para obter badge de ocupação
function getOcupacaoBadge(ocupacao) {
    if (ocupacao <= 30) return { class: 'ocupacao-baixa', text: 'Baixa Ocupação' };
    if (ocupacao <= 60) return { class: 'ocupacao-media', text: 'Média Ocupação' };
    return { class: 'ocupacao-alta', text: 'Alta Ocupação' };
}

// Dados para gráficos
const chartDataFluxo = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
        {
            label: 'Consultas',
            data: [5, 8, 25, 45, 35, 15],
            borderColor: '#2E7D32',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            tension: 0.4
        },
        {
            label: 'Medicação',
            data: [10, 15, 20, 30, 25, 12],
            borderColor: '#1565C0',
            backgroundColor: 'rgba(21, 101, 192, 0.1)',
            tension: 0.4
        },
        {
            label: 'Curativos',
            data: [3, 5, 8, 15, 12, 5],
            borderColor: '#FF6F00',
            backgroundColor: 'rgba(255, 111, 0, 0.1)',
            tension: 0.4
        }
    ]
};

const chartDataEspecialidade = {
    labels: ['Consulta Básica', 'Medicação', 'Curativo', 'Emergência'],
    datasets: [
        {
            label: 'Pacientes por Especialidade',
            data: [35, 28, 15, 22],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800',
                '#F44336'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }
    ]
};

// Função para simular atualização de dados
function updateUnidadesData() {
    unidades.forEach(unidade => {
        // Simular variação de ocupação
        const variacao = (Math.random() - 0.5) * 10;
        unidade.ocupacao = Math.max(5, Math.min(95, unidade.ocupacao + variacao));
        
        // Simular variação de pacientes
        const variacaoPacientes = Math.floor((Math.random() - 0.5) * 5);
        unidade.pacientes = Math.max(0, unidade.pacientes + variacaoPacientes);
        
        // Tempo médio varia com ocupação
        unidade.tempoMedio = Math.round(10 + (unidade.ocupacao / 100) * 50);
    });
}

// Atualizar dados periodicamente
setInterval(updateUnidadesData, 10000);