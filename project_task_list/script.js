// Define UI elements
let form = document.querySelector('#task_form');
let tasklist = document.querySelector('ul');
let clearbtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskinput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addtask);
tasklist.addEventListener('click',removetask);
clearbtn.addEventListener('click',cleartask);
filter.addEventListener('keyup',filtertask);
document.addEventListener('DOMContentLoaded',getTask);


// Define functions

// Add task
function addtask(e) {
    e.preventDefault(); // Prevent form submission
    if (taskinput.value === "") {
        alert('add a task');
    } else {
        // Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskinput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        tasklist.appendChild(li);
        storeaskInlocalstorage(taskinput.value);
        taskinput.value = ''; // Clear input after adding task

    }
}

// remove task 

function removetask(e)
{
    if(e.target.hasAttribute('href'))
        {
            if(confirm("are you sure?"))
                {
                    let ele = e.target.parentElement;
                    ele.remove();
                    removeFromLS(els);
                }
        }

}

//clear task 

function cleartask(e)
{
    tasklist.innerHTML =" ";
    // faster way
    while(tasklist.firstChild)
        {
            tasklist.removeChild(tasklist.firstChild);
        }
        localStorage.clear();
}

// filter tasks 

// Filter tasks
function filtertask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.textContent.toLowerCase(); // Get the text content of the whole li element
        if (item.indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// store in local storage 

function storeaskInlocalstorage(task){
    let tasks ;
    if(localStorage.getItem('tasks') === null)
        {
            tasks =[];
        }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTask()
{
    let tasks ;
    if(localStorage.getItem('tasks') === null)
        {
            tasks =[];
        }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        tasklist.appendChild(li);

    })

}

function removeFromLS(taskItem)
{
    let tasks ;
    if(localStorage.getItem('tasks') === null)
        {
            tasks =[];
        }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    let li =  taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task,index)=>{
        if(li.textContent.trim() === task)
            {
                tasks.splice(index,1);
            }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


