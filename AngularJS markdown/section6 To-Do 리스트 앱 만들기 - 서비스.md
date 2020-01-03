# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 6. To-Do 리스트 앱 만들기 - 서비스

#### 6-1강. todoStorage : get()

controllers.js 리팩토링

* Data를 관리하는 부분
* View를 관리하는 부분

View를 관리하는 부분은 controllers.js에 남기고,

Data를 관리하는 부분은 services.js로 분리



Service를 만드는 방법

* service
* factory
* provider

설명은 생략



```services.js
angular.module('todo').factory('todoStorage', function () {
  var storage = {
    //data logic
  }
  
  return storage
});
```

첫번째 인자는 service 의 이름

**storage** 에는 data 관련 로직을 갖고 있는 변수로 이를 return 해주면 service 를 사용할 수 있다.



```controllers.js
angular.module('todo').controller('TodoCtrl', function($scope, todoStorage) {
	$scope.todos = todoStorage.get();
        .
        .
        .
});
```

controllers.js 에서 controller 에 파라미터로 service 의 이름을 주면 service를 사용할 수 있음.

get() 함수를 사용하여 service에 저장된 data를 불러올 수 있다.



```services.js
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
    }
  };
  
  return storage;
});
```

services.js 에 data를 옮겨온 모습

controllers.js에 있던 $scope.todos 는 삭제한다.



get() 함수를 선언하여 storage에 선언된 todos 변수를 반환한다.



```index.html
<script src="services.js"></script>
```

마찬가지로 index.html 에 services.js 를 선언해준다.





---

#### 4-2강. todoStorage : remove(), add()

remove() 와 add() 도 data와 관련된 함수이므로 services.js 로 옮겨준다.



**remove()**

```controllers.js
$scope.remove = function(todo) {
	todoStorage.remove(todo);
}
```

기존의 remove() 함수를 todoStorage에서 받아오는 형식으로 변환



```services.js
remove: function (todo) {
    var idx = storage.todos.findIndex(function (item) {
    	return item.title === todo.title;
    });

    if (idx > -1) {
    	storage.todos.splice(idx, 1);
    }
}
```

기존의 remove() 함수를 services.js 에 맞게 $scope 를 모두 storage 로 변환하여

storage 안에 remove 키를 갖는 함수로 선언하였다.



**add()**

```controllers.js
$scope.add = function (newTodoTitle) {
    todoStorage.add(newTodoTitle);

    $scope.newTodoTitle = "";
};
```

newTodoTitle을 빈 문자열로 바꾸는 것은 View와 관련된 일이므로 남겨두고

나머지 로직을 services.js 로 이동시킨다.



```services.js
add: function (newTodoTitle) {
    var newTodo = {
        title : newTodoTitle,
        completed : false,
        createdAt : Date.now()
    };

	storage.todos.push(newTodo);
}
```

마찬가지로 $scope 를 storage로 변환한다.



**Service는 Controller에 주입하여 사용한다.**

* Controller 로직은 간단하게 만들어서 가독성을 높힐 수 있다.





---

#### 6-3강. todoStorage : localStorage

새로 고침시 todo list가 초기화된다.

브라우저의 localStorage에 todo list를 저장하면 새로 고침을 해도 남아있게 된다.



```services.js
var TODO_DATA = 'TODO_DATA';

    .
    .
    .

    _saveToLocalStorage: function (data) {
        localStorage.setItem(TODO_DATA, JSON.stringify(data));
    },

    _getFromLocalStorage: function () {
        return JSON.parse(localStorage.getItem(TODO_DATA)) || [];
    },
```

LocalStorage로부터 데이터를 읽고 저장하는 함수를 선언

'_' 를 앞에 붙이면 private 이라는 관습적 표현

대문자로만 이루어진 변수는 상수라는 관습적 표현



```services.js
todos: [],

get: function () {
	angular.copy(storage._getFromLocalStorage(), storage.todos);
	return storage.todos;
},
```

serviecs.js 에서 todos 는 localStorage에 저장된 것을 불러올 것이므로 빈 배열로 선언

get() 함수롤 호출할 때마다, localStorage에 저장된 todo list를 storage.todos 에 저장하고 이를 반환

이때, angular.copy 메소드를 사용하는 것이 좋다.

angular에는 view와 연결된 data를 자동으로 갱신해주는 기능(Digest Cycle)이 있는데

이에  맞게 코딩하는 것이 좋고, 이를 위해 angular.copy 를 사용



```services.js
add: function (newTodoTitle) {
    var newTodo = {
        title : newTodoTitle,
        completed : false,
        createdAt : Date.now()
    };

    storage.todos.push(newTodo);
    storage._saveToLocalStorage(storage.todos);
}
```

add 함수가 실행될 때, localStorage에 새로운 todo 객체를 저장하기 위해 

storage에 있는 todo 객체를 전부 localStorage에 저장함



```services.js
remove: function (todo) {
    var idx = storage.todos.findIndex(function (item) {
    	return item.title === todo.title;
    });

    if (idx > -1) {
        storage.todos.splice(idx, 1);
        storage._saveToLocalStorage(storage.todos);
    }
},
```

remove 함수에서도 마찬가지로 삭제를 위해 storage를 localStorage에 복사함





---

#### 6-4강. todoStorage : update()

Data 가 변화할 때 그 상태를 저장하는 작업이 필요함



**checkbox update**

```todoItem.tpl.html
.
.
<div class="input-group-text">
	<input type="checkbox" ng-model="todo.completed" ng-click="update()"/>
</div>
.
.
```

checkbox 가 클릭되면 update 함수를 실행하도록 ng-click directive 사용



```controllers.js
$scope.update = function () {
	todoStorage.update();
}
```

update 함수가 실행되면 services.js 로 넘김



```services.js
update: function () {
	storage._saveToLocalStorage(storage.todos);
}
```

services.js 에서는 현재 update 된 상태인 storage.todos 배열을 localStorage에 저장함



**input text update**

```todoItem.tpl.html
.
.
<input type="text" ng-model="todo.title" ng-blur="update()" class="form-control" />
.
.
```

**ng-blur** : 포커스를 잃었을 때 실행되는 directive

마찬가지로 update 함수를 실행하면 localStorage 까지 적용됨







