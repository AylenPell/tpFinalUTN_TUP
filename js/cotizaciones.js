// Llamada api de Python
fetch('http://127.0.0.1:5000/cotizaciones')
.then(response => response.json())
.then(info_moneda => {for (i=0; i<info_moneda.length; i++){
    agregarCotizacion(
      info_moneda[i].nombre, 
      info_moneda[i].compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
      info_moneda[i].venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
      info_moneda[i].fechaActualizacion)
    document.getElementsByClassName("card")[i+1].style.display="grid"
    //console.log(data)
  }}); 

//cards
function agregarCotizacion(nombre, compra, venta, fechaActualizacion){
    var x = document.getElementsByClassName("card")[0].cloneNode(true)
    x.querySelector(".titulo").innerHTML= nombre
    x.querySelector(".precioVenta").innerHTML= venta
    x.querySelector(".precioCompra").innerHTML= compra
    if(new Date() - new Date(fechaActualizacion) >= 5*60*1000){
      x.querySelectorAll(".imgOk")[0].src='../img/dedo_not.png'      
    } else {
      x.querySelectorAll(".imgOk")[0].src='../img/dedo_ok.png'
    }
    console.log(fechaActualizacion)
    document.body.querySelector('.bodyCards').appendChild(x) 
}
