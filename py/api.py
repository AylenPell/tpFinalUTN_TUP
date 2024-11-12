from flask import Flask, jsonify, request, json
import requests
from clases import Tipo
from datetime import datetime
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
        
        for item in data:
                monedas = Tipo(
                    nombre_moneda=item.get('moneda'),
                    nombre=item.get('nombre'),
                    compra=item.get('compra'),
                    venta=item.get('venta'),
                    fecha=item.get('fechaActualizacion')
                )
                info_moneda.append({
                    'moneda': monedas.mostrar_moneda(),
                    'nombre': monedas.mostrar_nombre(),
                    'compra': monedas.mostrar_compra(),
                    'venta': monedas.mostrar_venta(),
                    'fecha': monedas.mostrar_fecha()
                })
        return jsonify(info_moneda), 200
    else:
            return jsonify({'error': 'No se pudieron obtener las cotizaciones'}), 500

@app.route('/dolares', methods=['GET'])
def get_info_dolares(): 
    url = "https://dolarapi.com/v1/dolares"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for item in data:
                monedas = Tipo(
                    nombre_moneda=item.get('moneda'),
                    nombre=item.get('nombre'),
                    compra=item.get('compra'),
                    venta=item.get('venta'),
                    fecha=item.get('fechaActualizacion')
                )
                info_moneda.append({
                    'moneda': monedas.mostrar_moneda(),
                    'nombre': monedas.mostrar_nombre(),
                    'compra': monedas.mostrar_compra(),
                    'venta': monedas.mostrar_venta(),
                    'fecha': monedas.mostrar_fecha()
                })
        return jsonify(info_moneda), 200
    else:
            return jsonify({'error': 'No se pudieron obtener las cotizaciones'}), 500
    
@app.route('/print_dolares', methods=['GET'])
def print_info_dolares(): 
    url = "https://dolarapi.com/v1/dolares"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for i in data:
            fecha_actualizacion = i.get('fechaActualizacion')
            if fecha_actualizacion:
                fecha_dt = datetime.strptime(fecha_actualizacion, "%Y-%m-%dT%H:%M:%S.%fZ")
                fecha_formateada = fecha_dt.strftime('%d-%m-%Y %H:%M') # formato fecha
            else:
                fecha_formateada = "Fecha no disponible"
            info_moneda.append({
                'casa': i['casa'],
                'compra': i['compra'],
                'venta': i['venta'],
                'nombre': i['nombre'],
                'moneda': i['moneda'],
                'fechaActualizacion': fecha_formateada               
            })
        email_body = "DÓLAR\n\n"
        for item in info_moneda:
            email_body += f"{item['moneda']}\n"
            email_body += f"{item['nombre']}\n"
            email_body += f"Compra: {item['compra']}\n"
            email_body += f"Venta: {item['venta']}\n"
            email_body += f"Fecha de Actualización: {item['fechaActualizacion']}\n"
            email_body += "-" * 30 + "\n"  # Separador entre cada casa de cambio
        
        return email_body
    else:
        return jsonify({'error': 'Tu vieja'}), response.status_code

@app.route('/print_generales', methods=['GET'])
def print_info_general(): 
    url = "https://dolarapi.com/v1/cotizaciones"
    response = requests.get(url)   
    print(response.json(), "Datos recibidos de la API")  
    if response.status_code == 200: # OK 
        data = response.json()
        info_moneda = []
        
        for i in data:
            fecha_actualizacion = i.get('fechaActualizacion')
            if fecha_actualizacion:
                fecha_dt = datetime.strptime(fecha_actualizacion, "%Y-%m-%dT%H:%M:%S.%fZ")
                fecha_formateada = fecha_dt.strftime('%d-%m-%Y %H:%M')
            else:
                fecha_formateada = "Fecha no disponible"
            info_moneda.append({
                'casa': i['casa'],
                'compra': i['compra'],
                'venta': i['venta'],
                'nombre': i['nombre'],
                'moneda': i['moneda'],
                'fechaActualizacion': fecha_formateada              
            })
        email_body = "OTRAS MONEDAS\n\n"
        for item in info_moneda:
            email_body += f"{item['moneda']}\n"
            email_body += f"{item['nombre']}\n"
            email_body += f"Compra: {item['compra']}\n"
            email_body += f"Venta: {item['venta']}\n"
            email_body += f"Fecha de Actualización: {item['fechaActualizacion']}\n"
            email_body += "-" * 30 + "\n"  # Separador entre cada casa de cambio
        
        return email_body
    else:
        return jsonify({'error': 'Tu vieja'}), response.status_code

body_content_dolares = print_info_dolares()
body_content_general = print_info_general()
body_content = body_content_dolares + body_content_general

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

# envio mail

@app.route('/procesar', methods=['POST'])
def procesar():
    nombre = request.form.get('nombre')
    correo = request.form.get('correo')

    if nombre and correo:
        print(f"Nombre: {nombre}")
        print(f"Correo: {correo}")
        data = {
            'service_id': 'Sr_Cambio',
            'template_id': 'cotizaciones',
            'user_id': 'ceqgeO6X6IYONKkDy',
            'accessToken': 'CD-KRNfbyAP1_CaGEoUzQ',
            'template_params': {
                'user_email': correo,
                'from_name': 'Sr Cambio',
                'user_name': nombre,
                'message': body_content
            }
        }
        headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.9',
            'Origin': 'http://127.0.0.1:5000/',  
            'Referer': 'http://127.0.0.1:5000/'
        }

        try:
            response = requests.post(
                'https://api.emailjs.com/api/v1.0/email/send',
                data=json.dumps(data),
                headers=headers
            )
            response.raise_for_status()
            print('La cotización fue enviada correctamente!')
        except requests.exceptions.RequestException as error:
            print(f'Oops... {error}')
            if error.response is not None:
                print(error.response.text)
    
        return f'Mensaje enviado correctamente a {correo}', 200     
    else:
        return jsonify({'error': "Amigue, completá bien los datos"}), 405
    

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)

