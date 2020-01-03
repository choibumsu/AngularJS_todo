# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 3. To-Do 리스트 앱 만들기 - 내장 디렉티브

#### 3-1강. ngRepeat

**ng-repeat** : AngularJS에서 배열을 반복하는 Directive

```js
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
    }]);
})();
```

기존의 $scope.todo를 todos라는 배열로 변환.

여러개의 todo 객체를 생성함.



```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <div ng-repeat="todo in todos">
        <input type="text" ng-model="todo.title">
        <input type="checkbox" ng-model="todo.completed">
        <date>{{ todo.createdAt }}</date>
    </div>
</body>
```

ng-repeat dirctive를 이용하여 todos 배열 안에 있는 todo 객체들을 반복함.



_결과_ :     ![image-20200103111145718](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103111145718.png)



**ul, li 태그 및 bootstrap 적용**

```html
<!DOCTYPE html>
<html>

  <head>
    <link data-require="bootstrap@4.0.5" data-semver="4.1.3" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
    <script data-require="bootstrap@4.0.5" data-semver="4.1.3" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script data-require="angular.js@1.6.6" data-semver="1.6.6" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>

  <body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <ul class="list-unstyled">
      <li ng-repeat="todo in todos">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input type="checkbox" ng-model="todo.completed" />
            </div>
          </div>
          <input type="text" ng-model="todo.title" class="form-control" />
        </div>
        <date>{{ todo.createdAt }}</date>
      </li>
    </ul>
  </body>

</html>
```



![image-20200103112138205](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103112138205.png)





---

#### 3-2강. ngFilter

**ng-filter** : 값의 형식을 변환해주는 내장 directive

```html
<date>{{ todo.createdAt | date: 'yyyy-mm-dd HH:mm:ss' }}</date>
```

_결과 :_       ![image-20200103112544906](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103112544906.png)





---

#### 3-3강. ngClick

**삭제 버튼 추가**

```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <ul class="list-unstyled">
        <li ng-repeat="todo in todos">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" ng-model="todo.completed" />
                    </div>
                </div>
                <input type="text" ng-model="todo.title" class="form-control" />
                <div class="input-group-append">
                    <button class="btn btn-danger" type="button">삭제</button>
                </div>
            </div>
            <date>{{ todo.createdAt | date: 'yyyy-mm-dd HH:mm:ss' }}</date>
        </li>
    </ul>
</body>
```



**ng-click** : event 핸들러를 설정하는 directive

```html
<button class="btn btn-danger" type="button " ng-click="remove(todo)">삭제</button>
```

삭제 버튼에 ng-click을 통해 remove라는 함수를 달아줌.

삭제 버튼을 클릭하면 remove 함수가 실행됨.

해당 todo 객체를 삭제하기 위해 파라미터로 todo를 넘겨줌.



```js
$scope.remove = function(todo) {
    var idx = $scope.todos.findIndex(function (item) {
        return item.title === todo.title;
    });

    if (idx > -1) {
        $scope.todos.splice(idx, 1);
    }
}
```

 자바스크립트로 remove 함수를 구성.

인자로 받은 todo 객체와 todos에서 하나씩 뽑은 item 객체의 제목이 같으면 그 객체를 todos에서 제거.





---

#### 3-4강. 필터 버튼

완료된 todo 항목만 보여주는 필터 버튼 제작



**ng-repeat directive에 filter를 적용하고 버튼 생성**

```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <div class="container">
      <h1>Todo</h1>
      <ul class="list-unstyled">
          <li ng-repeat="todo in todos | filter:statusFilter">
            .
            .
            .
          </li>
      </ul>
      <button class="btn btn-primary" ng-click="statusFilter={completed:true}">Completed</button>
      <button class="btn btn-primary" ng-click="statusFilter={completed:false}">Active</button>
      <button class="btn btn-primary" ng-click="statusFilter={}">All</button>
    </div>
  </body>
```

container 클래스로 전체를 감쌈.



ng-repeat directive에 statusFilter라는 변수를 할당함.

**statusFilter**는 todo.completed 변수 값에 따른 필터를 적용할 변수



버튼 3개를 생성하고, 각 버튼마다 클릭시 필터를 변경해주는 ng-click directive를 설정



![image-20200103115654871](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103115654871.png)



* Completed를 누르면 "statusFilter={completed:true}" 가 실행됨.
* ng-filter에는 statusFilter가 적용되어 있기 때문에, todo 객체 중 completed가 true인 것만 출력









