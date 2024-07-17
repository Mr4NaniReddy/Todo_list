$(document).ready(function(){
    const form = $('#form');
    const input = $('#input');
    const todosUL = $('#todos');

    let todosArray = JSON.parse(localStorage.getItem('todos')) || [];
    
    if(todosArray.length){
        todosArray.forEach(todo => addTodoToDOM(todo));
    }

    
    form.on('submit', function(e){
        e.preventDefault();
        addTodo();
    })


    function addTodo(){
        let todoText = input.val();

        if(todoText){
            const todo = {text:todoText, completed:false};
            todosArray.push(todo);
            addTodoToDOM(todo);
            input.val('');
            updateLocalStorage();

        }
    }






    function addTodoToDOM(todo){
        const todoEl = $('<li>').addClass('list-group-item').text(todo.text);

        if(todo.completed){
            todoEl.addClass('completed');
        }

        todoEl.on('click', function(){
            $(this).toggleClass('completed');
            todo.completed = !todo.completed;
            updateLocalStorage();

        })

        todoEl.on('contextmenu', function(e){
            e.preventDefault();
            $(this).remove();
            todosArray = todosArray.filter(t => t.text !== todo.text);
            updateLocalStorage();

        })

        todosUL.append(todoEl);

    }

    function updateLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(todosArray));
    }

})