const assets = [];
let efectividadOriginal = [];
let efectividadOriginal2 = [];
let assetCounter = {
    "Datos / Información": 1,
    "Claves Criptográficas": 1,
    "Servicios": 1,
    "Software": 1,
    "Hardware": 1,
    "Redes de Comunicaciones": 1,
    "Soportes de Información": 1,
    "Equipamiento Auxiliar": 1,
    "Instalaciones": 1,
    "Personal": 1
};

const tipoPrefijo = {
    "Datos / Información": "DI",
    "Claves Criptográficas": "CC",
    "Servicios": "SE",
    "Software": "SW",
    "Hardware": "HW",
    "Redes de Comunicaciones": "RC",
    "Soportes de Información": "SI",
    "Equipamiento Auxiliar": "EA",
    "Instalaciones": "IN",
    "Personal": "PE"
};



const dimensionesSeguridad = {
    "Datos / Información": { A: 4, C: 5, I: 3, D: 5, T: 3 },
    "Claves Criptográficas": { A: 5, C: 5, I: 4, D: 3, T: 4 },
    "Servicios": { A: 3, C: 4, I: 5, D: 5, T: 3 },
    "Software": { A: 3, C: 3, I: 5, D: 3, T: 4 },
    "Hardware": { A: 4, C: 3, I: 3, D: 5, T: 3 },
    "Redes de Comunicaciones": { A: 3, C: 4, I: 3, D: 5, T: 4 },
    "Soportes de Información": { A: 3, C: 4, I: 3, D: 3, T: 3 },
    "Equipamiento Auxiliar": { A: 3, C: 3, I: 3, D: 3, T: 3 },
    "Instalaciones": { A: 4, C: 3, I: 3, D: 5, T: 4 },
    "Personal": { A: 4, C: 4, I: 3, D: 3, T: 5 }
};

const amenazas2 = [
    { codigo: "E05", descripcion: "Fuga de información" },
    { codigo: "AI03", descripcion: "Divulgación de información" },
    { codigo: "AI04", descripcion: "Suplantación de identidad" },
    { codigo: "AI05", descripcion: "Destrucción de información" },
];
const amenazas3 = [
    { codigo: "OI04", descripcion: "Fallo de servicios de comunicaciones" },
    { codigo: "E05", descripcion: "Fuga de información" },
    { codigo: "AI04", descripcion: "Suplantación de identidad" },
    { codigo: "AI08", descripcion: "Acceso no autorizado" }
];

const amenazas4 = [
    { codigo: "OI01", descripcion: "Corte de suministro eléctrico" },
    { codigo: "OI02", descripcion: "Malas condiciones" },
    { codigo: "OI03", descripcion: "Daños por agua" },
    { codigo: "OI04", descripcion: "Fallo de servicios de comunicaciones" },
    { codigo: "E04", descripcion: "Errores de mantenimiento" },
];

const amenazas5 = [
    { codigo: "E01", descripcion: "Errores de configuración" },
    { codigo: "E02", descripcion: "Errores de usuarios" },
    { codigo: "E03", descripcion: "Errores del gerente" },
    { codigo: "E05", descripcion: "Fuga de información" },
    { codigo: "E06", descripcion: "Deficiencias de la empresa" },
    { codigo: "E07", descripcion: "Vulnerabilidades del software" },
];

const amenazas6 = [
    { codigo: "DN01", descripcion: "Fuego" },
    { codigo: "DN02", descripcion: "Daños por agua" },
    { codigo: "E08", descripcion: "Daños en los equipos" },
    { codigo: "AI01", descripcion: "Robo de equipos" },
    { codigo: "AI02", descripcion: "Daños en los equipos" },
];

const amenazas7 = [
    { codigo: "DN04", descripcion: "Otros desastres" },
    { codigo: "OI01", descripcion: "Corte de suministro eléctrico" },
    { codigo: "OI03", descripcion: "Daños por agua" },
    { codigo: "OI04", descripcion: "Fallo de servicios de comunicaciones" },
];

const amenazas8 = [
    { codigo: "DN01", descripcion: "Fuego" },
    { codigo: "DN02", descripcion: "Daños por agua" },
    { codigo: "OI05", descripcion: "Degradación de soportes" },
    { codigo: "E07", descripcion: "Vulnerabilidades del software" },
];

