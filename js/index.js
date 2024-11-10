//boton hamburguesa navBar
const menuHamburguesa = document.querySelector('.menuHamburguesa');
const navUl = document.querySelector('.navUl');
    
menuHamburguesa.addEventListener('click', () => {
    navUl.classList.toggle('open');
});

function mostrarIframe(id) {
    let iframes = document.querySelectorAll('.ifCards');
    iframes.forEach(function(iframe) {
        if (!iframe.classList.contains('ocultar')){
            iframe.classList.add('ocultar');
        }
    });
    let iframeSeleccionado = document.getElementById(id);
    iframeSeleccionado.classList.remove('ocultar');
    }

function botonesIndex() { 
    const iframeUno = document.getElementById('cotizaciones');
    const iframeDos = document.getElementById('dolares');
    const btnUno = document.getElementById('botonDolar');
    const btnDos = document.getElementById('botonCotizaciones');

    if (iframeUno) {
        iframeUno.classList.toggle('ocultar');
        if(btnUno){
            btnDos.classList.toggle('ocultar');
        }
        console.log("funciona cotizacion"); // prueba técnica para ver si funciona
    }
    if (iframeDos) {
        iframeDos.classList.toggle('ocultar');
        if(btnDos){
            btnUno.classList.toggle('ocultar');
        }
        console.log("funciona dolares"); // prueba técnica para ver si funciona
    }
}

// para cuando sepamos usar Node.js
// export function nombrar_ruta(){
//     botoncito = document.getElementById('navHome')
//     ruta = botoncito.getAttribute('name');
//     return ruta
// }


// MAILING
(function(){
    emailjs.init("ceqgeO6X6IYONKkDy"); // Inicializa EmailJS
})();

async function enviarConEmailJS(nombre, correo) {
    let templateParams = {
        user_name: nombre,
        user_email: correo
    };

    try {
        const response = await emailjs.send("Sr_Cambio", "cotizaciones", templateParams);
        alert("¡Correo enviado exitosamente!");
        console.log('SUCCESS!', response.status, response.text);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form_mail');
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita el envío por defecto

        const formData = new FormData(form);

        try {
            const response = await fetch('http://127.0.0.1:5000/procesar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                if (data.nombre && data.correo) {
                    await enviarConEmailJS(data.nombre, data.correo);
                }
                alert(data.mensaje);
            } else {
                alert("Error al procesar los datos en el servidor");
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    });
});

