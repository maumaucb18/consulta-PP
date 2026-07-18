// main.js — Arquivo unificado: carregamento de dados, busca, filtros e renderização
let produtosONU = [];
let resultadosAtual = [];

const dadosFiscalizacao = {
    "1": { classe: "1", titulo: "Explosivos", risco: "Explosão em massa, projeção ou incêndio violento. Sensível a choque e calor.", sinalizacao: "Rótulo de risco fundo laranja com ícone de bomba explodindo.", epi: "Capacete, luvas de couro, botas de segurança e colete de segurança refletivo.", epi_especifico: "Vestimenta de algodão ou material antiestático (proibido o uso de tecidos sintéticos que gerem centelhas por atrito).", foco_agente: "Verificar se o condutor não está vestindo roupas 100% poliéster ou similares na cabine.", infracao: "Falta de certificado de capacitação do condutor (MOPP) ou veículo sem simbologia correta.", atencao: "Verificar validade do extintor e presença de calços. Proibido fumar próximo.", documentacao: "Documento Fiscal com declaração do expedidor, Certificado MOPP, Ficha de Emergência." },
    "2": { classe: "2", titulo: "Gases", risco: "Asfixia, inflamabilidade ou toxicidade. Risco de explosão por pressão.", sinalizacao: "Rótulo Vermelho (Inflamáveis), Verde (Não inflamáveis) ou Branco (Tóxicos).", epi: "Capacete, luvas de PVC/Couro, óculos de segurança (ampla visão), botas e colete refletivo.", epi_especifico: "Subclasse 2.3: Máscara Facial Inteira (Full Face) com filtro para gases/vapores tóxicos; gases liquefeitos refrigerados: luvas térmicas de criogenia.", foco_agente: "Verificar se o equipamento respiratório é adequado para o tipo de gás e se as válvulas estão protegidas.", infracao: "Vazamento em válvulas ou cilindros sem proteção de calota.", atencao: "Gases inflamáveis exigem lanterna intrinsecamente segura (antiexplosão).", documentacao: "Documento Fiscal, MOPP, Guia de Trânsito (se aplicável), Ficha de Emergência." },
    "3": { classe: "3", titulo: "Líquidos Inflamáveis", risco: "Combustão fácil. Vapores podem formar misturas explosivas com o ar.", sinalizacao: "Rótulo de risco fundo vermelho com ícone de chama preta ou branca.", epi: "Capacete, luvas resistentes a produtos químicos (PVC/Nitrílica), óculos de segurança, botas e colete refletivo.", epi_especifico: "Luvas de proteção química (Nitrílica ou PVC de cano médio) + Máscara com filtro para Vapores Orgânicos (VO).", foco_agente: "Verificar se o filtro da máscara está dentro da validade e se é da cor correta (tarja marrom para vapores orgânicos).", infracao: "Transporte de inflamáveis com outros produtos incompatíveis ou falta de aterramento.", atencao: "Documento fiscal deve constar o Ponto de Fulgor para alguns produtos.", documentacao: "Documento Fiscal com Ponto de Fulgor, MOPP, Certificado de Aterramento, Ficha de Emergência." },
    "4": { classe: "4", titulo: "Sólidos Inflamáveis", risco: "Combustão espontânea ou reação com água liberando gases inflamáveis.", sinalizacao: "Rótulo listrado (4.1), metade branco/vermelho (4.2) ou azul (4.3).", epi: "Capacete, luvas de proteção, óculos de segurança, botas e colete refletivo.", epi_especifico: "Máscara com filtro mecânico para poeiras e partículas classe PFF2 ou PFF3.", foco_agente: "Em produtos que reagem com água (Subclasse 4.3), as luvas e roupas devem estar totalmente secas no momento da inspeção.", infracao: "Embalagens avariadas com exposição do produto à umidade (especialmente 4.3).", atencao: "Classe 4.3 reage violentamente com água. Não use água em caso de vazamento.", documentacao: "Documento Fiscal, MOPP, Inspeção de embalagens, Ficha de Emergência." },
    "5": { classe: "5", titulo: "Oxidantes e Peróxidos", risco: "Podem causar ou contribuir para a combustão de outros materiais.", sinalizacao: "Rótulo fundo amarelo com ícone de chama sobre núcleo.", epi: "Capacete, luvas de PVC, óculos de segurança (ampla visão), botas e colete refletivo.", epi_especifico: "Avental de proteção química impermeável + calçado de segurança impermeável (botas de PVC/borracha).", foco_agente: "O material das luvas e avental não pode ser orgânico (como couro), pois reage violentamente com oxidantes.", infracao: "Incompatibilidade: Oxidantes não podem ser transportados com combustíveis/inflamáveis.", atencao: "Peróxidos orgânicos (5.2) podem ser termicamente instáveis e explosivos.", documentacao: "Documento Fiscal com compatibilidade, MOPP, Certificado de segregação, Ficha de Emergência." },
    "6": { classe: "6", titulo: "Tóxicos e Infectantes", risco: "Danos à saúde por inalação, contato ou ingestão. Risco biológico (6.2).", sinalizacao: "Rótulo fundo branco com ícone de caveira (6.1) ou três crescentes (6.2).", epi: "Capacete, luvas de borracha/nitrílica, óculos de segurança, botas, colete e máscara com filtro adequado.", epi_especifico: "6.1: Máscara Facial Inteira (Full Face) com filtro químico+mecânico + Macacão de proteção química tipo 4/5/6. 6.2: Máscara N95/PFF2, luvas cirúrgicas/nitrílicas e avental impermeável.", foco_agente: "Verificar se o tipo de máscara está adequado à subclasse e se o macacão está íntegro.", infracao: "Transporte de tóxicos junto com alimentos, rações ou medicamentos.", atencao: "Exige kit de primeiros socorros específico e ficha de emergência legível.", documentacao: "Documento Fiscal, MOPP, Kit de Primeiros Socorros, Ficha de Emergência, Envelope de Emergência." },
    "7": { classe: "7", titulo: "Radioativos", risco: "Emissão de radiação ionizante. Danos celulares invisíveis.", sinalizacao: "Rótulo fundo branco ou amarelo/branco com ícone de trifólio.", epi: "Capacete, luvas, botas, colete e dosímetro (conforme orientação do supervisor radiológico).", epi_especifico: "Dosímetro individual de leitura direta + Vestimentas em conformidade com o Plano de Radioproteção da CNEN.", foco_agente: "Verificar a presença do dosímetro e se o veículo possui o monitor de taxa de dose ativo.", infracao: "Veículo sem blindagem necessária ou ausência de monitoração de radiação.", atencao: "Distância é a melhor proteção. Seguir rigorosamente o plano de emergência.", documentacao: "Documento Fiscal com certificado de origem, MOPP, Certificado de Blindagem, Dosímetro, Plano de Emergência." },
    "8": { classe: "8", titulo: "Corrosivos", risco: "Causa severas queimaduras na pele e danos a metais e tecidos.", sinalizacao: "Rótulo metade branco/preto com ícone de tubos de ensaio derramando.", epi: "Capacete, luvas de PVC cano longo, avental impermeável, óculos de segurança (ampla visão), botas e colete.", epi_especifico: "Avental de proteção química (PVC ou tirante) + Botas de borracha ou PVC de cano longo + Luvas de PVC de cano longo + Protetor facial contra respingos.", foco_agente: "Inspeção visual de rasgos ou ressecamento nas botas e luvas; a ausência do avental ou bota de PVC nesta classe configura infração direta da norma.", infracao: "Falta de kit de neutralização ou embalagens sem rótulo de segurança.", atencao: "Em caso de contato, lavar com água corrente em abundância por 15 min.", documentacao: "Documento Fiscal, MOPP, Kit de Neutralização, Ficha de Emergência, Envelope de Emergência." },
    "9": { classe: "9", titulo: "Perigosos Diversos", risco: "Riscos variados não abrangidos pelas outras classes (ex: baterias de lítio, asfalto quente).", sinalizacao: "Rótulo com listras pretas verticais na metade superior.", epi: "Capacete, luvas de proteção, óculos de segurança, botas e colete refletivo.", epi_especifico: "Kit mínimo obrigatório.", foco_agente: "O agente deve cruzar a informação com o Número ONU específico descrito na Ficha de Emergência.", infracao: "Transporte de substâncias perigosas para o meio ambiente sem a marca correspondente.", atencao: "Verificar se o produto exige controle de temperatura.", documentacao: "Documento Fiscal, MOPP, Certificado de Controle de Temperatura (se aplicável), Ficha de Emergência." }
};

