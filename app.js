const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete");
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = "";
}
