let greeting = document.querySelector("p");
let container = document.querySelector(".container");
let addTask = document.querySelector("#addTask")
let btn = document.querySelector("#add");
let task = document.querySelector("#t1");
let inProgress = document.querySelector("#t2");
let completed = document.querySelector("#t3")
let time = new Date();
let hours = time.getHours();
function updateStats (){
    let completedTask = document.querySelectorAll(".completedTask");
    let inProgressTask = document.querySelectorAll(".countProg");
    completed.innerText = completedTask.length;
    inProgress.innerText = inProgressTask.length; 
}
let idForTask = Number(localStorage.getItem("idForTask")) || 0 ;
if (hours >= 4 && hours < 12){
    greeting.innerText = "Good Morning☀️"
}else if(hours>=12 && hours<=15){
    greeting.innerText = "Good Afternoon"
}else if(hours> 15 && hours <=19){
    greeting.innerText = "Good Evening🌆"
}else{
    greeting.innerText ="Hola"
}
addTask.addEventListener("keydown" , (e)=>{
   if(e.key === "Enter"){
    btn.click()
   }
})
const tasks = JSON.parse(localStorage.getItem("tasks")) ||[];
if (tasks.length > 0){
    tasks.forEach(element => {
     let taskDiv = document.createElement("div");
     let leftgrp = document.createElement("div");
     let newInp = document.createElement("input");
     let newLabel = document.createElement("label");
     let del =  document.createElement("img");
     container.appendChild(taskDiv);
     taskDiv.appendChild(leftgrp);
     leftgrp.appendChild(newInp);
     leftgrp.appendChild(newLabel);
     taskDiv.appendChild(del); 
     del.src="./assets/trash.png";
     taskDiv.className = "addedTask";
     leftgrp.className="leftGroup";
     del.className = "delbtn";
     newLabel.className ="lbl";
     newInp.type = "checkbox";
     if(element.completed == false){
        newInp.checked = false
     }else if(element.completed == true){
        newInp.checked =true
     }
     newLabel.innerText = element.taskName;
     taskDiv.classList.add("count");
     taskDiv.classList.add("countProg");
     let countTask = document.querySelectorAll(".count");
     let inProgressTask = document.querySelectorAll(".countProg");
     task.innerText = countTask.length
     inProgress.innerText = inProgressTask.length
     taskDiv.id = element.id;
     if(newInp.checked === true){
        taskDiv.classList.add("completedTask");
        taskDiv.classList.remove("addedTask");
        taskDiv.classList.remove("countProg");
        newLabel.classList.add("textDeco")
     }else{
        taskDiv.classList.remove("completedTask");
        taskDiv.classList.add("addedTask");
        taskDiv.classList.add("countProg");
        newLabel.classList.remove("textDeco");
        updateStats();
     }

    newInp.addEventListener("change" , ()=>{
     if(newInp.checked === true){
        let Id =taskDiv.id;
        const index = tasks.findIndex((taskCreated)=>{
         return taskCreated.id === Id
        });
        tasks[index].completed = true;
        taskDiv.classList.add("completedTask");
        taskDiv.classList.remove("addedTask");
        taskDiv.classList.remove("countProg");
        newLabel.classList.add("textDeco")
        updateStats();
        confetti({
            particleCount : 120,
            origin :{ x:0.45 , y:0.8}
        });  
        localStorage.setItem("tasks" , JSON.stringify(tasks))    
        }else{
         let Id =taskDiv.id;
         const index = tasks.findIndex((taskCreated)=>{
         return taskCreated.id === Id
        });
        tasks[index].completed = false;
        taskDiv.classList.remove("completedTask");
        taskDiv.classList.add("addedTask");
        taskDiv.classList.add("countProg");
        newLabel.classList.remove("textDeco")
        updateStats();
        localStorage.setItem("tasks" , JSON.stringify(tasks))
    }
    })
    
    del.addEventListener("click" , ()=>{
    let Id =taskDiv.id;
    const index = tasks.findIndex((taskCreated)=>{
     return taskCreated.id === Id
    });
   tasks.splice(index , 1)
   taskDiv.remove();
   let countTask = document.querySelectorAll(".count");
   updateStats();
   task.innerText = countTask.length;
   localStorage.setItem("tasks" , JSON.stringify(tasks))
   })

    });   
}

btn.addEventListener("click", ()=>{
  if (addTask.value.trim() != ""){
  let taskDiv = document.createElement("div");
  let leftgrp = document.createElement("div");
  let newInp = document.createElement("input");
  let newLabel = document.createElement("label");
  let del =  document.createElement("img");
  container.appendChild(taskDiv);
  taskDiv.appendChild(leftgrp);
  leftgrp.appendChild(newInp);
  leftgrp.appendChild(newLabel);
  taskDiv.appendChild(del); 
  del.src="./assets/trash.png";
  taskDiv.className = "addedTask";
  leftgrp.className="leftGroup";
  del.className = "delbtn";
  newLabel.className ="lbl";
  newInp.type = "checkbox";
  newLabel.innerText = addTask.value;
  taskDiv.classList.add("count");
  taskDiv.classList.add("countProg");
  let countTask = document.querySelectorAll(".count");
  let inProgressTask = document.querySelectorAll(".countProg");
  task.innerText = countTask.length
  inProgress.innerText = inProgressTask.length
  addTask.value="";
  const taskCreated ={
    id : "task" + idForTask,
    taskName : newLabel.innerText,
    completed : false,
  };
  taskDiv.id = "task" + idForTask;
  tasks.push(taskCreated);
  idForTask ++;
  localStorage.setItem("idForTask", JSON.stringify(idForTask))
  localStorage.setItem("tasks" , JSON.stringify(tasks))
  newInp.addEventListener("change" , ()=>{
    if(newInp.checked === true){
        let Id =taskDiv.id;
        const index = tasks.findIndex((taskCreated)=>{
         return taskCreated.id === Id
        });
        tasks[index].completed = true;
        taskDiv.classList.add("completedTask");
        taskDiv.classList.remove("addedTask");
        taskDiv.classList.remove("countProg");
        newLabel.classList.add("textDeco");
        confetti({
            particleCount : 120,
            origin :{ x:0.45 , y:0.8}
        }); 
        updateStats();
        localStorage.setItem("tasks" , JSON.stringify(tasks))  
    }else{
        let Id =taskDiv.id;
        const index = tasks.findIndex((taskCreated)=>{
         return taskCreated.id === Id
        });
        tasks[index].completed = false;
        taskDiv.classList.remove("completedTask");
        taskDiv.classList.add("addedTask");
        taskDiv.classList.add("countProg");
        newLabel.classList.remove("textDeco")
        updateStats();
        localStorage.setItem("tasks" , JSON.stringify(tasks))
    }
  })
  del.addEventListener("click" , ()=>{
   let Id =taskDiv.id;
   const index = tasks.findIndex((taskCreated)=>{
     return taskCreated.id === Id
   });
   tasks.splice(index , 1)
   taskDiv.remove();
   let countTask = document.querySelectorAll(".count");
   updateStats();
   task.innerText = countTask.length;
   localStorage.setItem("tasks" , JSON.stringify(tasks))
  })
  }else {
    alert("Enter Task")
  }
  
})