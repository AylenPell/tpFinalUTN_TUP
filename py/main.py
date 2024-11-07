from abc import ABC, abstractmethod

class Moneda(ABC):
    @abstractmethod
    def __init__(self, nombre):
        self.cargar_nombre(nombre)
    @abstractmethod
    def cargar_nombre(self, nombre):
        self.nombre = nombre
    @abstractmethod    
    def mostrar_nombre(self):
        return self.nombre

class Tipo(Moneda):
    def __init__(self, nombre_moneda, tipo):
        Moneda.__init__(self, nombre_moneda)
        self.cargar_nombre(tipo)
        self.cotizaciones = []
    def cargar_nombre(self, tipo):
        self.nombre = tipo
    def mostrar_nombre(self):
        return self.nombre
    def __str__(self):
        return f'La moneda es {super().mostrar_nombre()}, tipo {self.mostrar_nombre()}. La cotizacion es: compra {self.cotizaciones[0].valor_compra}, venta {self.cotizaciones[0].valor_venta}, actualizacion {self.cotizaciones[0].actualizacion}'
    def cargar_cotizacion(self, cotizacion):
        self.cotizaciones.append(cotizacion)
    
class Cotizacion():
    def __init__(self, actualizacion, valor_compra, valor_venta):
        self.cargar_act(actualizacion)
        self.cargar_venta(valor_venta)
        self.cargar_compra(valor_compra)
    def cargar_act(self, actualizacion):
        self.actualizacion = actualizacion
    def mostrar_act(self):
        return self.actualizacion
    def cargar_venta(self, valor_venta):
        self.valor_venta = valor_venta
    def mostrar_venta(self):
        return self.valor_venta
    def cargar_compra(self, valor_compra):
        self.valor_compra = valor_compra
    def mostrar_compra(self):
        return self.valor_compra
    def __str__(self):
        return f'La cotizacion es: compra {self.valor_compra}, venta {self.valor_venta}, actualizacion {self.actualizacion}'

# PRUEBAS en clase
# moneda1 = Tipo("oficial", "dolar")
# moneda2 = Tipo("oficial", "euro")
# moneda3 = Tipo("", "")
# moneda3.cargar_tipo("blue")
# moneda3.cargar_nombre("dolar")

cotizacion1 = Cotizacion("hoy", 900, 800)
cotizacion2 = Cotizacion("ayer", 700, 600)
# moneda1.cargar_cotizacion(cotizacion1)
# moneda2.cargar_cotizacion(cotizacion2)

# print(moneda1)
# print(moneda2)

dolar = Tipo("dolar", "oficial")
dolar.cargar_cotizacion(cotizacion1)
print(dolar)