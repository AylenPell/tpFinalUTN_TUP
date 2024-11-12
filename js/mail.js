
document.addEventListener('DOMContentLoaded', async () => {
    // Aquí, el HTML está completamente cargado

    const procesarCotizaciones = async () => {
        fetch('https://dolarapi.com/v1/dolares')
        .then(response => response.json())
        .then(data => {for (i=0; i<data.length; i++){
            contenedor = document.getElementsByClassName('container_dolares')
            agregarCotizacion(data[i].nombre, data[i].compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].fechaActualizacion, contenedor)
            document.getElementsByClassName("moneda")[0+1].style.display="none"
        }}); 
        fetch('https://dolarapi.com/v1/cotizaciones')
        .then(response => response.json())
        .then(data => {for (i=1; i<data.length; i++){
            contenedor = document.getElementsByClassName('container_gral')
            agregarCotizacion(data[i].nombre, data[i].compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data[i].fechaActualizacion, contenedor)
            document.getElementsByClassName("moneda")[0].style.display="none"
            }
        }); 
    function agregarCotizacion(nombre, compra, venta, fechaActualizacion, contenedor){
        var x = document.getElementsByClassName("moneda")[0].cloneNode(true)
        x.style.display="flex"
        x.querySelector(".nombre").innerHTML= `<u><b>${nombre}`
        x.querySelector(".venta").innerHTML= `Precio venta: <b>${venta}`
        x.querySelector(".compra").innerHTML= `Precio compra: <b>${compra}`
        x.querySelector(".fecha").innerHTML= `Fecha actualización: <i>${fechaActualizacion}`
        contenedor[0].appendChild(x);
    }
    };

    await procesarCotizaciones();

    // Obtener el contenido HTML después de cargar y procesar
    let info_para_mensaje = document.querySelector('.mandar_cotizacion_mail').innerHTML;
 

// Función para enviar el email
let botonEnviarEmail = document.querySelector('#enviarEmail')
botonEnviarEmail.addEventListener('click', enviarEmail())
function enviarEmail(){
    const datosForm = get_datos_form(); // Obtener los datos del formulario
    console.log(datosForm)
    emailjs.send("Sr_Cambio", "cotizaciones", {
        message: info_para_mensaje, // Pasamos info_para_mensaje como variable de la plantilla
        from_name: datosForm.nombre,  // Incluimos el nombre
        from_email: datosForm.correo  // Incluimos el correo
    })
    .then(response => {
        console.log("Correo enviado con éxito", response.status, response.text);
    })
    .catch(error => {
        console.error("Error al enviar el correo:", error);
    });
};
function get_datos_form(){
    const iframeForm = document.querySelector('#contacto')
    let nombre= document.iframeForm.querySelector('#nombre').value
    let correo= document.iframeForm.querySelector('#correo').value
    console.log(nombre , correo)
    return ([nombre, correo])
    
}
});