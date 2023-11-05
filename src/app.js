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


const modalEditTikketViev = document.querySelector("#modalEditTikketViev");
const modalEditTicket = document.querySelector("#modalEditTicket")
const editTitleModal = document.querySelector("#textEditTitlie")
const editTextModal = document.querySelector("#textEditTicket")
const submitEditTicket = document.querySelector("#submitEditTicket");

readyButton.addEventListener("click", (e) => {
  viewModal.classList.add("myModal");
  modal.classList.add("modalWindow")
});
    
    const addTicket = document.querySelector("#submitTicket");
    console.log(addTicket);


    if (login === "test") {
      readyButton.disabled = true;
    }


//// массиив колонки Ready
let tasksReady = [];
//// массиив колонки InProgress
let tasksInProgress = [];
//// массиив колонки Finish
let tasksFinish = [];
// получаем колонку Ready
const readyColumn = document.querySelector('#ready');
//Сохраняем массив Ready в сторадж
const savedTasksReady = localStorage.getItem('tasksReady');
console.log(savedTasksReady)



const finishedTask = document.querySelector("#finishedTasks");




//Вы водим в футер имя пользователя и текущий год
if (login === "admin") {
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear();
  
  boardName.innerHTML = `<p>${login},  ${formattedDate}</p>`;
}



/* Получаем данные из этого блока   
<div id="contSelect" class="hidden">
      <label for="selectTicket">Выберите задачу</label>
      <select id="selectTicket"  class="select-css"> 
     
        </select>
  
      <button id="submitToGo">Выбрать</button>
  </div>*/
const contSelect = document.querySelector("#contSelect");

const selectTicket = document.querySelector("#selectTicket");

/* Получаем данные с кнопки в колонке прогресса
  <button
        class="buttonCard"
        id="inprogress-addtask-btn"
        type="button"
      >
        + Add Card
      </button>*/
const inprogressButton = document.querySelector("#inprogress-addtask-btn");

///Блокируем кнопку добаление в колонке прогресс, если массив tasksReady пуст
if (tasksReady.length === 0) {
    inprogressButton.disabled = true; 
  } 
//

inprogressButton.addEventListener('click', ()=>{
    contSelect.classList.add("modalSelect")
})

//

/* Получаем кнопку с формы выбора задачи
 <div id="contSelect" class="hidden">
      <label for="selectTicket">Выберите задачу</label>
      <select id="selectTicket"  class="select-css"> 
     
        </select>
  
      <button id="submitToGo">Выбрать</button>
  </div>*/
const submitToGo = document.querySelector("#submitToGo");
//Получаем поле в колонке Прогресса
const inProgressColumn = document.querySelector("#inprogress");
//
console.log(submitToGo);





///////////////////////////////////////////Колонка Finish //////////////////////////////////////////////////////////////////////////////////////


const submitToGoInFinish = document.querySelector("#submitToGoInFinish");
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
  if (login === "admin"){
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
        <button id="EditView" class="edit">Edit</button>
        <button id="removeTikket" class="remove">Remove</button>
      </div>
    `;
    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;

    const removeButton = newItem.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      // Удаление задачи из DOM
      newItem.remove();
    
      // Удаление задачи из массива
      const selectedTaskIndex = tasksFinish.indexOf(selectedTaskFinish);
      if (selectedTaskIndex > -1) {
        tasksFinish.splice(selectedTaskIndex, 1);
      }

 

  let testUserFinished = 0

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
  
  tasksFinish.forEach((task) => {
  if(task.user === "test"){
    testUserFinished++
  }
  });
  const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = `Finished tasks: ${testUserFinished}`;
  
    
      tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
    
      // Сохраняем массив tasksReady в локальное хранилище
      localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
      localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
      localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
    });


    finishedColumn.appendChild(newItem);
  });
  
} else if (login === "test"){
  tasksFinish = JSON.parse(savedtasksFinish);
  console.log(finishedColumn);
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

 
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

  tasksFinish.forEach((selectedTaskFinish) => {
    const newItem = document.createElement('li');
    if (selectedTaskFinish.user === "test"){
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${selectedTaskFinish.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${selectedTaskFinish.title}</b></p>
        <p class="taskText">Задача: <b>${selectedTaskFinish.description}</b></p>
      </div>
    `;
  }
    finishedColumn.appendChild(newItem);

    let testUserFinished = 0

    tasksFinish.forEach((task) => {
    if(task.user === "test"){
      testUserFinished++
    }
    });
    const finishedTask = document.querySelector("#finishedTasks");
      finishedTask.textContent = `Finished tasks: ${testUserFinished}`;
  });

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
}
}


