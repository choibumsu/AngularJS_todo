# Angular.js 학습

인프런 강의

**AngularJS 기본 개념과 To-Do 앱 만들기 실습**



### Section 1. AngularJS의 개념

#### 1-1강. AngularJS의 개념들

[앵귤러js 개념 공식 홈페이지](https://docs.angularjs.org/guide/concepts)



**Directives** : 확장된 HTML

Custom attributes와 elements를 가짐.

AngularJS에서는 HTML 태그를 직접 정의해서 사용할 수 있다.

태그의 속성도 직접 정의할 수 있다.

AngularJS에 내장되어 있는 태그가 있고, 커스텀 태그가 있다.



**Expressions** : JS 변수에 저장된 값을 HTML에 뿌려주는 기법

```html
<p>
    hello {{name}}!
</p>
```

JS에 있는 name이라는 변수에 담긴 값이 {{ name }} 에 치환되어 들어간다.

name이 'bumsu'라면 "hello bumsu!"라는 문자열이 HTML로 출력됨



**Module** : Angular의 Directive, Controller, Service를 하나로 모아놓은 Container

기능적으로 비슷한 것들끼리 모아서 모듈을 만듬.

모듈 간 의존관계가 있는 경우, 다른 모듈을 주입해서 사용할 수 있다.



**Controller** : HTML 뒷단에서 View를 조작하는 것

비지니스 로직을 구현하는데에만 사용해야 한다.

Controller는 오로지 View의 비지니스 로직을 다둘 때만 사용한다.



_Controller를 사용하면 안 되는 경우_

* DOM 객체를 조작할 때
* Input 필드를 조작할 때
* filter로 출력값을 조작할 때



**Service** : 재사용 가능한 비지니스 로직

AngularJS에서 Service는 Singleton으로 구성되어 있다.

앱의 데이터를 관리하는 용도로 사용하는 것이 좋다.



---

#### 1-2강. AngularJS 개발 환경 구성

Editor : [**Plunker**](http://plnkr.co/edit/?p=catalogue)

웹 프론트를 간편히 작성할 수 있는 에디터

cdn을 통해 간편히 라이브러리를 추가할 수 있다.