let chartFluxo = null;
let chartEspecialidade = null;

function initializeDashboard() {
    // Atualizar KPIs
    updateDashboard();
    
    // Inicializar gráficos
    createCharts();
}

function updateDashboard() {
    // Calcular totais
    const totalPacientes = unidades.reduce((sum, u) => sum + u.pacientes, 0);
    const tempoMedioTotal = Math.round(unidades.reduce((sum, u) => sum + u.tempoMedio, 0) / unidades.length);
    const ocupacaoMedia = Math.round(unidades.reduce((sum, u) => sum + u.ocupacao, 0) / unidades.length);
    const unidadesDisponiveis = unidades.length;
    
    // Atualizar elementos
    document.getElementById('total-pacientes').textContent = totalPacientes;
    document.getElementById('tempo-medio').textContent = tempoMedioTotal + ' min';
    document.getElementById('ocupacao-media').textContent = ocupacaoMedia + '%';
    document.getElementById('unidades-disponiveis').textContent = unidadesDisponiveis;
    
    // Preencher opções de unidades
    preencherSelectUnidades();
}

function createCharts() {
    // Gráfico de Fluxo
    const ctxFluxo = document.getElementById('chartFluxo').getContext('2d');
    if (chartFluxo) {
        chartFluxo.destroy();
    }
    chartFluxo = new Chart(ctxFluxo, {
        type: 'line',
        data: chartDataFluxo,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Pacientes'
                    }
                }
            }
        }
    });
    
    // Gráfico de Especialidade
    const ctxEspecialidade = document.getElementById('chartEspecialidade').getContext('2d');
    if (chartEspecialidade) {
        chartEspecialidade.destroy();
    }
    chartEspecialidade = new Chart(ctxEspecialidade, {
        type: 'doughnut',
        data: chartDataEspecialidade,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                }
            }
        }
    });
}

function preencherSelectUnidades() {
    const select = document.getElementById('unidade');
    const currentValue = select.value;
    
    // Preservar opção padrão
    select.innerHTML = '<option value="">-- Escolha uma unidade --</option>';
    
    unidades.forEach(unidade => {
        const option = document.createElement('option');
        option.value = unidade.id;
        option.textContent = `${unidade.nome} (${Math.round(unidade.ocupacao)}% ocupado)`;
        select.appendChild(option);
    });
    
    if (currentValue) {
        select.value = currentValue;
    }
}

// Atualizar dashboard a cada 5 segundos
setInterval(() => {
    updateDashboard();
}, 5000);