const epiMinimo = `- Capacete de Segurança: Tipo aba frontal, com carneira e jugular.
- Óculos de Segurança: Modelo contra respingos, com vedação total (estilo ampla-visão).
- Luvas de Proteção: Tipo impermeável, de material compatível com o produto (PVC, nitrílica ou neoprene).
- Equipamento de Proteção Respiratória: Máscara facial inteira ou semi-facial, dotada de filtro químico/mecânico específico para o risco do produto carregado.
- Traje Mínimo Obrigatório: Calça comprida, camisa de manga (curta ou comprida) e calçado fechado (não substitui o EPI específico de proteção para os pés, se exigido).`;

const checklistDeCampo = [
    "Validade do CA: Todos os EPIs apresentados possuem o número do Certificado de Aprovação (CA) gravado e válido?",
    "Acessibilidade: Os EPIs estão guardados dentro da cabine (e não trancados no baú ou na caixa de ferramentas externa)?",
    "Estado de Conservação: As máscaras possuem os filtros lacrados/válidos e as luvas estão sem furos?"
];

async function carregarDados() {
    try {
        const res = await fetch('./Relacao_de_Produtos_Perigosos.json');
        if (!res.ok) throw new Error('Falha ao carregar JSON');
        produtosONU = await res.json();
        initFilters();
        console.log(`Produtos carregados: ${produtosONU.length}`);
    } catch (e) {
        console.error(e);
        mostrarErro('Erro ao carregar banco de dados.');
    }
}

