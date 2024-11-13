//boton hamburguesa navBar
const menuHamburguesa = document.querySelector('.menuHamburguesa');
const navUl = document.querySelector('.navUl');
    
menuHamburguesa.addEventListener('click', () => {
    navUl.classList.toggle('open');
    if (navUl.classList.contains('open')) {
        const contenedorIframes = document.querySelector('.contenedorIframes');
        contenedorIframes.classList.add('margen_nav');
    } else {
        const contenedorIframes = document.querySelector('.contenedorIframes');
        contenedorIframes.classList.remove('margen_nav');
    }
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


const btnSobre = document.querySelector('.sobre');
btnSobre.addEventListener('mouseover', msjSobre);
btnSobre.addEventListener('mouseout', msjSobre);
function msjSobre(){
    const btnMsj = document.querySelector('.msjSobre');
    btnMsj.classList.toggle('ocultar');
}

function pintarOpcionMenu(iframeId, opcionAct, opcionInact1, opcionInact2){
    let iframeActivo = document.querySelector(`#${iframeId}`);
    let opcionMenuActiva = document.querySelector(`#${opcionAct}`);
    let opcionMenuInactiva1 = document.querySelector(`#${opcionInact1}`);
    let opcionMenuInactiva2 = document.querySelector(`#${opcionInact2}`);
    if (!iframeActivo.classList.contains('ocultar')){
        opcionMenuActiva.classList.add('activar');
        opcionMenuInactiva1.classList.remove('activar');
        opcionMenuInactiva2.classList.remove('activar');
    }
}

