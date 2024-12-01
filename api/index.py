from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Carregar o arquivo CSV com os dados dos produtos
csv_file = os.path.join(os.path.dirname(__file__), '../data/produtos_perigosos.csv')
data_cleaned = pd.read_csv(csv_file)

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query', '').upper()
    filtered_data = data_cleaned[
        data_cleaned['Codigo_ONU'].str.contains(query, na=False) |
        data_cleaned['Nome_Descricao'].str.upper().str.contains(query, na=False)
    ]
    results = filtered_data.to_dict(orient='records')
    return jsonify(results)

# Para rodar o Flask localmente (não necessário no Vercel)
if __name__ == '__main__':
    app.run(debug=True)