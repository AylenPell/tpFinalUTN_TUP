from flask import Flask, jsonify, request
import requests
from flask_cors import CORS # para que no lo tome como malicioso

app = Flask(__name__) # crea servidor
CORS(app) # es buenito

# para cuando aprendamos a usar node.js
# def getURL_cotizaciones(ruta):
#  url = f"https://dolarapi.com/v1/{ruta}"
#  return url

@app.route('/cotizaciones', methods=['GET'])
def get_info_cotizaciones(): 
    url = "https://dolarapi.com/v1/cotizaciones"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for i in data:
            info_moneda.append({
                'casa': i['casa'],
                'compra': i['compra'],
                'venta': i['venta'],
                'nombre': i['nombre'],
                'moneda': i['moneda'],
                'fechaActualizacion': i['fechaActualizacion']
                
            })
        return jsonify(info_moneda)
    else:
        return jsonify({'error': 'Tu vieja'}), response.status_code

@app.route('/dolares', methods=['GET'])
def get_info_dolares(): 
    url = "https://dolarapi.com/v1/dolares"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for i in data:
            info_moneda.append({
                'casa': i['casa'],
                'compra': i['compra'],
                'venta': i['venta'],
                'nombre': i['nombre'],
                'moneda': i['moneda'],
                'fechaActualizacion': i['fechaActualizacion']
                
            })
        return jsonify(info_moneda)
    else:
        return jsonify({'error': 'Tu vieja'}), response.status_code
    
@app.route('/historico', methods=['GET'])
def get_info_historico(): 
    url = "https://api.argentinadatos.com/v1/cotizaciones/dolares/"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for i in data:
            info_moneda.append({
                'casa': i['casa'],
                'compra': i['compra'],
                'venta': i['venta'],
                'fecha': i['fecha']
            })
        return jsonify(info_moneda)
    else:
        return jsonify({'error': 'Tu vieja'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)