function initFilters() {
    // Popula select de classes (1..9)
    const selClasse = document.getElementById('filter-classe');
    if (selClasse) {
        selClasse.innerHTML = '<option value="">Todas as classes</option>' +
            Array.from({length:9}, (_,i) => `<option value="${i+1}">${i+1}</option>`).join('');
        selClasse.addEventListener('change', searchData);
    }

    // Popula select de grupo de embalagem dinamicamente
    const selGrupo = document.getElementById('filter-grupo');
    if (selGrupo) {
        const grupos = new Set(produtosONU.map(p => (p['Grupo de Emb. (6)'] || '').toString().trim()).filter(Boolean));
        selGrupo.innerHTML = '<option value="">Todos os grupos</option>' + Array.from(grupos).map(g => `<option value="${g}">${g}</option>`).join('');
        selGrupo.addEventListener('change', searchData);
    }

    // input search
    const input = document.getElementById('search-input');
    if (input) input.addEventListener('input', () => { input.value = input.value.toUpperCase(); searchData(); });

    // sort select
    const selSort = document.getElementById('sort-by');
    if (selSort) selSort.addEventListener('change', () => { sortResults(); renderCurrentResults(); });

    // export CSV
    const btnExport = document.getElementById('export-csv');
    if (btnExport) btnExport.addEventListener('click', exportCSV);
}

