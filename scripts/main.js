
import { generateRandomID, validateForm} from './utils.js';
import dayjs from 'https://esm.sh/dayjs'; 

let addtask_elem = document.querySelector(".js-add-task"); 

renderTasks();

addtask_elem.addEventListener("click", async function() {
    let task = document.querySelector(".js-task").value; 
    let descrip = document.querySelector(".js-descrip").value; 
    let deadline = document.querySelector(".js-deadline").value;
    let isChecked = document.querySelector("#priority").checked ? true : false; 
    let createdDate = dayjs().format('YYYY-MM-DD');
    
    if(validateForm(task,deadline,descrip)){
        let obj1 = {}; 
        obj1.task = task;
        obj1.description = descrip;
        obj1.deadline = deadline;
        obj1.is_completed = false;
        obj1.created_at = createdDate;
        obj1.priority = isChecked;
        document.querySelector(".js-task").value = "";  
         document.querySelector(".js-descrip").value = "";  
        document.querySelector(".js-deadline").value = "";
        document.querySelector("#priority").checked = false;
        try {
            const response = await fetch("https://backend-todo-iq4c.onrender.com/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj1),
            });
    
            const result = await response.json();
            console.log("Response from server:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }  
    renderTasks();
}); 

let parent_div = document.querySelector(".js-tasks-parent"); 

 
function renderTasks(){
    
    fetch('https://backend-todo-iq4c.onrender.com/get-tasks')
    .then(response => response.json())
    .then(data => {
        if(Array.isArray(data)){
            let html = '';
        data.forEach(task => {
             task.deadline = dayjs(task.deadline).format('YYYY-MM-DD');
             task.created_at = dayjs(task.created_at).format('YYYY-MM-DD');
            html += `
            <div class="js-task" style="${task.priority === 1 ? 'background:#59BEEA;' : 'background:#999898;'}"> <!-- if priority bar should be pinkish red-->
                <div class="task-info">
                    <h4>${task.task}</h4>
                    <span>Description :</span> <span>${task.description}</span> <br>
                    <span>Date created :</span> <span>${task.created_at}</span> <br>
                    <span>Deadline :</span> <span>${task.deadline}</span> <br>
                    
                </div>
                <div class="task-actions">
                    <button class="js-delete-task" data-task-id="${task.id}">Delete</button>
                </div> 
            </div>
            `
            console.log("delete elem"); 
        });
        parent_div.innerHTML = html;
        } 
    })
    .catch(error => console.error('Error:', error));
}

document.querySelector('.js-tasks-parent').addEventListener('click', function(event) {
    if (event.target.classList.contains('js-delete-task')) { // Check if the clicked element is a delete button
        const taskId = event.target.getAttribute('data-task-id'); // Get task ID from data attribute
        console.log(taskId);
        fetch(`https://backend-todo-iq4c.onrender.com/delete-task/${taskId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            let parent = event.target.parentElement; 
            let gparent = parent.parentElement.remove();
        })
        .catch(error => console.error('Error deleting task:', error));
    }
    
});