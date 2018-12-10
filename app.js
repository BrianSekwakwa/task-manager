const form = document.querySelector('form');;
const task = document.getElementById('enterTasks');
const unorderedList = document.querySelector('ul');
const clearTasks = document.querySelector('#Clear');
const filterTask = document.querySelector('#filter');
const theBody = document.querySelector('body');



form.addEventListener('submit', getTaskValue);
unorderedList.addEventListener('click', removeItem);
clearTasks.addEventListener('click', clearTaskManager);
filterTask.addEventListener('keyup', filterTasks);
theBody.addEventListener('DOMContentLoaded', updatePage);


function getTaskValue(e){ 
  if (task.value.toLowerCase() === '') {
    alert('Enter a task before submitting');
  } else {
    createListElememnt(task.value.toLowerCase());
    addToLocalStorage(task.value.toLowerCase());
  }
  e.preventDefault();
  task.value = '';
}

function createListElememnt(e) {
  const listElement = document.createElement('li');
  listElement.innerHTML = `${e}<i class="fas fa-times pointer removeTask"></i>`;
  appendToList(listElement);
}

function appendToList(e) {
  unorderedList.appendChild(e);
}

function removeItem(e) {
  if (e.target.classList.contains('removeTask')) {
    e.target.parentElement.remove();
    delItemFromLocalStorage(e.target.parentElement);
  }
}

function clearTaskManager(e) {
  unorderedList.innerHTML = '';
  localStorage.clear();
}

function filterTasks(e) {
  const filterValue = e.target.value.toLowerCase();
  document.querySelectorAll('li').forEach(function (item) {
    if (item.textContent.includes(filterValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })
}

function addToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null ) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function delItemFromLocalStorage(taskElement) {
  tasks =  JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(function (item, index) {   
    if (taskElement.textContent === item) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
   });
}


function updatePage() {
  if (localStorage.getItem('tasks') === null) {
    console.log('i am empty');
  } else {
    
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (params) {
      let listElement = document.createElement('li');
      listElement.innerHTML = `${params}<i class="fas fa-times pointer removeTask"></i>`;
      unorderedList.appendChild(listElement);
    });
  }
}

updatePage();

