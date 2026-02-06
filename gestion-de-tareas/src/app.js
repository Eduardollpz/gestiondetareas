
class Tarea {
    constructor(id, nombre, descripcion, fecha, estado) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.estado = estado;
    }
}

class AdministradorTareas {
    constructor() {
        this.tareas = [];
        this.contadorId = 1;
    }

    registrarTarea(nombre, descripcion, fecha, estado) {
        const nuevaTarea = new Tarea(
            this.contadorId,
            nombre,
            descripcion,
            fecha,
            estado
        );

        this.tareas.push(nuevaTarea);

        this.contadorId++;

        return nuevaTarea;
    }

    obtenerTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        return tarea;
    }

    modificarTarea(id, nombre, descripcion, fecha, estado) {
        const tarea = this.obtenerTarea(id);

        if (tarea) {
            tarea.nombre = nombre;
            tarea.descripcion = descripcion;
            tarea.fecha = fecha;
            tarea.estado = estado;
            return true;
        }

        return false;
    }

    eliminarTarea(id) {
        const indice = this.tareas.findIndex(t => t.id === id);

        if (indice !== -1) {
            this.tareas.splice(indice, 1);
            return true;
        }

        return false;
    }
}

const administrador = new AdministradorTareas();

const nombreInput = document.getElementById("nombreInput");
const descripcionInput = document.getElementById("descripcionInput");
const fechaInput = document.getElementById("fechaInput");
const estadoInput = document.getElementById("estadoInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", agregarTarea);

function agregarTarea() {
    const nombre = nombreInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value;
    const estado = estadoInput.value;

    if (nombre === "") {
        alert("Por favor, ingrese el nombre de la tarea.");
        return;
    }

    const nuevaTarea = administrador.registrarTarea(nombre, descripcion, fecha, estado);

    mostrarTarea(nuevaTarea);

    nombreInput.value = "";
    descripcionInput.value = "";
    fechaInput.value = "";
    estadoInput.value = "pendiente";
}

function mostrarTarea(tarea) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.dataset.id = tarea.id;

    if (tarea.estado === "completada") {
        li.classList.add("list-group-item-success");
    } else if (tarea.estado === "en_progreso") {
        li.classList.add("list-group-item-warning");
    }

    li.innerHTML = `
        <div>
            <strong>${tarea.nombre}</strong>
            <small class="text-muted d-block">${tarea.descripcion}</small>
            <small class="text-muted">Fecha: ${tarea.fecha || "Sin fecha"} | Estado: ${tarea.estado}</small>
        </div>
        <div>
            <button class="btn btn-warning btn-sm me-1" onclick="editar(${tarea.id})">Editar</button>
            <button class="btn btn-success btn-sm me-1" onclick="cambiarEstado(${tarea.id})">Confirmar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminar(${tarea.id})">Eliminar</button>
        </div>
    `;

    taskList.appendChild(li);
}

function editar(id) {
    const tarea = administrador.obtenerTarea(id);

    if (tarea) {
        nombreInput.value = tarea.nombre;
        descripcionInput.value = tarea.descripcion;
        fechaInput.value = tarea.fecha;
        estadoInput.value = tarea.estado;

        addBtn.textContent = "Guardar Cambios";
        addBtn.classList.remove("btn-success");
        addBtn.classList.add("btn-primary");

        addBtn.dataset.editandoId = id;

        addBtn.removeEventListener("click", agregarTarea);
        addBtn.addEventListener("click", guardarEdicion);
    }
}

function guardarEdicion() {
    const id = parseInt(addBtn.dataset.editandoId);
    const nombre = nombreInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value;
    const estado = estadoInput.value;

    if (nombre === "") {
        alert("Por favor, ingrese el nombre de la tarea.");
        return;
    }

    administrador.modificarTarea(id, nombre, descripcion, fecha, estado);

    addBtn.textContent = "Agregar Tarea";
    addBtn.classList.remove("btn-primary");
    addBtn.classList.add("btn-success");
    delete addBtn.dataset.editandoId;

    addBtn.removeEventListener("click", guardarEdicion);
    addBtn.addEventListener("click", agregarTarea);

    nombreInput.value = "";
    descripcionInput.value = "";
    fechaInput.value = "";
    estadoInput.value = "pendiente";

    actualizarLista();
}

function cambiarEstado(id) {
    const tarea = administrador.obtenerTarea(id);

    if (tarea) {
        if (tarea.estado === "pendiente") {
            tarea.estado = "en_progreso";
        } else if (tarea.estado === "en_progreso") {
            tarea.estado = "completada";
        } else {
            tarea.estado = "pendiente";
        }

        actualizarLista();
    }
}

function eliminar(id) {
    administrador.eliminarTarea(id);

    actualizarLista();
}

function actualizarLista() {
    taskList.innerHTML = "";

    administrador.tareas.forEach(tarea => {
        mostrarTarea(tarea);
    });
}