const amenazas9 = [
    { codigo: "DN01", descripcion: "Fuego" },
    { codigo: "OI02", descripcion: "Malas condiciones" },
    { codigo: "AI01", descripcion: "Robo de equipos" },
    { codigo: "AI02", descripcion: "Daños en los equipos" },
];

const amenazas10 = [
    { codigo: "DN01", descripcion: "Fuego" },
    { codigo: "DN02", descripcion: "Daños por agua" },
    { codigo: "DN04", descripcion: "Otros desastres" },
    { codigo: "AI07", descripcion: "Uso no previsto de las instalaciones" },
];
const amenazas11 = [
    { codigo: "E02", descripcion: "Errores de usuarios" },
    { codigo: "E03", descripcion: "Errores del gerente" },
    { codigo: "AI04", descripcion: "Suplantación de identidad" },
    { codigo: "AI06", descripcion: "Extorsión" },
];


let codigoActivoGenerado = "";

function generarCodigoYDimensiones() {
    const tipoActivo = document.getElementById("tipoActivo").value;
    const prefijo = tipoPrefijo[tipoActivo];
    codigoActivoGenerado = prefijo + "-" + assetCounter[tipoActivo].toString().padStart(2, '0');
}

function calcularValoracion() {
    const valor = parseFloat(document.getElementById("valorActivo").value);
    let valoracion = "";

    if (valor >= 20000000) valoracion = "MA";
    else if (valor >= 10000000) valoracion = "A";
    else if (valor >= 5000000) valoracion = "M";
    else if (valor >= 1000000) valoracion = "B";
    else valoracion = "MB";

    return valoracion;
}

function agregarActivo() {
    generarCodigoYDimensiones();
    const tipoActivo = document.getElementById("tipoActivo").value;
    const nombreActivo = document.getElementById("nombreActivo").value;
    const valorActivo = parseFloat(document.getElementById("valorActivo").value);
    const valoracionActivo = calcularValoracion();
    const dimensiones = dimensionesSeguridad[tipoActivo];
    const amenazasgru = obtenerAmenazas(tipoActivo);


    if (nombreActivo && !isNaN(valorActivo) && valoracionActivo) {
        const nuevoActivo = {
            tipo: tipoActivo,
            codigo: codigoActivoGenerado,
            nombre: nombreActivo,
            valor: valorActivo,
            valoracion: valoracionActivo,
            dimensiones: {
                A: dimensiones.A,
                C: dimensiones.C,
                I: dimensiones.I,
                D: dimensiones.D,
                T: dimensiones.T
            },
            amenazas: amenazasgru
        };

        assetCounter[tipoActivo] += 1;

        assets.push(nuevoActivo);
        actualizarTabla();
        actualizarTablaAmenazas();
        limpiarFormulario();
    } else {
        alert("Por favor, completa todos los campos correctamente");
    }
}


