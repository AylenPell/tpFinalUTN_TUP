
document.addEventListener('DOMContentLoaded', async () => {
    // Aquí, el HTML está completamente cargado

    const obtenerDatos = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const procesarCotizaciones = async () => {
        const contenedorDolares = document.getElementsByClassName('container_dolares');
        const contenedorGeneral = document.getElementsByClassName('container_gral');

        const dolaresData = await obtenerDatos('https://dolarapi.com/v1/dolares');
        const cotizacionesData = await obtenerDatos('https://dolarapi.com/v1/cotizaciones');

        dolaresData.forEach((data, i) => {
            if (i > 0) {
                agregarCotizacion(data.nombre, data.compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data.venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data.fechaActualizacion, contenedorDolares);
            }
        });
        document.getElementsByClassName("moneda")[1].style.display = "none";

        cotizacionesData.forEach((data, i) => {
            if (i > 0) {
                agregarCotizacion(data.nombre, data.compra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data.venta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), data.fechaActualizacion, contenedorGeneral);
            }
        });
        document.getElementsByClassName("moneda")[0].style.display = "none";
    };

    function agregarCotizacion(nombre, compra, venta, fechaActualizacion, contenedor) {
        const x = document.getElementsByClassName("moneda")[0].cloneNode(true);
        x.style.display = "flex";
        x.querySelector(".nombre").innerHTML = `<u><b>${nombre}`;
        x.querySelector(".venta").innerHTML = `Precio venta: <b>${venta}`;
        x.querySelector(".compra").innerHTML = `Precio compra: <b>${compra}`;
        x.querySelector(".fecha").innerHTML = `Fecha actualización: <i>${fechaActualizacion}`;
        contenedor[0].appendChild(x);
    }

    await procesarCotizaciones();

    // Obtener el contenido HTML después de cargar y procesar
    const info_para_mensaje = document.querySelector('.mandar_cotizacion_mail').innerHTML;

    // Función para enviar el email
    const enviarEmail = () => {
        const datosForm = get_datos_form(); // Obtener los datos del formulario
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

   
});
