Projeto: Pesquisa de Produtos Perigosos

Descrição:
- O projeto agora está unificado e baseado no arquivo de dados principal: `Relacao_de_Produtos_Perigosos.json`.
- `main.js` carrega esse arquivo e provê busca, filtros (classe / grupo), ordenação e exportação CSV.

Arquitetura:
- index.html / index3.html: interface de busca e exibição em cartões.
- main.js: lógica unificada (carregamento, filtros, ordenação, exportação, renderização).
- index.css / diamante.css / card2.css: estilos (pode ser consolidado posteriormente).
- roteiro.js: ferramenta de fiscalizacao (checklist) usada em `fiscalização.html`.
- service-worker.js: cacheia `main.js` e `Relacao_de_Produtos_Perigosos.json` para modo offline.

Observações:
- Foi removido `banco_cod_ONU.json` (redundante). Se precisar restaurá-lo, recupere do histórico do git.
- Próximo passo sugerido: consolidar os arquivos CSS duplicados e reduzir a base de arquivos estáticos.

Como testar rapidamente:
1. Inicie um servidor local na pasta do projeto:

```powershell
python -m http.server 8000
```

2. Acesse `http://localhost:8000/index.html` no navegador.
3. Pesquise por nome ou código ONU, aplique filtros e use "Exportar CSV" para baixar resultados.
