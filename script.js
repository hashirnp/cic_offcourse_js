  // Function to load tasks from local storage
  loadTasks("all");
  function loadTasks(filterType) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      if (
        (filterType === "completed" && task.completed) ||
        (filterType === "pending" && !task.completed) ||
        filterType === "all"
      ) {
        const li = document.createElement("li");
        li.className = `list-group-item task-item`;
        li.innerHTML = `<div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="${
                                      task.id
                                    }" ${
          task.completed ? "checked" : ""
        } onchange="toggleCompletion('${task.id}', '${filterType}')">
                                    <label class="form-check-label ${
                                      task.completed ? "completed" : ""
                                    }" for="${task.id}">
                                        ${task.name}
                                    </label>
                                    <button class="btn btn-sm btn-success float-right mr-2" onclick="editTask('${
                                      task.id
                                    }')">Edit</button> 
                                    <button class="btn btn-sm btn-danger float-right mr-2"" onclick="deleteTask('${
                                      task.id
                                    }')">Delete</button>
                                </div>`;
        taskList.appendChild(li);
      }
    });
    highlightFilterButton(filterType);
  }

  // Function to save tasks to local storage
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to add a new task
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks(tasks);
      taskInput.value = ""; // Clear the input after adding the task

      loadTasks("all");
    }
  }

  // Function to delete a task
  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
    loadTasks("all");
  }

  // Function to toggle task completion
  function toggleCompletion(id, filterType) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    saveTasks(tasks);
    loadTasks(filterType);
  }

  // Function to edit a task
  function editTask(id) {
    let newName = prompt("Enter new name for the task:");
    if (newName !== null && newName.trim() !== "") {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map((task) => {
        if (task.id === id) {
          task.name = newName.trim();
          task.completed = false;
        }
        return task;
      });
      saveTasks(tasks);
      loadTasks("all");
    }
  }

  // Function to filter tasks
  function filterTasks(filterType) {
    loadTasks(filterType);
  }

  // Function to highlight active filter button and focus on it
  function highlightFilterButton(filterType) {
    const filterButtons = document.querySelectorAll(
      "#filterButtons button"
    );
    filterButtons.forEach((button) => {
      button.classList.remove("active");
      button.removeAttribute("autofocus"); // Remove autofocus from all buttons
    });

   

    const filterButtonsContainer = document.getElementById("filterButtons");

    // Get all the filter buttons within the container
    const activeButton = document.querySelector(
      `.filter-btn.${filterType}-btn`
    );
    // console.log(filterButtonss);

    if (activeButton) {
      activeButton.classList.add("active");
      activeButton.setAttribute("autofocus", "autofocus"); // Set autofocus on the selected button

      // Change color for the active filter button
    //   activeButton.style.backgroundColor = "#ffc107"; // Yellow

    }
  }

  // Highlight the filter button when the DOM content is loaded
  document.addEventListener("DOMContentLoaded", function () {
    highlightFilterButton("all"); // Assuming 'all' is the default filter
  });