finishButton.addEventListener('click', ()=>{
  contSelectFinish.classList.add("modalSelect")
})


submitToGoInFinish.addEventListener('click', () => {
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
  if(login ==="admin"){
    newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTaskFinish.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTaskFinish.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTaskFinish.description}</b></p>
      <button id="EditView" class="edit">Edit</button>
      <button id="removeTikket" class="remove">Remove</button>
    </div>
  `;} else if (login==="test"){
    newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTaskFinish.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTaskFinish.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTaskFinish.description}</b></p>
    </div>
  `;
  }

if (login ==="admin"){
  const removeButton = newItem.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    // Удаление задачи из DOM
    newItem.remove();
  
    // Удаление задачи из массива
    const selectedTaskIndex = tasksFinish.indexOf(selectedTaskFinish);
    if (selectedTaskIndex > -1) {
      tasksFinish.splice(selectedTaskIndex, 1);
    }

      // Обновляем индексы оставшихся элементов списка
for (let i = selectedTaskIndexFinish; i < selectTicketFinich.options.length; i++) {
  selectTicketFinich.options[i].value = parseInt(selectTicketFinich.options[i].value) - 1;
}

let testUserFinished = 0


tasksFinish.forEach((task) => {
if(task.user === "test"){
  testUserFinished++
}
});
const finishedTask = document.querySelector("#finishedTasks");
  finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

  
    tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
  
    // Сохраняем массив tasksReady в локальное хранилище
    localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
  });
}
  finishedColumn.appendChild(newItem);

  let testUserFinished = 0
  
  
  tasksFinish.forEach((task) => {
  if(task.user === "test"){
    testUserFinished++
  }
  });
  const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

  selectTicketFinich.options[selectedTaskIndexFinish].remove();

  // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndexFinish; i < selectTicketFinich.options.length; i++) {
    selectTicketFinich.options[i].value = parseInt(selectTicketFinich.options[i].value) - 1;
  }
  
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));

  contSelectFinish.classList.remove("modalSelect")
});


//////////////////////////////////////////Колонка inProgress и удаление из массива в селекте задачи/////////////////////////////////////////////

const savedTasksinProgress = localStorage.getItem('tasksInProgress');
console.log(savedTasksinProgress)

finishedColumn.addEventListener('dragenter', (event) => {
  event.currentTarget.classList.add('drag-over');
});

finishedColumn.addEventListener('dragleave', (event) => {
  event.currentTarget.classList.remove('drag-over');
});
finishedColumn.addEventListener('dragover', (event) => {
  event.preventDefault();
});

finishedColumn.addEventListener('drop', (event) => {
  event.preventDefault();

  const selectedTaskIndexFinish = selectTicketFinich.value; // Получаем индекс выбранной задачи из <select>
  const selectedTaskFinish = tasksInProgress.splice(selectedTaskIndexFinish, 1)[0]; // Удаляем выбранный элемент из массива

  tasksFinish.push(selectedTaskFinish);
  console.log(tasksFinish)

  console.log(selectedTaskIndexFinish);
  console.log(selectedTaskFinish);

  const selectedTicketBlock = inProgressColumn.childNodes[selectedTaskIndexFinish];
  inProgressColumn.removeChild(selectedTicketBlock);
 

  // Добавляем удаленный элемент в другую колонку
  const data = event.dataTransfer.getData('text/plain');
 const newItem = document.createElement('li');
 newItem.innerHTML = data;
 finishedColumn.appendChild(newItem);

 localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));


