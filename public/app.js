/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .done(function(data){
        data.forEach(function(todo){
            addTodo(todo);
        });
    })
    .fail(function(){
    console.log("error with getJSON /api/todos");
    });
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    
    $(".list").on('click', 'span', function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    });
});

function createTodo(){
    var task = $("#todoInput").val();
    $.post("/api/todos", {name: task})
    .done(function(data){
        $("#todoInput").val('');
        addTodo(data);
    })
    .catch(function(err){
        console.log(err);
    });
}

function addTodo(todo){
    //add todo to the page
    var newTodo = $('<li>' + todo.name + '<span>X</span></li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    newTodo.addClass("task");
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function removeTodo(todo){
    $.ajax({
           method: 'DELETE',
           url: '/api/todos/' + todo.data("id")
       })
       .then(function(data){
           todo.remove();
       })
       .catch(function(err){
           console.log(err);
       });
}

function updateTodo(todo){
    var status = todo.data("completed");
    var updatedData = {completed: !status};
    $.ajax({
        method: 'PUT',
        url: "/api/todos/" + todo.data('id'),
        data: updatedData
    })
    .then(function(data){
        todo.toggleClass("done");
        todo.data("completed", !status);
    })
    .catch(function(err){
        console.log(err);
    });
}