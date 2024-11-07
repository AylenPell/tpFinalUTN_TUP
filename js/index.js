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