///////////////////////////////////////////////////////
if (login === "admin"){
 const removeButton = newItem.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      newItem.remove();
    
      // Удаление задачи из массива
      const selectedTaskIndex = tasksFinish.indexOf(selectedTaskFinish);
      if (selectedTaskIndex > -1) {
        tasksFinish.splice(selectedTaskIndex, 1);
      }

        // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndexFinish; i < selectTicketFinich.options.length; i++) {
    selectTicketFinich.options[i].value = parseInt(selectTicketFinich.options[i].value) - 1;
  }

  let testUserFinished = 0
  
  
  tasksFinish.forEach((task) => {
  if(task.user === "test"){
    testUserFinished++
  }
  });
  const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = `Finished tasks: ${testUserFinished}`;
  
    
      tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
    
      // Сохраняем массив tasksReady в локальное хранилище
      localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
      localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
      localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
    });
  }


 event.currentTarget.classList.remove('drag-over');

 newItem.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', newItem.innerHTML);
  event.currentTarget.classList.add('dragging');
});

newItem.addEventListener('dragend', (event) => {
  event.currentTarget.classList.remove('dragging');
});

  let testUserFinished = 0
  
  
  tasksFinish.forEach((task) => {
  if(task.user === "test"){
    testUserFinished++
  }
  });
  const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

 

  selectTicketFinich.options[selectedTaskIndexFinish].remove();

  // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndexFinish; i < selectTicketFinich.options.length; i++) {
    selectTicketFinich.options[i].value = parseInt(selectTicketFinich.options[i].value) - 1;
  }
  
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));

  contSelectFinish.classList.remove("modalSelect")
 //update
});


if (savedTasksinProgress) {
  
  if (login ==="admin"){
  tasksInProgress = JSON.parse(savedTasksinProgress);
  console.log(tasksInProgress);

  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    
    }

  
  });

  selectTicketFinich.innerHTML = '';

 

  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    }
    
  });
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
 
  tasksInProgress.forEach((task, index) => {
    const newItem = document.createElement('li');
    newItem.setAttribute('draggable', 'true');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
        <button id="EditView" class="edit">Edit</button>
        <button id="removeTikket" class="remove">Remove</button>
      </div>
    `;
    newItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', newItem.innerHTML);
      event.currentTarget.classList.add('dragging');
    });
    
    newItem.addEventListener('dragend', (event) => {
      event.currentTarget.classList.remove('dragging');
    });

    const removeButton = newItem.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      // Удаление задачи из DOM
      newItem.remove();
    
      // Удаление задачи из массива
      const selectedTaskIndex = tasksInProgress.indexOf(task);
      if (selectedTaskIndex > -1) {
        tasksInProgress.splice(selectedTaskIndex, 1);
      }
    
      tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
    
      localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
      localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
      localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
    });


    inProgressColumn.appendChild(newItem);
    

    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;
    const activeTaskBlock = document.querySelector("#activeTasks");
    activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` :`Active tasks: ${tasksReady.length}`;

  
  
    selectTicketFinich.innerHTML = '';
  
   
  
    tasksInProgress.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicketFinich.appendChild(option);
    });
    console.log(inProgressColumn)
    localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
  });
} else if (login === "test"){
  tasksInProgress = JSON.parse(savedTasksinProgress);
  console.log(tasksInProgress);

  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    
    }

  
  });

  selectTicketFinich.innerHTML = '';

 

  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    }
    
  });

