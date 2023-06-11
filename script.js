let todoInput, errorInfo, addBtn, ulList, newTask;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	// getting all elements
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
};

const prepareDOMEvents = () => {
	// adding all listeners
	addBtn.addEventListener('click', addNewTask);
};

// 1) Create function to add new tasks:
// input.value(todoInput) = newItem.textContent
const addNewTask = () => {
	newTask = document.createElement('li');
	if (todoInput.value === '') {
		errorInfo.textContent = 'Enter Task!';
	} else {
		newTask = document.createElement('li');
		newTask.textContent = todoInput.value;
		ulList.appendChild(newTask);
		// cleaning the input and error msg after entering:
		todoInput.value = '';
		errorInfo.textContent = '';
	}
};

// 2) Create function ....

document.addEventListener('DOMContentLoaded', main);
