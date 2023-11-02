import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { TaskModel } from "./models/Task";

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");
const blockUserNav = document.querySelector("#blockUserNav");
const blockUserRotate = document.querySelector("#vector");
const buttonUser = document.querySelector("#itemVector");
const buttonLogOut = document.querySelector("#logOut");
const countTask = document.querySelector("#countTask");
const boardName = document.querySelector("#boardName");
const noAuthFooter = document.querySelector("#noAuthFooter");


buttonUser.addEventListener("click", () => {
    blockUserRotate.classList.toggle("rotate");
});
buttonLogOut.addEventListener("click", () => {
    document.querySelector("#content").innerHTML =
        "Please Sign In to see your tasks!";
    loginForm.classList.remove("hidden");
    loginForm.classList.add("d-flex");
    blockUserNav.classList.remove("viev");
    countTask.classList.remove("vievCountPosition");
    boardName.classList.add("vievBoardName");
    noAuthFooter.classList.remove("hidden");
});

generateTestUser(User);



loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const login = formData.get("login");
    const password = formData.get("password");
    let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

    if (authUser(login, password)) {
        loginForm.classList.add("hidden");
        loginForm.classList.remove("d-flex");
        blockUserNav.classList.add("viev");
        blockUserRotate.classList.toggle(".rotate");
        countTask.classList.add("vievCountPosition");
        boardName.classList.remove("vievBoardName");
        noAuthFooter.classList.add("hidden");
       // console.log(addTicket);
    }

    if (!authUser(login, password)) {
        alert("Error");
    }


    document.querySelector("#content").innerHTML = fieldHTMLContent;


   const readyButton = document.querySelector("#ready-addtask-btn");
const viewModal = document.querySelector("#modalTikketViev");
const modal = document.querySelector("#modalTicket")

readyButton.addEventListener("click", (e) => {
  viewModal.classList.add("myModal");
  modal.classList.add("modalWindow")
});
    
    const addTicket = document.querySelector("#submitTicket");
    console.log(addTicket);



////
let tasksReady = [];

let tasksInProgress = [];

let tasksFinish = [];

const readyColumn = document.querySelector('#ready');
const savedTasksReady = localStorage.getItem('tasksReady');
console.log(savedTasksReady)



///
const contSelect = document.querySelector("#contSelect");
///
const selectTicket = document.querySelector("#selectTicket");

///
const inprogressButton = document.querySelector("#inprogress-addtask-btn");

///
if (tasksReady.length === 0) {
    inprogressButton.disabled = true; 
  } 



//

inprogressButton.addEventListener('click', ()=>{
    contSelect.classList.add("modalSelect")
})

//

//
const submitToGo = document.querySelector("#submitToGo");

const inProgressColumn = document.querySelector("#inprogress");

console.log(submitToGo);



///////////////////////////////////////////Колонка Finish //////////////////////////////////////////////////////////////////////////////////////
const submitToGoInFinish = document.querySelector("#submitToGoInFinish");//
const selectTicketFinich = document.querySelector("#selectTicketFinich");
const finishedColumn = document.querySelector("#finished");
const finishButton = document.querySelector("#finished-addtask-btn")
const contSelectFinish = document.querySelector("#contSelectFinish")

if (tasksInProgress.length === 0) {
  finishButton.disabled = true; 
} 

const savedtasksFinish = localStorage.getItem('tasksFinish');
console.log(savedtasksFinish)


if (savedtasksFinish) {
  tasksFinish = JSON.parse(savedtasksFinish);
  console.log(finishedColumn);
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

 
  tasksFinish.forEach((selectedTaskFinish) => {
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${selectedTaskFinish.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${selectedTaskFinish.title}</b></p>
        <p class="taskText">Задача: <b>${selectedTaskFinish.description}</b></p>
      </div>
    `;

    finishedColumn.appendChild(newItem);
  });
  
}


finishButton.addEventListener('click', ()=>{
  contSelectFinish.classList.add("modalSelect")
})


submitToGoInFinish.addEventListener('click', () => {
  const selectedTaskIndexFinish = selectTicketFinich.value; // Получаем индекс выбранной задачи из <select>
  const selectedTaskFinish = tasksInProgress.splice(selectedTaskIndexFinish, 1)[0]; // Удаляем выбранный элемент из массива

  tasksFinish.push(selectedTaskFinish);
  console.log(tasksFinish)

  console.log(selectedTaskIndexFinish);
  console.log(selectedTaskFinish);

  const selectedTicketBlock = inProgressColumn.childNodes[selectedTaskIndexFinish];
  inProgressColumn.removeChild(selectedTicketBlock);
 

  // Добавляем удаленный элемент в другую колонку
  const newItem = document.createElement('li');
  newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTaskFinish.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTaskFinish.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTaskFinish.description}</b></p>
    </div>
  `;

  finishedColumn.appendChild(newItem);

  selectTicketFinich.options[selectedTaskIndexFinish].remove();

  // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndexFinish; i < selectTicketFinich.options.length; i++) {
    selectTicketFinich.options[i].value = parseInt(selectTicketFinich.options[i].value) - 1;
  }
  
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));

  contSelectFinish.classList.remove("modalSelect")
});


