// Data storage for tasks for each user
const users = {
    "User 1": [],
    "User 2": [],
    "User 3": [],
    "User 4": [],
    "User 5": []
};

let currentUser = "User 1"; // Default user
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearTasksBtn = document.getElementById("clearTasksBtn");
const userSelect = document.getElementById("userSelect");
const loadListBtn = document.getElementById("loadListBtn");
const listTitle = document.getElementById("listTitle");

// Event listener to switch user
userSelect.addEventListener("change", () => {
    currentUser = userSelect.value;
    loadTaskList();
});

// Event listener to load user task list
loadListBtn.addEventListener("click", loadTaskList);

// Add new task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        users[currentUser].push(task);
        taskInput.value = "";  // Clear the input field
        loadTaskList();        // Reload the task list
    }
});

// Clear all tasks for current user
clearTasksBtn.addEventListener("click", () => {
    if (confirm(`Are you sure you want to clear all tasks for ${currentUser}?`)) {
        users[currentUser] = [];
        loadTaskList();
    }
});

// Delete task
function deleteTask(index) {
    users[currentUser].splice(index, 1);
    loadTaskList();
}

// Edit task
function editTask(index) {
    const newTask = prompt("Edit task:", users[currentUser][index]);
    if (newTask !== null && newTask.trim() !== "") {
        users[currentUser][index] = newTask.trim();
        loadTaskList();
    }
}

// Load the task list for the selected user
function loadTaskList() {
    const tasks = users[currentUser];
    listTitle.textContent = `Todo List for ${currentUser}`;
    taskList.innerHTML = "";  // Clear existing task list

    // Loop through tasks and create list items
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Initial load of the task list for the default user
loadTaskList();
