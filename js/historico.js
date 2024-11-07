// variables y arrays
let url;
let monedaHist = [];
let casaHist =[];
let fechaHist = [];
let compraHist = [];    
let ventaHist = [];
let fechaElegida1; 
let fechaElegida2;

// funciones
function mostrarGrafico() { 
    let fechaElegida1 = document.querySelector('#fechaElegida1').value;
    let fechaElegida2 = document.querySelector('#fechaElegida2').value;
    let casaElegida = document.querySelector('#casaElegida').value;
    if (!casaElegida || !fechaElegida1 || !fechaElegida2){
        teapot()
    } else {
        const grafico = document.getElementById('grafico');
        grafico.classList.toggle('ocultar');
    }
    
}

function restablecer(){
    let formulario = document.getElementsByClassName('formularioHistorico')[0];
    const grafico = document.getElementById('grafico');
    const teapot = document.getElementById('teapot');
    if(formulario){
        formulario.reset();
        if(grafico.classList != 'ocultar'){
            grafico.classList.toggle('ocultar');
        }
        if(teapot.classList != 'ocultar'){
            teapot.classList.toggle('ocultar');
        }
    }
}

function teapot(){
    // let fechaElegida1 = document.querySelector('#fechaElegida1').value;
    // let fechaElegida2 = document.querySelector('#fechaElegida2').value;
    // let casaElegida = document.querySelector('#casaElegida').value;

    // if (!casaElegida || !fechaElegida1 || !fechaElegida2){
    //     const teapot = document.getElementById('teapot');
    //     teapot.classList.toggle('ocultar');
    // }
    const teapot = document.getElementById('teapot');
    teapot.classList.toggle('ocultar');
}

function adquirirDatos(url, fechaElegida1, fechaElegida2){
    fechaElegida1 = new Date(document.querySelector('#fechaElegida1').value);
    fechaElegida2 = new Date(document.querySelector('#fechaElegida2').value);
    return new Promise((resolve) => {
        let casaElegida = document.querySelector('#casaElegida').value;
        console.log(casaElegida, fechaElegida1, fechaElegida2);
        url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${casaElegida}`; // /${fechaElegida}
        
        resolve(url);
        console.log(url); // prueba técnica para ver si trae bien la url
    })
}

// delimitar el calendario para que no se vaya a la m.... al futuro
const hoy = new Date();
const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
const fechaFormateada1 = hoy.toLocaleDateString('sv-SE', opciones);
document.getElementById('fechaElegida1').max = fechaFormateada1;
const fechaFormateada2 = hoy.toLocaleDateString('sv-SE', opciones);
document.getElementById('fechaElegida2').max = fechaFormateada2;

async function esperarDatos() {
    try {
        const url_prometida = await adquirirDatos();
        const response = await fetch(url_prometida);
        const data = await response.json();
        console.log(url_prometida); // prueba técnica para ver si trae bien la url

        const fechaElegida1 = new Date(document.querySelector('#fechaElegida1').value);
        const fechaElegida2 = new Date(document.querySelector('#fechaElegida2').value);

        // Obtener las fechas del data
        const fechasData = data.map(item => new Date(item.fecha));

        // Encontrar el índice de la primera fecha que cumple con el rango
        const startIndex = fechasData.findIndex(fecha => fecha >= fechaElegida1);
        const endIndex = fechasData.findIndex(fecha => fecha > fechaElegida2); // Primer índice fuera del rango

        // Si no se encuentra endIndex, establecer como el final del array
        const validEndIndex = endIndex === -1 ? data.length : endIndex;

        // Asegurarse de que startIndex es válido
        if (startIndex !== -1) {
            for (let i = startIndex; i < validEndIndex; i++) {
                monedaHist.push(data[i].moneda);
                casaHist.push(data[i].casa);
                fechaHist.push(data[i].fecha);
                compraHist.push(parseFloat(data[i].compra));
                ventaHist.push(parseFloat(data[i].venta));
            }

            console.log(fechaHist[0]); // muestra la primer fecha posible
            agregarHistorico(casaHist, fechaHist, compraHist, ventaHist);
        } else {
            console.log('No se encontraron datos en el rango de fechas seleccionadas.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

function agregarHistorico(casa, fecha, compra, venta) {
    let canvaHistorico = document.querySelector('#canvaHistorico').getContext("2d");

    document.querySelector('.tituloCanva').innerHTML= casa[0].toUpperCase();

    new Chart(canvaHistorico, {
        type: 'line',
        data: {
            labels: fecha, 
            datasets: [
                {
                    label: 'Compra',
                    borderColor: "#9000ff", //rgb(122,102,145)
                    data: compra,
                    fill: false
                },
                {
                    label: 'Venta',
                    borderColor: "#ff8000", //rgb(183,88,66)
                    data: venta,
                    fill: false
        }]},
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
        }}}
    });
}
