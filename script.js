let data = [];

// Função para carregar o CSV
function loadCSV() {
  fetch('relacao_produtos_perigosos.csv')  // Carregar o CSV da raiz do projeto
    .then(response => response.text())  // Obtém o conteúdo do arquivo como texto
    .then(csv => {
      parseCSV(csv);  // Chama a função para fazer o parsing do CSV
    })
    .catch(error => console.error('Erro ao carregar o CSV:', error));
}

// Função para fazer o parsing do CSV usando PapaParse
function parseCSV(csv) {
  Papa.parse(csv, {
    header: true,  // Usa a primeira linha como cabeçalho
    skipEmptyLines: true,  // Ignora linhas vazias
    complete: function(results) {
      console.log("CSV carregado com sucesso:", results);  // Verifica os dados carregados
      data = results.data;  // Salva os dados no array global
    }
  });
}

// Função para exibir os resultados da pesquisa
function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";  // Limpar resultados anteriores

  if (results.length > 0) {
    results.forEach(item => {
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion");

      // Cabeçalho do accordion
      const header = document.createElement("div");
      header.classList.add("accordion-header");
      header.textContent = `${item['Nº ONU (1)']} - ${item['Nome e Descrição (2)']}`;

      // Conteúdo do accordion
      const content = document.createElement("div");
      content.classList.add("accordion-content");

      // Preencher o conteúdo do accordion com os dados do produto
      for (const [key, value] of Object.entries(item)) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        content.appendChild(p);
      }

      // Adicionando header e content ao item
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);

      // Adiciona o item à lista de resultados
      resultsContainer.appendChild(accordionItem);

      // Adicionando evento de click para abrir e fechar o accordion
      header.addEventListener('click', function () {
        accordionItem.classList.toggle('active');
      });
    });
  } else {
    resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  }
}

// Função de pesquisa
function searchData() {
  const query = document.getElementById("search-input").value.toUpperCase();  // Converte a pesquisa para maiúsculas

  if (!query) {
    document.getElementById("results").innerHTML = '';  // Limpa a tabela caso não haja pesquisa
    return;
  }

  const filteredData = data.filter(item => {
    const codigoONU = item['Nº ONU (1)'] ? item['Nº ONU (1)'].toUpperCase().trim() : '';  // Normaliza para maiúsculas e remove espaços extras
    const nomeDescricao = item['Nome e Descrição (2)'] ? item['Nome e Descrição (2)'].toUpperCase().trim() : '';  // Normaliza para maiúsculas e remove espaços extras

    // Verifica se o código ONU ou o nome do produto contém o termo de pesquisa
    return codigoONU.includes(query) || nomeDescricao.includes(query);
  });

  displayResults(filteredData);  // Exibe os resultados filtrados
}

// Carregar os dados do CSV ao iniciar a página
window.onload = loadCSV;
