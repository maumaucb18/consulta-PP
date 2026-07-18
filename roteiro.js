// Banco de Dados das Infrações
const baseInfracoes = [
    {
        categoria: "Documental (Seção IV)",
        itens: [
            { desc: "Documento de transporte incompleto/ilegível", art: "Art. 22 / Art. 24", resp: "Ambos" },
            { desc: "Certificado de Inspeção (CIPP/CIV) vencido ou ausente", art: "Art. 24, Inciso II", resp: "Transportador" },
            { desc: "Declaração do Expedidor irregular/ausente", art: "Art. 22, Inciso I", resp: "Expedidor" }
        ]
    },
    {
        categoria: "Veículo e Sinalização (Seção I)",
        itens: [
            { desc: "Sinalização (Painéis/Rótulos) ausente ou incorreta", art: "Art. 4º / Art. 22", resp: "Ambos" },
            { desc: "Falta de Equipamentos de Emergência (NBR 9735)", art: "Art. 4º, Inciso I", resp: "Transportador" },
            { desc: "Veículo em mau estado de conservação", art: "Art. 4º, Inciso I", resp: "Transportador" }
        ]
    },
    {
        categoria: "Carga e Pessoal (Seção II e III)",
        itens: [
            { desc: "Carga mal acondicionada/vazando", art: "Art. 22, Inciso IV", resp: "Expedidor" },
            { desc: "Condutor sem curso MOPP registrado", art: "Art. 20 / Art. 24", resp: "Transportador" },
            { desc: "Condutor sem EPIs adequados", art: "Art. 24, Inciso I", resp: "Transportador" }
        ]
    }
];

// 1. Gera o checklist dinamicamente ao abrir a página
function carregarChecklist() {
    const container = document.getElementById('app-checklist');
    
    baseInfracoes.forEach(cat => {
        let section = document.createElement('section');
        section.className = 'card';
        
        let html = `<h2>${cat.categoria}</h2>`;
        
        cat.itens.forEach((item, index) => {
            html += `
                <div class="item">
                    <input type="checkbox" class="fiscal-check" 
                        data-desc="${item.desc}" 
                        data-art="${item.art}" 
                        data-resp="${item.resp}">
                    <label>${item.desc}</label>
                </div>`;
        });
        
        section.innerHTML = html;
        container.appendChild(section);
    });
}

// 2. Coleta os itens marcados e gera o enquadramento
function gerarRelatorio() {
    const marcados = document.querySelectorAll('.fiscal-check:checked');
    const lista = document.getElementById('lista-infracoes');
    const modal = document.getElementById('resultado');

    if (marcados.length === 0) {
        alert("⚠️ Selecione ao menos uma infração.");
        return;
    }

    lista.innerHTML = ""; // Limpa relatório anterior

    marcados.forEach(item => {
        const box = document.createElement('div');
        box.className = 'infracao-box';
        box.innerHTML = `
            <p><strong>🚨 Irregularidade:</strong> ${item.dataset.desc}</p>
            <p><strong>⚖️ Enquadramento:</strong> ${item.dataset.art}</p>
            <p><strong>👤 Resp:</strong> <span class="badge">${item.dataset.resp}</span></p>
        `;
        lista.appendChild(box);
    });

    modal.classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('resultado').classList.add('hidden');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarChecklist();
    document.getElementById('btn-gerar').addEventListener('click', gerarRelatorio);
});
