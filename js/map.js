let map;
let markers = [];
let userMarker = null;

function initializeMap() {
    // Coordenadas iniciais (São Paulo)
    const inicialLat = -23.5505;
    const inicialLng = -46.6333;
    
    map = L.map('map').setView([inicialLat, inicialLng], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Adicionar marcadores das unidades
    adicionarMarcadores();
}

function adicionarMarcadores() {
    // Limpar marcadores existentes
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    unidades.forEach(unidade => {
        const color = getOcupacaoColor(unidade.ocupacao);
        const html = `
            <div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; border: 3px solid white;">
                ${Math.round(unidade.ocupacao)}%
            </div>
        `;
        
        const icon = L.divIcon({
            html: html,
            iconSize: [30, 30],
            className: 'custom-marker'
        });
        
        const marker = L.marker([unidade.lat, unidade.lng], { icon: icon })
            .addTo(map)
            .bindPopup(criarPopupUnidade(unidade))
            .on('click', () => {
                mostrarDetalhesUnidade(unidade);
            });
        
        markers.push(marker);
    });
}

function criarPopupUnidade(unidade) {
    const badge = getOcupacaoBadge(unidade.ocupacao);
    return `
        <div style="width: 250px;">
            <h4 style="margin: 0 0 10px 0; color: #2E7D32;">${unidade.nome}</h4>
            <div style="margin-bottom: 10px;">
                <span class="${badge.class}" style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${badge.text}</span>
            </div>
            <div style="font-size: 13px; color: #666;">
                <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt"></i> ${unidade.endereco}</p>
                <p style="margin: 5px 0;"><i class="fas fa-users"></i> ${unidade.pacientes} pacientes na fila</p>
                <p style="margin: 5px 0;"><i class="fas fa-clock"></i> Espera: ~${unidade.tempoMedio} min</p>
                <p style="margin: 5px 0;"><i class="fas fa-phone"></i> ${unidade.telefone}</p>
            </div>
            <button onclick="selecionarUnidade(${unidade.id})" style="background: #2E7D32; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 10px; width: 100%; font-weight: 600;">Selecionar</button>
        </div>
    `;
}

function mostrarDetalhesUnidade(unidade) {
    console.log('Detalhes da unidade:', unidade);
}

function selecionarUnidade(unidadeId) {
    const unidade = unidades.find(u => u.id === unidadeId);
    if (unidade) {
        document.getElementById('unidade').value = unidadeId;
        window.scrollTo({ top: document.getElementById('fila').offsetTop - 80, behavior: 'smooth' });
    }
}

// Atualizar mapa com dados em tempo real
function atualizarMapa() {
    adicionarMarcadores();
    atualizarListaUnidades();
}

function atualizarListaUnidades() {
    const container = document.getElementById('unidades-container');
    container.innerHTML = '';
    
    // Ordenar unidades por ocupação (menor primeiro)
    const unidadesOrdenadas = [...unidades].sort((a, b) => a.ocupacao - b.ocupacao);
    
    unidadesOrdenadas.forEach(unidade => {
        const badge = getOcupacaoBadge(unidade.ocupacao);
        const card = document.createElement('div');
        card.className = 'unidade-card';
        card.innerHTML = `
            <div class="unidade-header">
                <div class="unidade-nome">${unidade.nome}</div>
                <span class="ocupacao-badge ${badge.class}">${Math.round(unidade.ocupacao)}%</span>
            </div>
            <div class="unidade-info">
                <div class="unidade-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${unidade.endereco}</span>
                </div>
                <div class="unidade-info-item">
                    <i class="fas fa-users"></i>
                    <span>${unidade.pacientes} pacientes na fila</span>
                </div>
                <div class="unidade-info-item">
                    <i class="fas fa-clock"></i>
                    <span>Tempo médio: ${unidade.tempoMedio} minutos</span>
                </div>
                <div class="unidade-info-item">
                    <i class="fas fa-phone"></i>
                    <span>${unidade.telefone}</span>
                </div>
                <div class="unidade-info-item">
                    <i class="fas fa-clock"></i>
                    <span>Horário: ${unidade.horario}</span>
                </div>
            </div>
            <button onclick="selecionarUnidade(${unidade.id})" style="width: 100%; padding: 10px; background: #2E7D32; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; font-weight: 600;">Selecionar Unidade</button>
        `;
        container.appendChild(card);
    });
}

// Atualizar mapa a cada 10 segundos
setInterval(() => {
    if (map) {
        atualizarMapa();
    }
}, 10000);