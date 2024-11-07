import requests

URL = "https://api.argentinadatos.com/v1/cotizaciones/dolares/"
response = requests.get(URL)

if response.status_code == 200:
    data = response.json()
    print('Solicitud exitosa')
    print('Data:', data)
else:
    print('Error en la solicitud, detalles:', response.text)