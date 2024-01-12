// Inicializamos la variable datos con valores iniciales
var datos = {
    titulo: "Proyecto Handlebars",
    descripcion: "Handlebars es una librería de plantillas JavaScript que facilita la generación de contenido HTML dinámico mediante la creación de plantillas reutilizables.  Plantillas: Las plantillas de Handlebars son cadenas de texto con marcadores de posición encerrados en dobles llaves ({{ }}).",
    elementos: []
};

// Función para mostrar el input cuando se hace clic en el botón
function mostrarInput(tipo) {
    var input = document.getElementById('tecnologiaInput');
    var fileInput = document.getElementById('fileInput');

    // Cambiamos el tipo del input según el botón presionado
    if (tipo === 'imagen') {
        input.style.display = 'none';
        fileInput.style.display = 'inline-block';
        fileInput.click(); // Simulamos el clic para abrir el diálogo de selección de archivo
    } else {
        fileInput.style.display = 'none';
        input.style.display = 'inline-block';
        input.focus(); // Enfocamos automáticamente el input de texto
    }
}

// Función para procesar la imagen seleccionada
function procesarImagen(input) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var contenido = e.target.result;
        agregarElemento(contenido, 'imagen');
    };

    reader.readAsDataURL(input.files[0]);
}

// Función para agregar una nueva tecnología dinámicamente
function agregarElemento(contenido, tipo) {
    // Añadimos el nuevo elemento al array de elementos
    datos.elementos.push({
        contenido: contenido,
        tipoTexto: tipo === 'texto'
    });

    // Volvemos a renderizar la plantilla con los datos actualizados
    renderizarPlantilla();
}

// Función para eliminar un elemento de la lista
function eliminarElemento(index) {
    // Eliminamos el elemento del array de elementos
    datos.elementos.splice(index, 1);

    // Volvemos a renderizar la plantilla con los datos actualizados
    renderizarPlantilla();
}

// Función para agregar un nuevo elemento al presionar Enter en el input
function agregarConEnter(event) {
    if (event.key === 'Enter') {
        var contenido = document.getElementById('tecnologiaInput').value;
        agregarElemento(contenido, 'texto');

        // Limpiamos el input después de agregar el elemento
        document.getElementById('tecnologiaInput').value = '';
    }
}

// Función para renderizar la plantilla con los datos actuales
function renderizarPlantilla() {
    // Obtenemos la plantilla desde el script con ID 'plantilla'
    var fuente = document.getElementById('plantilla').innerHTML;

    // Compilamos la plantilla con Handlebars
    var plantilla = Handlebars.compile(fuente);

    // Insertamos el HTML generado en el contenedor con ID 'app'
    document.getElementById('app').innerHTML = plantilla(datos);
}

// Renderizamos la plantilla inicial al cargar la página
renderizarPlantilla();
