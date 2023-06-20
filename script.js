let todoInput, errorInfo, addBtn, ulList;
let modal; // entire modal
let modalInfo; // text in modal, when empty string is added
let modalEditTask; // edited task
let modalInput; // input in modal window
let modalConfirmBtn; // 'confirm' button in modal
let modalCancelBtn; // 'cancel' button in modal

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

// const itemsArray = localStorage.getItem('items')
// 	? JSON.parse(localStorage.getItem('items'))
// 	: [];

// const item = document.querySelector('.item');

// const createItem = item => {
// 	itemsArray.push(item);
// 	localStorage.setItem('items', JSON.stringify(itemsArray));
// 	// location.reload();
// };

// const deleteItem = i => {
// 	itemsArray.splice(i, 1);
// 	localStorage.setItem('items', JSON.stringify(itemsArray));
// 	location.reload();
// };

// const updateItem = (text, i) => {
// 	itemsArray[i] = text;
// 	localStorage.setItem('items', JSON.stringify(itemsArray));
// 	location.reload();
// };

const prepareDOMElements = () => {
	// getting todo list elements:
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	// modal elements:
	modal = document.querySelector('.popup');
	modalInfo = document.querySelector('.popup-info');
	modalInput = document.querySelector('.popup-input');
	modalConfirmBtn = document.querySelector('.accept');
	modalCancelBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	// adding all listeners
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClick);
	modalCancelBtn.addEventListener('click', closeModal);
	modalConfirmBtn.addEventListener(
		'click',
		changeModalText
	);
	todoInput.addEventListener('keyup', enterKeyCheck);
};

// 1) Create function to add new tasks:

const addNewTask = () => {
	if (todoInput.value === '') {
		errorInfo.textContent = 'Enter Task!';
	} else {
		const newTask = document.createElement('li');
		// newTask.classList.add('item');
		newTask.textContent = todoInput.value; // input.value(todoInput) = newTask.textContent
		createToolItems(newTask); // calling createToolItems() function to add tools to the newTask:'newTask' parameter replaces 'newItem' parameter while calling createToolItems() here, because newTask is only local to this function and appends its tools here:
		//appending <li> with newTask to the list.
		ulList.appendChild(newTask);
		// cleaning the input and error msg after entering:
		todoInput.value = '';
		errorInfo.textContent = '';
	}
};

// 2) Create function creating new tool's panel:
const createToolItems = newItem => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	// 'newItem' is the parameter of this function, it can be replaced by other parameters while this function is called in another function (like above in addNewTask()):
	newItem.append(toolsPanel);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};
// 3) Creating function that checks the buttons on the task:
const checkClick = e => {
	// if target hits button 'complete' the parent li elements with text toggles class='completed' from css:
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		// adding class='completed' to the button icon itself:
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editModal(e);
	} else if (e.target.matches('.delete')) {
		deleteTask(e);
	}
};
// 4) Creating functions to open & close modal window:
const editModal = e => {
	// assigning the edited task to the element 'li' that holds its text:
	modalEditTask = e.target.closest('li');
	// assigning to the modal input.value the 'li' element that has the task description:
	modalInput.value = modalEditTask.firstChild.textContent;
	modal.style.display = 'flex'; // modal changes display in class='popup' to 'flex':
};
const closeModal = () => {
	modal.style.display = 'none'; // the reverse
	modalInfo.textContent = '';
};
// 5) Function to edit tasks in the modal window:
const changeModalText = () => {
	if (modalInput.value !== '') {
		// assigning to the 'li' with task description, the content of the modal input:
		modalEditTask.firstChild.textContent = modalInput.value;
		modal.style.display = 'none';
		modalInfo.textContent = '';
	} else {
		modalInfo.textContent =
			'Please enter task description!';
	}
};

// 6) Function to remove tasks using 'Delete' button:
const deleteTask = e => {
	// removing the closest 'li' element with the task
	e.target.closest('li').remove();
	// qsAll creates element-array, and we can use its length to check if its empty or not:
	const allTasks = ulList.querySelectorAll('li');
	if (allTasks.length === 0) {
		errorInfo.textContent = 'List is empty!';
	}
};

// 7) adding new tasks using 'Enter' key:
const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

document.addEventListener('DOMContentLoaded', main);
