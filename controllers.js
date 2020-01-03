angular.module('todo').controller('TodoCtrl', function($scope, todoStorage) {
  $scope.todos = todoStorage.get();
  
  $scope.remove = function(todo) {
    todoStorage.remove(todo);
  }
  
  $scope.add = function (newTodoTitle) {
    todoStorage.add(newTodoTitle);

    $scope.newTodoTitle = "";
  };
  
  $scope.update = function () {
    todoStorage.update();
  }
});