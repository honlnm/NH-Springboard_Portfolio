////let Content Load
//document.addEventListener("DOMContentLoaded", function () {
//    const toDoForm = document.querySelector('form');
//    const toDoList = document.querySelector('ul');
//
//    //add items to a list using the input box and submit button.
//    //add remove button to remove list items.
//    toDoForm.addEventListener('submit', function (e) {
//
//        e.preventDefault();
//
//        const newInput = document.querySelector('#task');
//        const newLi = document.createElement('li');
//        const removeButton = document.createElement('button');
//
//        newLi.setAttribute('class', 'item');
//
//        newLi.innerText = newInput.value;
//        removeButton.innerText = "Remove";
//
//        toDoList.append(newLi);
//        newLi.appendChild(removeButton);
//        toDoForm.reset();
//    });
//
//    //Cross out (strikethrough) text when task is done(clicked)
//    toDoList.addEventListener('click', function (e) {
//        if (e.target.tagName === "LI") {
//            e.target.style.textDecoration = "line-through";
//        } else if (e.target.tagName === "BUTTON") {
//            e.target.parentNode.remove();
//        }
//    });
//})

//let Content Load
document.addEventListener("DOMContentLoaded", function () {
    const toDoForm = document.querySelector('form');
    const toDoList = document.querySelector('ul');

    //retrieve data from localStorage
    const savedToDos = JSON.parse(localStorage.getItem('toDos')) || [];
    for (let i = 0; i < savedToDos.length; i++) {
        if (!savedToDos[i].isCompleted) {
            let newToDo = document.createElement("li");
            newToDo.innerText = savedToDos[i].task;
            newToDo.isCompleted = savedToDos[i].isCompleted ? true : false;
            toDoList.appendChild(newToDo);
        };
    };

    //add items to a list using the input box and submit button.
    //add remove button to remove list items.
    toDoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let newToDo = document.createElement('li');
        let taskValue = document.getElementById("task").value;
        newToDo.innerText = taskValue;
        newToDo.isCompleted = false;
        toDoForm.reset();
        toDoList.appendChild(newToDo);
        //save data to LocalStorage
        savedToDos.push({ task: taskValue, isCompleted: false });
        localStorage.setItem('toDos', JSON.stringify(savedToDos));
    });

    //Cross out (strikethrough) text when task is done(clicked)
    toDoList.addEventListener('click', function (e) {
        let clickedToDo = e.target;
        if (!clickedToDo.isCompleted) {
            clickedToDo.style.textDecoration = "line-through";
            clickedToDo.isCompleted = true;
        } else {
            clickedToDo.style.textDecoration = "none";
            clickedToDo.isCompleted = false;
        }
        for (i = 0; i < savedToDos.length; i++) {
            if (savedToDos[i].task === clickedToDo.innerText) {
                savedToDos[i].isCompleted = !savedToDos[i].isCompleted;
                localStorage.setItem("toDos", JSON.stringify(savedToDos));
            }
        }
    });
});