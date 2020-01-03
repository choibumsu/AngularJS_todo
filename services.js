angular.module('todo').factory('todoStorage', function () {
  var storage = {
    todos: [
      {
        title: "앵귤러 배우기",
        completed : true,
        createdAt: Date.now()
      },
      {
        title: "스프링 배우기",
        completed : false,
        createdAt: Date.now()
      },
      {
        title: "점심 먹기",
        completed : false,
        createdAt: Date.now()
      }
    ],
      
    get: function () {
      return storage.todos;
    },
    
    remove: function (todo) {
      var idx = storage.todos.findIndex(function (item) {
        return item.title === todo.title;
      });
      
      if (idx > -1) {
        storage.todos.splice(idx, 1);
      }
    },
    
    add: function (newTodoTitle) {
      var newTodo = {
        title : newTodoTitle,
        completed : false,
        createdAt : Date.now()
      };
      
      storage.todos.push(newTodo);
    }
  };
  
  return storage;
});