function searchData() {
    const input = document.getElementById('search-input')?.value.trim().toUpperCase() || '';
    const classeFilter = document.getElementById('filter-classe')?.value || '';
    const grupoFilter = document.getElementById('filter-grupo')?.value || '';

    if (!input && !classeFilter && !grupoFilter) {
        document.getElementById('results').innerHTML = '';
        return;
    }

    resultadosAtual = produtosONU.filter(produto => {
        const onu = (produto['Nº ONU (1)'] || '').toString().toUpperCase();
        const nome = (produto['Nome e Descrição (2)'] || '').toString().toUpperCase();
        const classe = (produto['Classe ou Subclasse de Risco (3)'] || '').toString();
        const grupo = (produto['Grupo de Emb. (6)'] || '').toString();

        const matchesQuery = input ? (onu.includes(input) || nome.includes(input)) : true;
        const matchesClasse = classeFilter ? classe.startsWith(classeFilter) : true;
        const matchesGrupo = grupoFilter ? grupo === grupoFilter : true;

        return matchesQuery && matchesClasse && matchesGrupo;
    });

    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;

    if (resultadosAtual.length === 0) {
        resultsContainer.innerHTML = `<div class="no-results"><span class="no-results-icon">🔍</span><div class="no-results-title">Nenhum produto encontrado</div><div class="no-results-subtitle">Tente outro termo de pesquisa ou ajuste os filtros.</div></div>`;
        return;
    }

    // aplica ordenação selecionada antes de renderizar
    sortResults();
    resultsContainer.innerHTML = resultadosAtual.map((p,i) => renderizarCartao(p,i)).join('');
}

function sortResults() {
    const sel = document.getElementById('sort-by');
    if (!sel || !resultadosAtual || resultadosAtual.length === 0) return;
    const v = sel.value;
    if (!v) return;

    if (v === 'onu-asc' || v === 'onu-desc') {
        resultadosAtual.sort((a,b) => {
            const na = parseInt((a['Nº ONU (1)'] || '').toString().replace(/[^0-9]/g,'')) || 0;
            const nb = parseInt((b['Nº ONU (1)'] || '').toString().replace(/[^0-9]/g,'')) || 0;
            return v === 'onu-asc' ? na - nb : nb - na;
        });
    } else if (v === 'nome-asc' || v === 'nome-desc') {
        resultadosAtual.sort((a,b) => {
            const na = (a['Nome e Descrição (2)'] || '').toString().localeCompare((b['Nome e Descrição (2)'] || '').toString(), 'pt-BR', {sensitivity:'base'});
            return v === 'nome-asc' ? na : -na;
        });
    }
}

function renderCurrentResults() {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;
    resultsContainer.innerHTML = resultadosAtual.map((p,i) => renderizarCartao(p,i)).join('');
}