function actualizarTabla() {
    const table = document.getElementById("assetsTable");
    table.innerHTML = `
        <thead >
            <th>Tipo</th>
            <th>Código</th>
            <th>Activo</th>
            <th>Valor</th>
            <th>Valoración</th>
            <th>A</th>
            <th>C</th>
            <th>I</th>
            <th>D</th>
            <th>T</th>
            <th>Acciones</th>
        </thread>`;

    assets.forEach((activo, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${activo.tipo}</td>
            <td>${activo.codigo}</td>
            <td>${activo.nombre}</td>
            <td>${activo.valor}</td>
            <td>${activo.valoracion}</td>
            <td>${activo.dimensiones.A}</td>
            <td>${activo.dimensiones.C}</td>
            <td>${activo.dimensiones.I}</td>
            <td>${activo.dimensiones.D}</td>
            <td>${activo.dimensiones.T}</td>
            <td><button onclick="eliminarActivo(${index})">Eliminar</button></td>
        `;
    });
}

function actualizarTablaAmenazas() {
    const tableBody = document.getElementById("threatsTables");
    tableBody.innerHTML = `
    <thead >
        <tr>
            <th>Código Activo</th>
            <th>Activo</th>
            <th>Valoración</th>
            <th>Valor</th>
            <th>Código Amenaza</th>
            <th>Amenaza</th>
            <th colspan="2">Vulnerabilidad</th>
            <th colspan="2">Impacto</th>
            <th>Riesgo Intrínseco</th>
        </tr>
    </thead>
    <thead >
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Valoración</th>
            <th>Valor</th>
            <th>Valoración</th>
            <th>Valor</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    `;

    const tableBodyRows = tableBody.querySelector('tbody');

    assets.forEach((activo) => {
        activo.amenazas.forEach(amenaza => {
            const row = tableBodyRows.insertRow();

            row.innerHTML = `
                <td>${activo.codigo}</td>
                <td>${activo.nombre}</td>
                <td>${activo.valoracion}</td>
                <td class="activo-valor">${activo.valor}</td>
                <td>${amenaza.codigo}</td>
                <td>${amenaza.descripcion}</td>
                <td>
                    <select class="form-control vulnerabilidad-select">
                        <option value="1000">FMA (Muy Alta)</option>
                        <option value="0.071">FA (Alta)</option>
                        <option value="0.016">FM (Media)</option>
                        <option value="0.005">FB (Baja)</option>
                        <option value="0.003">FMB (Muy Baja)</option>
                    </select>
                </td>
                <td><input type="number" class="form-control vulnerabilidad-valor" value="1000" readonly></td>
                <td>
                    <select class="form-control impacto-select">
                        <option value="1">C (Critico)</option>
                        <option value="0.75">A (Alto)</option>
                        <option value="0.5">M (Medio)</option>
                        <option value="0.25">B (Bajo)</option>
                    </select>
                </td>
                <td><input type="number" class="form-control impacto-valor" value="1" readonly></td>
                <td><input type="number" class="form-control riesgo-intrinseco" value="0" readonly></td>
            `;

            const activoValor = parseFloat(row.querySelector('.activo-valor').textContent);
            const vulnerabilidadSelect = row.querySelector('.vulnerabilidad-select');
            const vulnerabilidadValor = row.querySelector('.vulnerabilidad-valor');
            const impactoSelect = row.querySelector('.impacto-select');
            const impactoValor = row.querySelector('.impacto-valor');
            const riesgoIntrinseco = row.querySelector('.riesgo-intrinseco');

            vulnerabilidadSelect.addEventListener('change', () => {
                vulnerabilidadValor.value = vulnerabilidadSelect.value;
                calcularRiesgo();
                actualizarTablaRiesgoResidual();
            });

            impactoSelect.addEventListener('change', () => {
                impactoValor.value = impactoSelect.value;
                calcularRiesgo();
                actualizarTablaRiesgoResidual();
            });

            function calcularRiesgo() {
                const vulnerabilidad = parseFloat(vulnerabilidadValor.value);
                const impacto = parseFloat(impactoValor.value);
                const riesgo = activoValor * vulnerabilidad * impacto;
                riesgoIntrinseco.value = riesgo.toFixed(3);
            }

            calcularRiesgo();
            actualizarTablaRiesgoResidual();
        });
    });
}





function limpiarFormulario() {
    document.getElementById("nombreActivo").value = '';
    document.getElementById("valorActivo").value = '';
    codigoActivoGenerado = "";
}

function eliminarActivo(index) {
    assets.splice(index, 1);
    actualizarTabla();
}
function toggleX(event) {
    const cell = event.target;
    cell.textContent = cell.textContent === "X" ? "" : "X";
}

document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("threatsTable");
    for (let row of table.rows) {
        if (row.rowIndex > 1) {
            for (let i = 3; i < row.cells.length; i++) {
                row.cells[i].classList.add("table-x-cell");
                row.cells[i].onclick = toggleX;
            }
        }
    }
});

function limpiarTabla() {
    assets.length = 0;
    for (let tipo in assetCounter) {
        assetCounter[tipo] = 1;
    }
    const tablaActivos = document.querySelector("#assetsTable tbody");
    tablaActivos.innerHTML = "";
}

function obtenerAmenazas(act) {
    if(act == 'Datos / Información'){
    const amenazasSeleccionadas = [];
    const indicesDisponibles = [...Array(amenazas2.length).keys()];

    while (amenazasSeleccionadas.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
        const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
        amenazasSeleccionadas.push(amenazas2[indiceSeleccionado]);
    }

    return amenazasSeleccionadas;
    }
    else if(act == 'Claves Criptográficas'){
        const amenazasSeleccionadas = [];
        const indicesDisponibles = [...Array(amenazas3.length).keys()]; 
    
        while (amenazasSeleccionadas.length < 4) {
            const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
            const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
            amenazasSeleccionadas.push(amenazas3[indiceSeleccionado]);
        }
    
        return amenazasSeleccionadas;
        }
        else if(act == 'Servicios'){
            const amenazasSeleccionadas = [];
            const indicesDisponibles = [...Array(amenazas4.length).keys()]; 
        
            while (amenazasSeleccionadas.length < 5) {
                const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                amenazasSeleccionadas.push(amenazas4[indiceSeleccionado]);
            }
        
            return amenazasSeleccionadas;
            }
            else if(act == 'Software'){
                const amenazasSeleccionadas = [];
                const indicesDisponibles = [...Array(amenazas5.length).keys()]; 
            
                while (amenazasSeleccionadas.length < 5) {
                    const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                    const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                    amenazasSeleccionadas.push(amenazas5[indiceSeleccionado]);
                }
            
                return amenazasSeleccionadas;
                }
                else if(act == 'Hardware'){
                    const amenazasSeleccionadas = [];
                    const indicesDisponibles = [...Array(amenazas6.length).keys()];
                
                    while (amenazasSeleccionadas.length < 5) {
                        const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                        const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                        amenazasSeleccionadas.push(amenazas6[indiceSeleccionado]);
                    }
                
                    return amenazasSeleccionadas;
                    }
                    else if(act == 'Redes de Comunicaciones'){
                        const amenazasSeleccionadas = [];
                        const indicesDisponibles = [...Array(amenazas7.length).keys()];
                    
                        while (amenazasSeleccionadas.length < 4) {
                            const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                            const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                            amenazasSeleccionadas.push(amenazas7[indiceSeleccionado]);
                        }
                    
                        return amenazasSeleccionadas;
                        }
                        else if(act == 'Soportes de Información'){
                            const amenazasSeleccionadas = [];
                            const indicesDisponibles = [...Array(amenazas8.length).keys()]; 
                        
                            while (amenazasSeleccionadas.length < 4) {
                                const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                                const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                                amenazasSeleccionadas.push(amenazas8[indiceSeleccionado]);
                            }
                        
                            return amenazasSeleccionadas;
                            }
                            else if(act == 'Equipamiento Auxiliar'){
                                const amenazasSeleccionadas = [];
                                const indicesDisponibles = [...Array(amenazas9.length).keys()]; 
                            
                                while (amenazasSeleccionadas.length < 4) {
                                    const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                                    const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                                    amenazasSeleccionadas.push(amenazas9[indiceSeleccionado]);
                                }
                            
                                return amenazasSeleccionadas;
                                }
                                else if(act == 'Instalaciones'){
                                    const amenazasSeleccionadas = [];
                                    const indicesDisponibles = [...Array(amenazas10.length).keys()]; 
                                
                                    while (amenazasSeleccionadas.length < 4) {
                                        const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                                        const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                                        amenazasSeleccionadas.push(amenazas10[indiceSeleccionado]);
                                    }
                                
                                    return amenazasSeleccionadas;
                                    }
                                    else if(act == 'Personal'){
                                        const amenazasSeleccionadas = [];
                                        const indicesDisponibles = [...Array(amenazas11.length).keys()];
                                    
                                        while (amenazasSeleccionadas.length < 4) {
                                            const indiceAleatorio = Math.floor(Math.random() * indicesDisponibles.length);
                                            const indiceSeleccionado = indicesDisponibles.splice(indiceAleatorio, 1)[0];
                                            amenazasSeleccionadas.push(amenazas11[indiceSeleccionado]);
                                        }
                                    
                                        return amenazasSeleccionadas;
                                        }
    
}
// Función para generar un número aleatorio entre min y max
function getRandomEffectiveness() {
    // Array de posibles valores de efectividad
    const efectividades = [0.10, 0.25, 0.50, 0.75, 0.95];
    // Seleccionar un valor aleatorio del array
    return efectividades[Math.floor(Math.random() * efectividades.length)];
}

function crearTablaRiesgoResidual() {
    const tablaRiesgoResidual = document.getElementById("tablaRiesgoResidual").getElementsByTagName('tbody')[0];
    tablaRiesgoResidual.innerHTML = ''; // Limpiar tabla existente
    
    // Obtener todas las filas de la tabla de amenazas
    const filasAmenazas = document.getElementById("threatsTables").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    Array.from(filasAmenazas).forEach((fila) => {
        const codigoActivo = fila.cells[0].textContent;
        const codigoAmenaza = fila.cells[4].textContent;
        const riesgoIntrinseco = parseFloat(fila.querySelector('.riesgo-intrinseco').value);
        
        // Generar efectividad aleatoria para cada activo
        const efectividad = getRandomEffectiveness();

        efectividadOriginal2 = efectividadOriginal.push(efectividad);
        
        // Crear nueva fila en la tabla de riesgo residual
        const nuevaFila = tablaRiesgoResidual.insertRow();
        
        // Identificador activo-amenaza
        nuevaFila.insertCell().textContent = `${codigoActivo} - ${codigoAmenaza}`;
        
        // Efectividad aleatoria
        const celdaEfectividad = nuevaFila.insertCell();
        celdaEfectividad.textContent = `${(efectividad * 100)}%`;
        
        // Riesgo residual
        const celdaRiesgoResidual = nuevaFila.insertCell();
        const riesgoResidual = riesgoIntrinseco * efectividad;
        celdaRiesgoResidual.textContent = riesgoResidual.toFixed(3);
        
        // Aplicar estilo según el nivel de riesgo residual
        if (efectividad <= 0.25) {
            nuevaFila.style.backgroundColor = '#ffcccc'; // Rojo claro para alto riesgo
        } else if (efectividad > 0.25 && efectividad <= 0.75) {
            nuevaFila.style.backgroundColor = '#ffffcc'; // Amarillo claro para riesgo medio
        } else {
            nuevaFila.style.backgroundColor = '#ccffcc'; // Verde claro para bajo riesgo
        }
    });
}

// Función para actualizar la tabla de riesgo residual
function actualizarTablaRiesgoResidual() {
    i = 0;
    const tablaRiesgoResidual = document.getElementById("tablaRiesgoResidual").getElementsByTagName('tbody')[0];
    tablaRiesgoResidual.innerHTML = ''; // Limpiar tabla existente
    
    // Obtener todas las filas de la tabla de amenazas
    const filasAmenazas = document.getElementById("threatsTables").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    Array.from(filasAmenazas).forEach((fila) => {
        const codigoActivo = fila.cells[0].textContent;
        const codigoAmenaza = fila.cells[4].textContent;
        const riesgoIntrinseco = parseFloat(fila.querySelector('.riesgo-intrinseco').value);
        
        // Generar efectividad aleatoria para cada activo
        const efectividad = efectividadOriginal[i];
        
        // Crear nueva fila en la tabla de riesgo residual
        const nuevaFila = tablaRiesgoResidual.insertRow();
        
        // Identificador activo-amenaza
        nuevaFila.insertCell().textContent = `${codigoActivo} - ${codigoAmenaza}`;
        
        // Efectividad aleatoria
        const celdaEfectividad = nuevaFila.insertCell();
        celdaEfectividad.textContent = `${(efectividad * 100)}%`;
        
        // Riesgo residual
        const celdaRiesgoResidual = nuevaFila.insertCell();
        const riesgoResidual = riesgoIntrinseco * efectividad;
        celdaRiesgoResidual.textContent = riesgoResidual.toFixed(3);
        i = i+1;
        // Aplicar estilo según el nivel de riesgo residual
        if (efectividad <= 0.25) {
            nuevaFila.style.backgroundColor = '#ffcccc'; // Rojo claro para alto riesgo
        } else if (efectividad > 0.25 && efectividad <= 0.75) {
            nuevaFila.style.backgroundColor = '#ffffcc'; // Amarillo claro para riesgo medio
        } else {
            nuevaFila.style.backgroundColor = '#ccffcc'; // Verde claro para bajo riesgo
        }
    });
}

// Modificar la función actualizarTablaAmenazas existente
const originalActualizarTablaAmenazas = actualizarTablaAmenazas;
actualizarTablaAmenazas = function() {
    originalActualizarTablaAmenazas();
    crearTablaRiesgoResidual();
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', actualizarTablaRiesgoResidual);




