//Llamada Api Dolares
fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(data => {for (i=0; i<data.length; i++){
      agregarCotizacion(data[i].nombre, data[i].compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].fechaActualizacion)
      document.getElementsByClassName("card")[i+1].style.display="grid"
      console.log(data)
      } // cierre del then
    }); // cierre del for

function agregarCotizacion(nombre, compra, venta, fecha){
    var x = document.getElementsByClassName("card")[0].cloneNode(true)
    x.querySelector(".titulo").innerHTML= nombre
    x.querySelector(".precioVenta").innerHTML= venta
    x.querySelector(".precioCompra").innerHTML= compra
    if(new Date() - new Date(fecha) >= 5*60*1000){
      x.querySelectorAll(".imgOk")[0].src='../img/dedo_not.png'
    } else {
      x.querySelectorAll(".imgOk")[0].src='../img/dedo_ok.png'
    }
    document.body.querySelector('.bodyCards').appendChild(x)   
  }