//////////////////////////////////////////Колонка inProgress и удаление из массива в селекте задачи/////////////////////////////////////////////

const savedTasksinProgress = localStorage.getItem('tasksInProgress');
console.log(savedTasksinProgress)




if (savedTasksinProgress) {
  tasksInProgress = JSON.parse(savedTasksinProgress);
  console.log(tasksInProgress);
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
 
  tasksInProgress.forEach((task, index) => {
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
      </div>
    `;

    inProgressColumn.appendChild(newItem);

   

    tasksInProgress.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicketFinich.appendChild(option);
    });
  
    selectTicketFinich.innerHTML = '';
  
   
  
    tasksInProgress.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicketFinich.appendChild(option);
    });
  });
  
}
/////////////////////////////////////////////////////////////////////////////

submitToGo.addEventListener('click', () => {
  const selectedTaskIndex = selectTicket.value; // Получаем индекс выбранной задачи из <select>
  const selectedTask = tasksReady.splice(selectedTaskIndex, 1)[0]; // Удаляем выбранный элемент из массива

  tasksInProgress.push(selectedTask);
  console.log(tasksInProgress)

  console.log(selectedTaskIndex);
  console.log(selectedTask);

  const selectedTicketBlock = readyColumn.childNodes[selectedTaskIndex];
  readyColumn.removeChild(selectedTicketBlock);
 

  // Добавляем удаленный элемент в другую колонку
  const newItem = document.createElement('li');
  newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTask.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTask.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTask.description}</b></p>
    </div>
  `;

  inProgressColumn.appendChild(newItem);

  selectTicket.options[selectedTaskIndex].remove();

  // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndex; i < selectTicket.options.length; i++) {
    selectTicket.options[i].value = parseInt(selectTicket.options[i].value) - 1;
  }
  
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  contSelect.classList.remove("modalSelect")

  tasksInProgress.forEach((task, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
  });

  selectTicketFinich.innerHTML = '';

 

  tasksInProgress.forEach((task, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
  });

     // Сохраняем массив в локальное хранилище
     localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
});




//////////////////////////////////////////Колонка Ready и вывод из массива в селект задачи/////////////////////////////////////////////
if (savedTasksReady) {
  tasksReady = JSON.parse(savedTasksReady);
  console.log(tasksReady);
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksReady.forEach((task, index) => {
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
      </div>
    `;

    readyColumn.appendChild(newItem);

    tasksReady.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    });
  
    selectTicket.innerHTML = '';
  
    tasksReady.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    });
  });
}

addTicket.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Кнопка нажата!');
  const addUser = document.querySelector('#selectUser').value;
  const addTitle = document.querySelector('#textTitlie').value;
  const addText = document.querySelector('#textTicket').value;
  console.log(addUser);
  console.log(addTitle);
  console.log(addText);
  const task = new TaskModel(addUser, addTitle, addText);
  console.log(task);
  tasksReady.push(task);
  console.log(tasksReady);

 
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
      </div>
    `;

    readyColumn.appendChild(newItem);
  

  tasksReady.forEach((task, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);
  });

  selectTicket.innerHTML = '';

  tasksReady.forEach((task, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);
  });

  // Сохраняем массив tasksReady в локальное хранилище
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));

  tasksReady.length ? (inprogressButton.disabled = false) : (inprogressButton.disabled = true);

  viewModal.classList.remove('myModal');
  modal.classList.remove('modalWindow');
  modal.classList.add('hidden');
});
})



