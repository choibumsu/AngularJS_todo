# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 4. To-Do 리스트 앱 만들기 - 폼 만들기

#### 4-1강. 폼 만들기 1

Todo 목록을 추가하기 위한 form 태그 생성

```html
    .
    .
<h1>Todo</h1>
      
<form name="todoForm">
    <div class="input-group">
        <input type="text" class="form-control" />
        <div class="input-group-append">
            <button class="btn btn-success">추가</button>
        </div>
    </div>
</form>
      
<ul class="list-unstyled">
    .
    .
```

todo 객체를 추가하기 위한 '추가' 버튼 생성.

AngularJS에서는 form에 name 속성을 추가할 수 있음.

todoForm이라는 name을 붙여줌.



**ng-submit** : form 태그에서 submit이 될 때 실행할 함수를 지정하는 directive

```html
<form name="todoForm" ng-submit="add(newTodoTitle)">
    <div class="input-group">
        <input type="text" class="form-control" ng-model="newTodoTitle" />
        <div class="input-group-append">
            <button class="btn btn-success" type="submit">추가</button>
        </div>
    </div>
</form>
```

추가 버튼을 누르면 submit이 되므로 add 함수가 실행됨.

input 태그에는 newTodoTitle이라는 변수를 바인딩.

add 함수의 파라미터로 newTodoTitle 변수를 넘겨주어 새로 추가되는 todo 객체의 title을 알려줌.





---

#### 4-2강. 폼 만들기 2

add 함수 구현

```js
$scope.add = function (newTodoTitle) {
    var newTodo = {
        title : newTodoTitle,
        completed : false,
        createdAt : Date.now()
    };

    $scope.todos.push(newTodo);

    $scope.newTodoTitle = "";
};
```

* 파라미터로 넘겨준 newTodoTitle을 title로 갖는 newTodo 객체를 생성
* 기존에 있던 $scope.todos 배열에 newTodo 객체를 push
* input 태그를 비워주기 위해 newTodoTitle에 빈 문자열을 넣어줌





---

### 4-3강. 폼 검증 1

AngularJS에서 form에 할당한 name인 'todoForm'은 $scope.todoForm으로 할당됨.

```html
<pre>{{ todoForm | json }}</pre>
```

_결과 :_      ![image-20200103121759887](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103121759887.png)

form에서 기본적으로 사용하는 변수들이 들어가 있음

$로 선언된 변수는 AngluarJS에서 사용하는 키워드



**$dirty** : input 태그에 입력이 시작되면 ture, 아니면 false.

**$pristine** : $dirty와 반대로 동작

**$valid** : 입력값이 검증되면 true, 아니면 false

**$invalid** : $valid와 반대로 동작



**3글자 미만이면 경고 메세지 출력**

```html
<form name="todoForm" ng-submit="add(newTodoTitle)">
    <div class="input-group">
        <input type="text" ... minlength="3"/>
        .
        .
        .
    </div>
    <div ng-show="todoForm.$dirty && todoForm.$invalid">
        <div class="alert alert-warning" role="alert">3글자 이상 입력하세요.</div>
    </div>
</form>
```

* input 태그에 minlength 속성으로 3글자 이상 입력해야함을 표시
* 3글자 미만이면 $invalid 값이 true가 됨
* 입력값이 있고, 3글자 미만이라면 경고 메세지가 표시됨



_결과 :_      ![image-20200103122833779](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103122833779.png)





---

#### 4-4강. 폼 검증 2

**입력값이 검증되지 않은 경우**

![image-20200103123155173](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103123155173.png)



_결과 :_     ![image-20200103123300446](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103123300446.png)

form 태그에 대해서 ng-invalid 클래스가 추가됨



**입력값이 검증된 경우**

![image-20200103123410480](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103123410480.png)



_결과 :_      ![image-20200103123427294](C:\Users\bumsu\AppData\Roaming\Typora\typora-user-images\image-20200103123427294.png)

form 태그에 대해서 ng-valid 클래스가 추가됨



_이를 이용하여 css로 클래스를 선택해 스타일을 적용할 수  있다._



```css
.input-group .ng-dirty.ng-valid {
  border : solid 1px green;
}

.input-group .ng-dirty.ng-invalid {
  border : solid 1px red;
}
```

ng-dirty이면서 ng-valid 클래스를 가지고 있다면 input 태그를 green으로 