///
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;


  tasksInProgress.forEach((task, index) => {
    const newItem = document.createElement('li');
    newItem.setAttribute('draggable', 'true');
    if (task.user === "test"){
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
      </div>
    `;
    }

    newItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', newItem.innerHTML);
      event.currentTarget.classList.add('dragging');
    });
    
    newItem.addEventListener('dragend', (event) => {
      event.currentTarget.classList.remove('dragging');
    });

    
    inProgressColumn.appendChild(newItem);
 

   

    tasksInProgress.forEach((task, index) => {
      if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicketFinich.appendChild(option);
      
      }

    
    });
  
    selectTicketFinich.innerHTML = '';
  
   
  
    tasksInProgress.forEach((task, index) => {
      if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicketFinich.appendChild(option);
      }
      
    });

    let testUserFinished = 0
  
  
    tasksFinish.forEach((task) => {
    if(task.user === "test"){
      testUserFinished++
    }
    });
    const finishedTask = document.querySelector("#finishedTasks");
      finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

    
  });

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
}
}


inProgressColumn.addEventListener('dragenter', (event) => {
  event.currentTarget.classList.add('drag-over');
});

inProgressColumn.addEventListener('dragleave', (event) => {
  event.currentTarget.classList.remove('drag-over');
});
inProgressColumn.addEventListener('dragover', (event) => {
  event.preventDefault();
});

inProgressColumn.addEventListener('drop', (event) => {
  event.preventDefault();

  tasksFinish = JSON.parse(savedtasksFinish);
  console.log(finishedColumn);
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  
  
  tasksFinish = JSON.parse(savedtasksFinish);
  console.log(finishedColumn);
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

 
  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    
    }

  
  });

  selectTicketFinich.innerHTML = '';

 

  tasksInProgress.forEach((task, index) => {
    if (task.user === "test") {
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicketFinich.appendChild(option);
    }
    
  });
  //изменения

  const selectedTaskIndex = selectTicket.value; // Получаем индекс выбранной задачи из <select>
  const selectedTask = tasksReady.splice(selectedTaskIndex, 1)[0]; // Удаляем выбранный элемент из массива

  tasksInProgress.push(selectedTask);
  console.log(tasksInProgress)

  console.log(selectedTaskIndex);
  console.log(selectedTask);

  const selectedTicketBlock = readyColumn.childNodes[selectedTaskIndex];
  readyColumn.removeChild(selectedTicketBlock);
 

  // Добавляем удаленный элемент в другую колонку
  const data = event.dataTransfer.getData('text/plain');
  const newItem = document.createElement('li');
  newItem.setAttribute('draggable', 'true');
  newItem.innerHTML = data;
  inProgressColumn.appendChild(newItem);
  event.currentTarget.classList.remove('drag-over');

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));

  newItem.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', newItem.innerHTML);
    event.currentTarget.classList.add('dragging');
  });
  

  newItem.addEventListener('dragend', (event) => {
    event.currentTarget.classList.remove('dragging');
  });

if (login === "admin"){
  const removeButton = newItem.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    // Удаление задачи из DOM
    newItem.remove();
  
    // Удаление задачи из массива
    const selectedTaskIndex = tasksInProgress.indexOf(selectedTask);
    if (selectedTaskIndex > -1) {
      tasksInProgress.splice(selectedTaskIndex, 1);
    }
  
    tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
  });
}
  const activeTaskBlock = document.querySelector("#activeTasks");
  activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` :`Active tasks: ${tasksReady.length}`;

    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;

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

  let testUserFinished = 0
  
  
tasksFinish.forEach((task) => {
if(task.user === "test"){
  testUserFinished++
}
});
//const finishedTask = document.querySelector("#finishedTasks");
  finishedTask.textContent = `Finished tasks: ${testUserFinished}`;
});

/////////////////////////////////////////////////////////////////////////////

submitToGo.addEventListener('click', () => {

  tasksReady.forEach((task, index) => {
    
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);
  
});

// Очищаем селект перед добавлением новых опций
selectTicket.innerHTML = "";

tasksReady.forEach((task, index) => {
  
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);

});

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
  newItem.setAttribute('draggable', 'true');
  if(login ==="admin"){
    newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTask.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTask.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTask.description}</b></p>
      <button id="EditView" class="edit">Edit</button>
      <button id="removeTikket" class="remove">Remove</button>
    </div>
  `;} else if (login==="test"){
    newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${selectedTask.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${selectedTask.title}</b></p>
      <p class="taskText">Задача: <b>${selectedTask.description}</b></p>
    </div>
  `;
  }
  newItem.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', newItem.innerHTML);
    event.currentTarget.classList.add('dragging');
  });
  
  newItem.addEventListener('dragend', (event) => {
    event.currentTarget.classList.remove('dragging');
  });
 if (login === "admin"){
  const removeButton = newItem.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    // Удаление задачи из DOM
    newItem.remove();
  
    // Удаление задачи из массива
    const selectedTaskIndex = tasksInProgress.indexOf(selectedTask);
    if (selectedTaskIndex > -1) {
      tasksInProgress.splice(selectedTaskIndex, 1);
    }
  
    tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;
  });
}

  inProgressColumn.appendChild(newItem);

  


  const activeTaskBlock = document.querySelector("#activeTasks");
  activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` :`Active tasks: ${tasksReady.length}`;

    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;

  selectTicket.options[selectedTaskIndex].remove();

  // Обновляем индексы оставшихся элементов списка
  for (let i = selectedTaskIndex; i < selectTicket.options.length; i++) {
    selectTicket.options[i].value = parseInt(selectTicket.options[i].value) - 1;
  }
  
  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;

  contSelect.classList.remove("modalSelect")

  tasksReady.forEach((task, index) => {
    
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);
  
});

// Очищаем селект перед добавлением новых опций
selectTicket.innerHTML = "";

tasksReady.forEach((task, index) => {
  
    const option = document.createElement('option');
    option.value = index;
    option.text = task.title;
    selectTicket.appendChild(option);

});

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

  tasksFinish = JSON.parse(savedtasksFinish);
  console.log(finishedColumn);
  tasksInProgress.length === 0 ? finishButton.disabled = true : finishButton.disabled = false;


  let testUserFinished = 0
  
  
tasksFinish.forEach((task) => {
if(task.user === "test"){
  testUserFinished++
}
});
//const finishedTask = document.querySelector("#finishedTasks");
  finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

     // Сохраняем массив в локальное хранилище
     localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
     localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
     localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
});




//////////////////////////////////////////Колонка Ready и вывод из массива в селект задачи/////////////////////////////////////////////



if (savedTasksReady) {
  if (login === "admin"){
  tasksReady = JSON.parse(savedTasksReady);
  console.log(tasksReady);

  tasksReady.forEach((task, index) => {
    
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    
  });

  // Очищаем селект перед добавлением новых опций
  selectTicket.innerHTML = "";

  tasksReady.forEach((task, index) => {
    
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);

  });

  tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  tasksReady.forEach((task, index) => {
    const newItem = document.createElement('li');
    newItem.setAttribute('draggable', 'true');
    newItem.innerHTML = `
      <div class="TicketBlock">
        <p>Выбранный пользователь: <b>${task.user}</b></p>
        <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
        <p class="taskText">Задача: <b>${task.description}</b></p>
        <button id="EditView" class="edit">Edit</button>
        <button id="removeTikket" class="remove">Remove</button>
      </div>
    `;

    newItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', newItem.innerHTML);
      event.currentTarget.classList.add('dragging');
    });
    
    newItem.addEventListener('dragend', (event) => {
      event.currentTarget.classList.remove('dragging');
    });

////////
 //Получение кнопки редактировать
    // Получение кнопки редактирования
    let editButton = newItem.querySelector(".edit");
    editButton.addEventListener("click", () => {
      // Сохранение выбранного индекса задачи
      modalEditTikketViev.classList.add("myModal");
      modalEditTicket.classList.add("modalWindow");
    });


    //
    const removeButton = newItem.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    // Удаление задачи из DOM
    newItem.remove();
  
    // Удаление задачи из массива
    const selectedTaskIndex = tasksReady.indexOf(task);
    if (selectedTaskIndex > -1) {
      tasksReady.splice(selectedTaskIndex, 1);
    }
  
    // Пересчет и обновление числа задач
    const activeTaskBlock = document.querySelector("#activeTasks");
    activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` : `Active tasks: ${tasksReady.length}`;
  
    tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  
    // Сохраняем массив tasksReady в локальное хранилище
    localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
  });
    readyColumn.appendChild(newItem);

    const activeTaskBlock = document.querySelector("#activeTasks");
    activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` :`Active tasks: ${tasksReady.length}`;
    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;

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

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
} else if (login === "test") {
  tasksReady = JSON.parse(savedTasksReady);
  console.log(tasksReady);
  tasksReady.length === 0 ? (inprogressButton.disabled = true) : (inprogressButton.disabled = false);

  tasksReady.forEach((task, index) => {
    if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    }
  });

  // Очищаем селект перед добавлением новых опций
  selectTicket.innerHTML = "";

  tasksReady.forEach((task, index) => {
    if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);

      
    }
  });

  tasksReady.forEach((task, index) => {
    const newItem = document.createElement('li');
    if (task.user === "test") {
      
      newItem.setAttribute('draggable', 'true');
      newItem.innerHTML = `
        <div class="TicketBlock">
          <p>Выбранный пользователь: <b>${task.user}</b></p>
          <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
          <p class="taskText">Задача: <b>${task.description}</b></p>
        </div>
      `;

      newItem.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', newItem.innerHTML);
        event.currentTarget.classList.add('dragging');
      });
      
      newItem.addEventListener('dragend', (event) => {
        event.currentTarget.classList.remove('dragging');
      });

      readyColumn.appendChild(newItem);

      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    }
  });

  let testUserTasksCount = 0;
 
  tasksReady.forEach((task, index) => {
    if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);
    }
  });

  // Очищаем селект перед добавлением новых опций
  selectTicket.innerHTML = "";

  tasksReady.forEach((task, index) => {
    if (task.user === "test") {
      const option = document.createElement('option');
      option.value = index;
      option.text = task.title;
      selectTicket.appendChild(option);

      testUserTasksCount++;
    }
  });
  const activeTaskBlock = document.querySelector("#activeTasks");
  activeTaskBlock.textContent = `Active tasks: ${testUserTasksCount}`;

  let testUserFinished = 0
  
  
tasksFinish.forEach((task) => {
if(task.user === "test"){
  testUserFinished++
}
});
const finishedTask = document.querySelector("#finishedTasks");
  finishedTask.textContent = `Finished tasks: ${testUserFinished}`;

  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
}

}

//редактирование задачи



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
 
  const newItem = document.createElement('li'); // Создаем новый элемент li
  newItem.setAttribute('draggable', 'true');
  newItem.innerHTML = `
    <div class="TicketBlock">
      <p>Выбранный пользователь: <b>${task.user}</b></p>
      <p class="taskTitle">Заголовок: <b>${task.title}</b></p>
      <p class="taskText">Задача: <b>${task.description}</b></p>
      <button  class="edit">Edit</button>
      <button class="remove">Remove</button>
    </div>
  `;

 

  newItem.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', newItem.innerHTML);
    event.currentTarget.classList.add('dragging');
  });

  newItem.addEventListener('dragend', (event) => {
    event.currentTarget.classList.remove('dragging');
  });
  

   // Получение кнопки редактировать
   let editButton = newItem.querySelector(".edit");
   editButton.addEventListener("click", () => {
     modalEditTikketViev.classList.add("myModal");
     modalEditTicket.classList.add("modalWindow");
   });


  const removeButton = newItem.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    
    newItem.remove();
  
    
    const selectedTaskIndex = tasksReady.indexOf(task);
    if (selectedTaskIndex > -1) {
      tasksReady.splice(selectedTaskIndex, 1);
    }
  
    
    const activeTaskBlock = document.querySelector("#activeTasks");
    activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` : `Active tasks: ${tasksReady.length}`;
  
    tasksReady.length === 0 ? inprogressButton.disabled = true : inprogressButton.disabled = false;
  
    
    localStorage.setItem('tasksReady', JSON.stringify(tasksReady));
  });
  



  readyColumn.appendChild(newItem);
  
    const activeTaskBlock = document.querySelector("#activeTasks");
    activeTaskBlock.textContent = tasksReady.length === 0 ? `Active tasks: 0` :`Active tasks: ${tasksReady.length}`;
    const finishedTask = document.querySelector("#finishedTasks");
    finishedTask.textContent = tasksFinish.length === 0 ? `Finished tasks: 0` : `Finished tasks: ${tasksFinish.length}`;

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
  localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
  localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
  localStorage.setItem('tasksReady', JSON.stringify(tasksReady));

  tasksReady.length ? (inprogressButton.disabled = false) : (inprogressButton.disabled = true);

  viewModal.classList.remove('myModal');
  modal.classList.remove('modalWindow');
  modal.classList.add('hidden');
});
})



