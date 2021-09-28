# Post It! App

포스트잇 모양의 To-Do 관리 어플

- 포스트잇 내부에 To-Do List를 작성하여 게시하고 저장 및 공유하는 어플

---

### 주요 기능

1. Post It 개별 생성, 삭제
2. Post It 개별 속성 선택 설정 가능(Tag: Important, Today, Later ..)
3. Post It 개별 위치 선정 가능(Drag & Drop)
4. Google Log in 및 JWT Sign up/Sign in 가능, User만 사용 가능(Auth)
5. 다른 User들의 Post It 확인 가능

---
<!-- Line -->

### UI 및 결과 Image

#### Main UI Image

<img width="174" alt="Main UI" src="https://user-images.githubusercontent.com/80020227/124286811-484e6880-db8a-11eb-93e2-32eeac25ce7a.PNG">

---

#### How to use
![ResultVideo](https://user-images.githubusercontent.com/80020227/124354549-8493ce80-dc47-11eb-8b3e-e617e783afa5.gif)

---

### 기술 스택
1. React
2. Express
3. Mongoose

---

### 기타

#### 개발 이유
 - 처음 Vanilla JS를 배우면서 To-Do List Project를 클론하며 공부하기 시작했고, 나만의 App을 만들어 보고 싶다고 생각했습니다.
 - 할 일은 여러가지이고, 문서 정리하는 것을 좋아하기 때문에 할일을 분류화할 수 있는 방법이 어떤 것이 있는지 생각해보았고
 - Post It 처럼 생각날 때마다 할 일이나 사야할 것 등을 적어서 눈에 잘 보이는 곳에 두거나 다른 사람과 공유할 수 있는 방법을 구상했고, 제작하게 되었습니다.

#### 개발 과정
 - 먼저 Vanilla JS와 Local Storage를 활용한 간단한 Web App을 만들었고, 추후에 React를 배우면서 다시 Refactoring 하였습니다.
 - 이후 User Log in과 Data 저장을 위해 MongoDB와 Express를 사용하여 Server단을 구축하였습니다.
 - 추후 Global state 관리 및 디자인 등 추가 업데이트 지속 실시 예정입니다.

#### 개발 인원
1인

#### 개발 기간
2021.06부터 (Vanilla JS로 구현) 진행 중 
