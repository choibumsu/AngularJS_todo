(function() {
    var app = angular.module('todo', []);

    app.controller('TodoCtrl', ['$scope', function($scope) {
      $scope.todos = [
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
        },
      ];
      
      $scope.remove = function(todo) {
        var idx = $scope.todos.findIndex(function (item) {
          return item.title === todo.title;
        });
        
        if (idx > -1) {
          $scope.todos.splice(idx, 1);
        }
      }
      
      $scope.add = function (newTodoTitle) {
        var newTodo = {
          title : newTodoTitle,
          completed : false,
          createdAt : Date.now()
        };
        
        $scope.todos.push(newTodo);
        
        $scope.newTodoTitle = "";
      };
  }]);
})();