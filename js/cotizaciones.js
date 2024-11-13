// Llamada api de Python
fetch('http://127.0.0.1:5000/cotizaciones')
.then(response => response.json())
.then(info_moneda => {for (i=0; i<info_moneda.length; i++){
    agregarCotizacion(
    info_moneda[i].nombre, 
    info_moneda[i].compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
    info_moneda[i].venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
    info_moneda[i].fecha)
document.getElementsByClassName("card")[i+1].style.display="grid"
console.log(info_moneda)
}}); 

//cards
function agregarCotizacion(nombre, compra, venta, fecha){
    var x = document.getElementsByClassName("card")[0].cloneNode(true)
    x.querySelector(".titulo").innerHTML= nombre
    x.querySelector(".precioVenta").innerHTML= venta
    x.querySelector(".precioCompra").innerHTML= compra

    console.log(fecha);
    let fechaConvertida;
    if (fecha) {
        // Intentar convertir el string de fecha a un objeto Date
        fechaConvertida = new Date(fecha);
        if (isNaN(fechaConvertida.getTime())) {
            console.error("Fecha inválida:", fecha);
            fechaConvertida = null;
        }
    }
    console.log(fechaConvertida);
    const cincoMinutos = 5 * 60 * 1000; 
    const diferenciaTiempo = fechaConvertida ? (new Date() - fechaConvertida) : Infinity;
    console.log(diferenciaTiempo);

    if (diferenciaTiempo >= cincoMinutos) {
        x.querySelectorAll(".imgOk")[0].src = '../img/dedo_not.png';
    } else {
        x.querySelectorAll(".imgOk")[0].src = '../img/dedo_ok.png';
    }

    document.body.querySelector('.bodyCards').appendChild(x) 
}
