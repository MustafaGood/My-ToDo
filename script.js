let tasks = [];
let completedCount = 0;

function addTask() {
    let input = document.getElementById("todoInput");
    let warningMessage = document.getElementById("warningMessage");
    let value = input.value.trim();

    if (value) {
        warningMessage.style.display = "none"; // Dölj varningen om den tidigare visades
        let task = {
            id: new Date().getTime(),
            text: value,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        input.value = "";
    } else {
        warningMessage.style.display = "block"; // Visa varningsmeddelandet
        input.classList.add("fel");
        setTimeout(() => input.classList.remove("fel"), 500);
    }
}

function toggleCompletion(id) {
    let task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            completedCount++;
        } else {
            completedCount--;
        }
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("todoList");
    list.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task.text;
        li.classList.add("new-task");
        setTimeout(() => li.classList.remove("new-task"), 500);

        if (task.completed) {
            li.classList.add("completed");
        }
        li.addEventListener("click", () => toggleCompletion(task.id));
        let deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "🗑️";
        deleteIcon.classList.add("delete");
        deleteIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            li.classList.add("deleting");
            setTimeout(() => {
                deleteTask(task.id);
            }, 500);
        });
        li.appendChild(deleteIcon);
        list.appendChild(li);
    });
    document.getElementById("completedCount").textContent = "completed: " + completedCount;
}
``
