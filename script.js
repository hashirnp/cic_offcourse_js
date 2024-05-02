document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');
    const taskInput = document.getElementById('taskInput');
    const filterSelect = document.getElementById('filterSelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const actionButtons = document.getElementById('actionButtons');
    const noTodosMessage = document.getElementById('noTodosMessage');
    const deleteTaskModal = new bootstrap.Modal(document.getElementById('deleteTaskModal'));
    const updateTaskModal = new bootstrap.Modal(document.getElementById('updateTaskModal'));
  
    let todos = [];
  
    // Load todos from local storage
    if (localStorage.getItem('todos')) {
      todos = JSON.parse(localStorage.getItem('todos'));
      renderTodos();
    }
  
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', 'mb-2', 'p-2', 'border', 'rounded');
        todoItem.classList.toggle('completed', todo.completed);
        todoItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="mr-2">
              <span>${todo.task}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-danger delete-btn ml-2" data-index="${index}">Delete</button>
              <button class="btn btn-sm btn-secondary update-btn ml-2" data-index="${index}">Update</button>
              <button class="btn btn-sm btn-primary complete-btn ml-2" data-index="${index}">${todo.completed ? 'Uncomplete' : 'Complete'}</button>
            </div>
          </div>
        `;
        todoList.appendChild(todoItem);
  
        // Add event listener to toggle completion status
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          todos[index].completed = checkbox.checked;
          saveTodos();
          renderTodos();
        });
  
        // Add event listener to delete todo
        const deleteBtn = todoItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          deleteTaskModal.show();
          const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
          confirmDeleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            deleteTaskModal.hide();
            renderTodos();
          });
        });
  
        // Add event listener to update todo
        const updateBtn = todoItem.querySelector('.update-btn');
        updateBtn.addEventListener('click', () => {
          const updatedTaskInput = document.getElementById('updatedTaskInput');
          updatedTaskInput.value = todos[index].task;
          updateTaskModal.show();
          const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
          confirmUpdateBtn.addEventListener('click', () => {
            todos[index].task = updatedTaskInput.value;
            saveTodos();
            updateTaskModal.hide();
            renderTodos();
          });
        });
  
        // Add event listener to complete todo
        const completeBtn = todoItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => {
          todos[index].completed = !todos[index].completed;
          saveTodos();
          renderTodos();
        });
      });
  
      // Show action buttons if there are todos
      actionButtons.style.display = todos.length > 0 ? 'flex' : 'none';
  
      // Show no todos message if there are no todos
      noTodosMessage.style.display = todos.length === 0 ? 'block' : 'none';
    }
  
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function filterTodos(filter) {
      let filteredTodos = [];
      if (filter === 'all') {
        filteredTodos = todos;
      } else if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
      } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
      }
      return filteredTodos;
    }
  
    addTaskBtn.addEventListener('click', () => {
      const task = taskInput.value.trim();
      if (task !== '') {
        todos.push({ task: task, completed: false });
        saveTodos();
        renderTodos();
        taskInput.value = '';
      } else {
        showAlert('Please enter a task.');
      }
    });
  
    filterSelect.addEventListener('change', () => {
      const filter = filterSelect.value;
      const filteredTodos = filterTodos(filter);
      todoList.innerHTML = '';
      filteredTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', 'mb-2', 'p-2', 'border', 'rounded');
        todoItem.classList.toggle('completed', todo.completed);
        todoItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="mr-2">
              <span>${todo.task}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-danger delete-btn ml-2">Delete</button>
              <button class="btn btn-sm btn-secondary update-btn ml-2">Update</button>
              <button class="btn btn-sm btn-primary complete-btn ml-2">${todo.completed ? 'Uncomplete' : 'Complete'}</button>
            </div>
          </div>
        `;
        todoList.appendChild(todoItem);
  
        // Add event listener to toggle completion status
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          const index = todos.findIndex(t => t.task === todo.task);
          todos[index].completed = checkbox.checked;
          saveTodos();
          renderTodos();
        });
  
        // Add event listener to delete todo
        const deleteBtn = todoItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          const index = todos.findIndex(t => t.task === todo.task);
          deleteTaskModal.show();
          const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
          confirmDeleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            deleteTaskModal.hide();
            renderTodos();
          });
        });
  
        // Add event listener to update todo
        const updateBtn = todoItem.querySelector('.update-btn');
        updateBtn.addEventListener('click', () => {
          const updatedTaskInput = document.getElementById('updatedTaskInput');
          updatedTaskInput.value = todo.task;
          updateTaskModal.show();
          const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
          confirmUpdateBtn.addEventListener('click', () => {
            const index = todos.findIndex(t => t.task === todo.task);
            todos[index].task = updatedTaskInput.value;
            saveTodos();
            updateTaskModal.hide();
            renderTodos();
          });
        });
  
        // Add event listener to complete todo
        const completeBtn = todoItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => {
          const index = todos.findIndex(t => t.task === todo.task);
          todos[index].completed = !todos[index].completed;
          saveTodos();
          renderTodos();
        });
      });
  
      // Show action buttons if there are todos
      actionButtons.style.display = todos.length > 0 ? 'flex' : 'none';
  
      // Show no todos message if there are no todos
      noTodosMessage.style.display = todos.length === 0 ? 'block' : 'none';
    });
  
    // Add event listener to cancel delete modal
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    cancelDeleteBtn.addEventListener('click', () => {
      deleteTaskModal.hide();
    });
  
    // Add event listener to close update modal
    const closeUpdateBtn = document.getElementById('closeUpdateBtn');
    closeUpdateBtn.addEventListener('click', () => {
      updateTaskModal.hide();
    });

    const cancelDeleteBtnText = document.getElementById('cancelDeleteBtnText');
    cancelDeleteBtnText.addEventListener('click', () => {
      deleteTaskModal.hide();
    });
  
    // Add event listener to close update modal
    const closeUpdateBtnText = document.getElementById('closeUpdateBtnText');
    closeUpdateBtnText.addEventListener('click', () => {
      updateTaskModal.hide();
    });
  });
  