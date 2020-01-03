# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 5. To-Do 리스트 앱 만들기 - 디렉티브

#### 5-1강. todoTitle

Custom directive를 생성하는 법

```js
app.directive('todoTitle', function () {
	return {
        template: "<h1>Todo List</h1>"
    }
});
```

Module 객체인 app에 directive를 생성.

첫번째 인자는 directive의 이름

두번째 인자는 함수 : template 속성으로 문자열을 반환함



```html
<todo-title></todo-title>
```

HTML에서는 카멜 케이스 말고 '-'를 이용하여 구분

todo-title directive는 template 속성값으로 치환됨

_결과 :_      ![image-20200103135305620](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103135305620.png)





---

#### 5.2강. todoItem

**templateUrl**을 사용하여 별도의 파일에 저장된 HTML문서를 directive로 불러올 수 있다.

```js
app.directive('todoItem', function() {
    return {
        templateUrl: 'todoItem.tpl.html'
    }
})
```

templateUrl 속성에 HTML 문서가 있는 곳의 주소를 연결한다.



```todoItem.tpl.html
<div class="input-group">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input type="checkbox" ng-model="todo.completed" />
    </div>
  </div>
  <input type="text" ng-model="todo.title" class="form-control" />
  <div class="input-group-append">
    <button class="btn btn-danger" type="button " ng-click="remove(todo)">삭제</button>
  </div>
</div>
<date>{{ todo.createdAt | date: 'yyyy-MM-dd HH:mm:ss' }}</date>
```

todoItem.tpl.html에 todo 객체에 해당하는 HTML 코드를 복사한다.



```index.html
<ul class="list-unstyled">
    <li ng-repeat="todo in todos | filter:statusFilter">
    	<todo-item></todo-item>
    </li>
</ul>
```

원래 todo 객체의 코드가 있던 자리에 totoItem directive를 위치시킨다.



**directives.js 로 분리하기**

Directive가 많아지면 script.js가 너무 커지므로 관리하기 힘들다.

따라서 directives.js 파일로 분리하여 관리하는 것이 좋다.



```directives.js
app.directive('todoTitle', function () {
      return {
        template: "<h1>Todo List</h1>"
      }
    });
    
app.directive('todoItem', function() {
  return {
    templateUrl: 'todoItem.tpl.html'
  }
})
```

directives.js 파일을 만들고 directive 코드들을 복사한다.

이때 app이라는 모듈은 script.js 에만 존재하기 때문에 모듈을 사용할 수 없다.

따라서, app을 angular.module('todo') 로 치환하여 모듈에 접근한다.



```directives.js
angular.module('todo').directive('todoTitle', function () {
      return {
        template: "<h1>Todo List</h1>"
      }
    });
    
angular.module('todo').directive('todoItem', function() {
  return {
    templateUrl: 'todoItem.tpl.html'
  }
})
```



```index.html
<script src="directives.js"></script>
```

index.html 에 directives.js를 추가하여 directive 를 사용할 수 있도록 한다.





---

#### 5-3강. todoFilters

filter들을 별도의 directive로 선언



```index.html
<todo-filters></todo-filters>
<!--
<button class="btn btn-primary" ng-click="statusFilter={completed:true}">Completed</button>
<button class="btn btn-primary" ng-click="statusFilter={completed:false}">Active</button>
<button class="btn btn-primary" ng-click="statusFilter={}">All</button>
-->
```

필터 버튼을 모두 todoFilters directive로 치환



```directives.js
angular.module('todo').directive('todoFilters', function () {
  return {
    templateUrl: 'todoFilters.tpl.html'
  }
});
```

todoFilters directive를 정의하고 templateUrl을 연결



```todoFilters.tpl.html
<button class="btn btn-primary" ng-click="statusFilter={completed:true}">Completed</button>
<button class="btn btn-primary" ng-click="statusFilter={completed:false}">Active</button>
<button class="btn btn-primary" ng-click="statusFilter={}">All</button>
```

원래의 필터 버튼 코드를 todoFilters.tpl.html에 복사





---

#### 5-4강. todoForm

입력폼을 directive로 변경

tofoFilters와 동일한 과정으로 진행



```directives.js
angular.module('todo').directive('todoForm', function () {
  return {
    templateUrl: 'todoForm.tpl.html'
  }
});
```



```todoForm.tpl.html
<form name="todoForm" ng-submit="add(newTodoTitle)">
  <div class="input-group">
    <input type="text" class="form-control" ng-model="newTodoTitle" placeholder="새로운 Todo를 입력하세요." minlength="3"/>
    <div class="input-group-append">
      <button class="btn btn-success" type="submit">추가</button>
    </div>
  </div>
  <div ng-show="todoForm.$dirty && todoForm.$invalid">
    <div class="alert alert-warning" role="alert">3글자 이상 입력하세요.</div>
  </div>
</form>
```



```index.html
<todo-form></todo-form>
```





**directive를 사용하면 좋은점**

* HTMl 파일의 길이를 줄일 수 있고 모듈화할 수 있다.
* directives.js로 분리되어 있기 때문에 관리하기 수월하다.



**Controller 분리하기**

```controllers.js
angular.module('todo').controller('TodoCtrl', ['$scope', function($scope) {
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
```

script.js에서 controller에 해당하는 코드들을 controller.js 파일에 붙여넣음



```index.html
<script src="controllers.js"></script>
```

index.html에서 controllers.js를 사용할 수 있도록 script 태그로 선언



**app.js 도입**

```script.js
(function() {
  	var app = angular.module('todo', []);
})();
```

script.js에는 app이라는 모듈 변수만 남아 있는 상태



```app.js
angular.module('todo', []);
```

app.js 파일을 만들고 script.js에 있는 코드를 붙여넣음.

이때, app이라는 변수에 담게 되면 windows 객체에 전역 변수로 남게 되므로 선언만 해줌.



```index.html
<script src="app.js"></script>
```

마지막으로 index.html에서 app.js를 사용할 수 있도록 선언

_script.js는 삭제_



**app.js**에서는 **Module**,

**controllers.js**에서는 **Controller**,

**directives.js**에서는 **Directive**,

**tpl.html**에서는 **Template**만을 관리함 

기능별로 파일을 분리시켜 모듈화하고, 관리를 쉽게 만듬













