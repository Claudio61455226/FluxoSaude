function initializeFila() {
    const form = document.getElementById('formCheckin');
    if (form) {
        form.addEventListener('submit', handleCheckin);
    }
}

function handleCheckin(e) {
    e.preventDefault();
    
    const unidadeId = document.getElementById('unidade').value;
    const especialidade = document.getElementById('especialidade').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    
    if (!unidadeId || !especialidade || !nome || !cpf) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    // Simular check-in
    const unidade = unidades.find(u => u.id == unidadeId);
    if (unidade) {
        pacienteEmFila.checkin = true;
        pacienteEmFila.dados = {
            id: Math.floor(Math.random() * 10000),
            nome: nome,
            cpf: cpf,
            unidade: unidade.nome,
            unidadeId: unidadeId,
            especialidade: especialidade,
            horarioCheckin: new Date().toLocaleTimeString('pt-BR'),
            posicao: Math.floor(Math.random() * 10) + 1,
            tempoEsperado: Math.round(Math.random() * 45) + 10,
            status: 'Na fila'
        };
        
        // Incrementar pacientes da unidade
        unidade.pacientes += 1;
        
        mostrarStatusFila();
        
        // Mostrar notificação
        alert(`Check-in realizado com sucesso!\nVocê é o paciente #${pacienteEmFila.dados.id}\nTempo estimado: ${pacienteEmFila.dados.tempoEsperado} minutos`);
        
        // Limpar formulário
        document.getElementById('formCheckin').reset();
    }
}

function mostrarStatusFila() {
    const container = document.getElementById('status-container');
    
    if (!pacienteEmFila.checkin) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 3rem 1rem;">Faça o check-in para ver sua posição na fila</p>';
        container.className = 'status-empty';
        return;
    }
    
    const dados = pacienteEmFila.dados;
    const unidade = unidades.find(u => u.id == dados.unidadeId);
    
    // Simular mudanças na fila
    if (Math.random() > 0.7) {
        dados.posicao = Math.max(1, dados.posicao - 1);
    }
    
    // Determinar cor do status
    let statusColor = '#4CAF50';
    let statusIcon = 'fas fa-check-circle';
    
    if (dados.posicao <= 2) {
        dados.status = 'Próximo!';
        statusColor = '#FF9800';
        statusIcon = 'fas fa-exclamation-circle';
    } else if (dados.posicao <= 5) {
        dados.status = 'Na fila';
        statusColor = '#2196F3';
        statusIcon = 'fas fa-hourglass-half';
    }
    
    const html = `
        <div class="status-card">
            <div class="status-item">
                <span class="status-label">ID do Paciente:</span>
                <span class="status-value">#${dados.id}</span>
            </div>
            <div class="status-item">
                <span class="status-label">Paciente:</span>
                <span class="status-value">${dados.nome}</span>
            </div>
            <div class="status-item">
                <span class="status-label">Unidade:</span>
                <span class="status-value">${dados.unidade}</span>
            </div>
            <div class="status-item">
                <span class="status-label">Atendimento:</span>
                <span class="status-value">${dados.especialidade}</span>
            </div>
            <div class="status-item">
                <span class="status-label">Posição na Fila:</span>
                <span class="status-value" style="color: #FFD700;">#${dados.posicao}º</span>
            </div>
            <div class="status-item">
                <span class="status-label">Tempo Estimado:</span>
                <span class="status-value">${dados.tempoEsperado} min</span>
            </div>
            <div class="status-item">
                <span class="status-label">Check-in realizado em:</span>
                <span class="status-value">${dados.horarioCheckin}</span>
            </div>
            <div class="status-item">
                <span class="status-label">Status:</span>
                <span class="status-value" style="color: ${statusColor};"><i class="${statusIcon}"></i> ${dados.status}</span>
            </div>
        </div>
        
        <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
            <h4 style="color: #2E7D32; margin-bottom: 1rem;">⏰ Informações em Tempo Real</h4>
            <div style="font-size: 0.9rem; color: #666; line-height: 1.8;">
                <p><i class="fas fa-info-circle" style="color: #2E7D32;"></i> Sua posição será atualizada a cada 2 minutos</p>
                <p><i class="fas fa-bell" style="color: #FF9800;"></i> Você receberá uma notificação quando estiver próximo</p>
                <p><i class="fas fa-map-marker-alt" style="color: #2196F3;"></i> Geofencing ativo - o sistema detectará sua proximidade</p>
                <p><i class="fas fa-check" style="color: #4CAF50;"></i> Ocupação atual da unidade: ${Math.round(unidade.ocupacao)}%</p>
            </div>
        </div>
        
        <button onclick="cancelarCheckin()" style="width: 100%; padding: 10px; background: #D32F2F; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 1.5rem; font-weight: 600;">Cancelar Check-in</button>
    `;
    
    container.innerHTML = html;
    container.className = '';
}

function cancelarCheckin() {
    if (confirm('Tem certeza que deseja cancelar o check-in?')) {
        pacienteEmFila.checkin = false;
        pacienteEmFila.dados = null;
        const container = document.getElementById('status-container');
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 3rem 1rem;">Faça o check-in para ver sua posição na fila</p>';
        container.className = 'status-empty';
        alert('Check-in cancelado');
    }
}

// Atualizar status da fila a cada 2 segundos
setInterval(() => {
    if (pacienteEmFila.checkin) {
        mostrarStatusFila();
    }
}, 2000);