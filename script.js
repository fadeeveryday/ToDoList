const dom = {
  new: document.getElementById('new'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks'),
}
//array of tasks 
let tasks = [];

let local = localStorage.getItem('ArrayOfTasks');

if (local != undefined) {
  tasks = JSON.parse(local);
  tasksRender(tasks)
}


// Add new task when user clicked on button
dom.add.onclick = () => {
  const NewTaskText = dom.new.value;
  if (NewTaskText && isNotHaveTask(NewTaskText, tasks)) {
    addTask(NewTaskText, tasks);
    dom.new.value = '';
    tasksRender(tasks);
  }
}

//func for user click on enter and work of input
function checkForEnter(key) {
  if (key.keyCode == 13) { 
    document.querySelector(".todo__new .todo_add").click();
  }
}

//function for add a task
function addTask(text, list) {
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text,
    isComplete: false
  }
  list.push(task);
  localStorage.setItem('ArrayOfTasks', JSON.stringify(list));
}

//func for check task on array of tasks
function isNotHaveTask(text, list) {
  let isNotHave = true;

  list.forEach((task) => {
    if (task.text === text) {
      alert('This task already exist');
      isNotHave = false;
    }
  });

  return isNotHave;
}

//func which return list of task 
function tasksRender(list) {
  let htmlList = '';

  list.forEach((task) =>{
    const cls = task.isComplete ? "todo__task todo__task_complete" : "todo__task";
    const checked = task.isComplete ? "checked" : "" ;

    const taskHtml = `
    <div  id="${task.id}" class="${cls}">
      <label class="todo__checkbox">
        <input type="checkbox" ${checked}>
        <div class="todo__checkbox-div"></div>
      </label>
      <div class="todo__task-text">${task.text}</div>
      <div class="todo__task-del">-</div>
    </div>
    `

    htmlList = htmlList + taskHtml;
  })

  dom.tasks.innerHTML = htmlList;
}

//func for track click on checkbox
dom.tasks.onclick = (event) => {
  const target = event.target;
  const isCheckboxEl = target.classList.contains("todo__checkbox-div");
  const isDeleteEl = target.classList.contains("todo__task-del");
  if (isCheckboxEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, tasks);
    tasksRender(tasks);
  }
  if (isDeleteEl) {
    const task = target.parentElement;
    const taskId = task.getAttribute('id');
    deleteTask(taskId, tasks); 
    tasksRender(tasks);
  }
}

//func for change status of task
function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
    }
  })
} 

//func for delete task
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  })
}

//func for save data on localStorage
// function saveData(list, local) {
  // if (local !== '' && local !== null) {
    // list = JSON.parse(local)
    // tasksRender(list);
  // } 
  // tasksRender(list);
  /*else {
    tasksRender(list);
  } */
// }