function exportCSV() {
    if (!resultadosAtual || resultadosAtual.length === 0) {
        alert('Nenhum resultado para exportar');
        return;
    }
    const keys = Object.keys(resultadosAtual[0]);
    const rows = resultadosAtual.map(r => keys.map(k => `"${(r[k]||'').toString().replace(/"/g,'""')}"`).join(','));
    const csv = [keys.map(k=>`"${k.replace(/"/g,'""')}"`).join(','), ...rows].join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_produtos.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function renderizarCartao(produto, index) {
    const onu = produto['Nº ONU (1)'] || 'N/A';
    const nome = produto['Nome e Descrição (2)'] || 'Sem descrição';
    const classe = produto['Classe ou Subclasse de Risco (3)'] || 'N/A';
    const riscoPrincipal = (classe || '0').toString().charAt(0);
    const fiscal = dadosFiscalizacao[riscoPrincipal] || {};
    const ca = getCANumber(produto);
    const caLink = ca ? `<div class="card-section"><div class="section-title">🔎 Consulta CA</div><div class="section-content"><a class="btn-consultaca" href="https://consultaca.com/${encodeURIComponent(ca)}" target="_blank" rel="noopener noreferrer">Abrir CA ${ca} no ConsultaCA</a></div></div>` : '';

    const emojis = {"1":"💣","2":"🔴","3":"🔥","4":"⚡","5":"☢️","6":"☠️","7":"☢️","8":"⚠️","9":"⚠️"};
    const emoji = emojis[riscoPrincipal] || '📦';

    return `
        <div class="product-card" data-index="${index}">
            <div class="card-header">
                <div class="card-titles"><h2>${emoji} ${nome}</h2><p><strong>Classe:</strong> ${classe}</p></div>
                <div><span class="badge-onu">ONU ${onu}</span><span class="badge-classe">CL ${riscoPrincipal}</span></div>
            </div>
            <div class="card-body">
                <div class="card-section"><div class="section-title">⚠️ Risco Principal</div><div class="section-content">${fiscal.risco || 'Consulte a FISPQ'}</div></div>
                <div class="card-section"><div class="section-title">🔗 Risco Subsidiário</div><div class="section-content">${produto['Risco Subsi- diário (4)'] || 'Nenhum'}</div></div>
                <div class="card-section"><div class="section-title">🖼️ Sinalização</div><div class="section-content">${fiscal.sinalizacao || 'Consulte a FISPQ'}</div></div>
                <div class="card-section"><div class="section-title">🛡️ EPI Mínimo Obrigatório</div><div class="section-content"><pre style="white-space:pre-wrap;margin:0;">${epiMinimo}</pre></div></div>
                <div class="card-section"><div class="section-title">🦺 EPI Obrigatório</div><div class="section-content">${fiscal.epi || 'Consulte a FISPQ'}</div></div>
                <div class="card-section"><div class="section-title">🔍 EPI Específico</div><div class="section-content">${fiscal.epi_especifico || 'Consulte a FISPQ'}</div></div>
                <div class="card-section danger"><div class="section-title">🚨 Foco do Agente</div><div class="section-content">${fiscal.foco_agente || 'Verificar conformidade com normas'}</div></div>
                <div class="card-section info"><div class="section-title">💡 Checklist de Fiscalização</div><div class="section-content"><ul style="padding-left:1.1rem; margin:0;">${checklistDeCampo.map(item => `<li>${item}</li>`).join('')}</ul></div></div>
                <div class="card-section info"><div class="section-title">💡 Dica de Campo</div><div class="section-content">${fiscal.atencao || 'Sempre consultar a FISPQ'}</div></div>
                <div class="card-section"><div class="section-title">📊 Dados Adicionais</div><div class="section-content"><strong>Nº de Risco:</strong> ${produto['Nº de Risco (5)'] || 'N/A'}<br><strong>Grupo de Embalagem:</strong> ${produto['Grupo de Emb. (6)'] || 'N/A'}<br><strong>Quantidade Limitada:</strong> ${produto['Quant. Limitada por Veículo (kg) (8)'] || 'N/A'} kg</div></div>
                ${caLink}
                <div style="margin-top:8px;"><button class="btn-copy" data-idx="${index}">Copiar Nome/ONU</button></div>
            </div>
        </div>
    `;
}

// evento global para copiar
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.btn-copy')) {
        const idx = e.target.getAttribute('data-idx');
        const p = resultadosAtual[idx];
        if (!p) return;
        const text = `${p['Nº ONU (1)'] || ''} - ${p['Nome e Descrição (2)'] || ''}`;
        navigator.clipboard?.writeText(text).then(() => {
            const btn = e.target; btn.textContent = 'Copiado ✓'; setTimeout(()=>btn.textContent='Copiar Nome/ONU',1500);
        }).catch(()=>{ e.target.textContent = 'Erro'; setTimeout(()=>e.target.textContent='Copiar Nome/ONU',1500); });
    }
});

function mostrarErro(msg) { document.getElementById('results').innerHTML = `<div class="no-results"><div class="no-results-title">Erro</div><p>${msg}</p></div>`; }
function getCANumber(produto) {
    // Verifica várias chaves possíveis que podem conter o número do CA
    const keys = Object.keys(produto || {});
    const possibles = ['CA', 'N° CA', 'Nº CA', 'Numero CA', 'Número CA', 'CA (1)', 'CA (x)', 'CA (n)'];
    for (const k of possibles) {
        if (keys.includes(k) && produto[k]) return String(produto[k]).trim();
    }
    // heurística: procura valores numéricos curtos em todas as chaves
    for (const k of keys) {
        const v = String(produto[k] || '').trim();
        if (/^\d{4,6}$/.test(v)) return v; // CA geralmente tem 4-6 dígitos
    }
    return null;
}

window.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});
