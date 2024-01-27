"use strict";
let tasks = [];
const addButton = document.querySelector(".check");
const todoInput = document.querySelector(".todo");
const tasksDiv = document.querySelector(".tasks");

if (JSON.parse(localStorage.getItem("tasks"))) {
  //retrieve data from local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

const renderTasks = function (tasks) {
  if (tasks) {
    tasks.forEach((task) => {
      const taskHTML = `
    <div
    class="h-16 my-6 px-4 bg-white shadow-md rounded-xl flex items-center"
  >
    <input  type="checkbox" class="w-6 h-6 checkBTN" />
    <p class="text-2xl ml-3">${task}</p>
  </div>
  `;
      tasksDiv.insertAdjacentHTML("beforeend", taskHTML);
    });
  }
};

const hideButton = function () {
  addButton.classList.toggle("cursor-pointer");
  addButton.classList.toggle("opacity-0");
  addButton.setAttribute("disabled", "");
};

window.addEventListener("load", renderTasks(tasks));

todoInput.addEventListener("input", function () {
  //animate and disable the add task button
  if (todoInput.value) {
    addButton.removeAttribute("disabled", "");
    addButton.classList.add("cursor-pointer");
    addButton.classList.remove("opacity-0");
  }
  if (!todoInput.value) {
    hideButton();
  }
});

addButton.addEventListener("click", function () {
  //1) trim task
  const task = todoInput.value.slice(0, 25);

  //2) push the task to the tasks array and render the ui
  tasks.push(task);
  tasksDiv.innerHTML = "";
  renderTasks(tasks);

  //3) save into the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //4) clear the ui
  todoInput.value = "";
  hideButton();
});

tasksDiv.addEventListener("click", function (e) {
  //targeting the checkbox
  if (e.target.classList.contains("checkBTN")) {
    const index = tasks.indexOf(e.target.nextElementSibling.innerHTML);
    if (index > -1) {
      //remove the task from the array and save the new array
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      //re-render ui
      tasksDiv.innerHTML = "";
      renderTasks(tasks);
    }
  }
});

// localStorage.clear();
