# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 2. To-Do 리스트 앱 만들기 - 컨트롤러

#### 2-1강. Index.html로 시작하기

AngularJS에서 제공하는 내장 Directives



**ng-app** : ng-app이 선언된 자리부터 AngularJS를 사용한다고 AngularJS에서 알려주는 역할

```HTML
<body ng-app>
	<h1>Hello bumsu!</h1>
<body>
```

body 태그 내부는 AngluarJS가 적용되어 있다고 알리면,

body 태그 내부의 코드 중에서 Angular Directive를 찾아서 해석하는 과정을 거치게 됨.



**np-init** : 자바스크립트 변수나 함수를 초기화하는 Directive

```HTML
<body ng-app ng-init="name = 'bumsu'">
    <h1>
        Hello {{ name }}!
    </h1>
</body>
```

_결과 :_      ![image-20200103100942372](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103100942372.png) {:.alignleft}







---

#### 2-2강. 모듈와 컨트롤러

ng-init은 프로토타입 생성시 사용하고, 주로 모듈과 컨트롤러를 사용함



**Module**

```js
(function() {
  	var app = angular.module('todo', []);
})();
```

'todo'라는 이름의 module을 app에 할당함.

두번째 파라미터는 배열을 줌.



```html
<body ng-app="todo" ng-init="name = 'bumsu'">
    <h1>
        Hello {{ name }}!
    </h1>
</body>
```

ng-app에 todo를 할당하면, todo 모듈이 body태그에 적용됨.



**Controller**

Module은 Controller, Service 등을 포함한 큰 Container

따라서, Controller는 Module 내에 위치한다.



```js
(function() {
  	var app = angular.module('todo', []);
  
  	app.controller('TodoCtrl', ['$scope', function($scope) {
        $scope.name ="bumsu";
    }]);
})();
```

Controller 생성시 이름의 첫글자를 대문자로 하고,

Controller의 약자인 Ctrl를 뒤에 붙여준다.

두번째 파라미터는 배열로 주는데, $scope이라는 변수를 인자로 가짐.

**$scope** : Controller와 View(HTML) 간의 연결고리 역할.



```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>
        Hello {{ name }}!
    </h1>
</body>
```

HTML파일에서는 ng-init 대신 ng-controller를 통해 Controller를 연결함.

ng-init을 썼을 때와 동일하게, name에는 'bumsu'가 들어감.

Controller에서 $scope.name = "bumsu" 로 선언하였기 때문





**ToDo App 만들기**

```js
$scope.todo = {
    title: "앵귤러 배우기",
    completed : false,
    createdAt: Date.now()
};
```

createdAt에는 todo가 생성된 시간이 들어감.



```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    {{ todo }}
</body>
```

_결과 :_      ![image-20200103104316341](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103104316341.png) {:.alignleft}



_프론트 정리_

```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <h3>{{ todo.title }}</h3>
    <p>
        {{ todo.completed }}
    </p>
    <date>{{ todo.createdAt }}</date>
</body>
```

_결과 :_      ![image-20200103104624860](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103104624860.png)



**Model**

ng-model Directive를 사용하면 자바스크립트 변수에 있는 값을 실시간으로 변경할 수 있다.

js의 값이 html에 적용되고, html에서 js값을 변경할 수 있는 양방향 바인딩



```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <h3>{{ todo.title }}</h3>
    <input type="text" ng-model="todo.title">
    <p>
        {{ todo.completed }}
    </p>
    <date>{{ todo.createdAt }}</date>
</body>
```

input 태그에 todo.title 변수를 model로 바인딩한 상태



_결과_ :     ![image-20200103105452793](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103105452793.png)

input 박스 안에 있는 값을 변경시 $scope.todo.title의 값도 변경이 된다.





**Checkbox 적용**

```html
<body ng-app="todo" ng-controller="TodoCtrl">
    <h1>Todo</h1>
    <input type="text" ng-model="todo.title">
    <input type="checkbox" ng-model="todo.completed">
    <date>{{ todo.createdAt }}</date>
</body>
```





---

#### 2-3강. 출력하기

생략하겠음.



