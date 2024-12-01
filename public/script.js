document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const query = document.querySelector('#query').value.toUpperCase();
    fetch(`/api/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.querySelector('#results');
            resultsContainer.innerHTML = ''; // Limpar resultados anteriores

            if (data.length > 0) {
                data.forEach(item => {
                    const accordionItem = document.createElement('div');
                    accordionItem.classList.add('accordion-item');

                    const accordionHeader = document.createElement('div');
                    accordionHeader.classList.add('accordion-header');
                    accordionHeader.textContent = `Código ONU: ${item.Codigo_ONU}`;
                    accordionItem.appendChild(accordionHeader);

                    const accordionContent = document.createElement('div');
                    accordionContent.classList.add('accordion-content');
                    accordionContent.innerHTML = `
                        <p><strong>Nome e Descrição:</strong> ${item.Nome_Descricao}</p>
                        <p><strong>Classe/Subclasse de Risco:</strong> ${item.Classe_Subclasse_Risco}</p>
                        <p><strong>Risco Subsidiário:</strong> ${item.Risco_Subsidiario}</p>
                        <p><strong>Nº de Risco:</strong> ${item.Numero_Risco}</p>
                        <p><strong>Grupo de Embalagem:</strong> ${item.Grupo_Embalagem}</p>
                        <p><strong>Quant. Limitada por Veículo (kg):</strong> ${item.Quant_Limitada_Veiculo}</p>
                        <p><strong>Embalagem Interna:</strong> ${item.Embalagem_Interna}</p>
                    `;
                    accordionItem.appendChild(accordionContent);

                    accordionHeader.addEventListener('click', () => {
                        accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
                    });

                    resultsContainer.appendChild(accordionItem);
                });
            } else {
                resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            }
        });
});
