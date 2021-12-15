# Post It!

## 프로젝트 설명
포스트잇을 이용해서 즉각적으로 생각나는 것들을 추가하고,
이를 모든 사람과 공유할 수 있는 어플

**작품 링크**
[link] https://post-your-plans.netlify.app/

---

### 주요 기능

1. Post It 생성, 업데이트, 삭제 기능
2. Post It 개별 위치 설정(Drag & Drop)
3. Post It에 todo 추가, 변경, 완료, 삭제 기능
4. Google Log in 및 JWT Sign up/Sign in 기능
5. 다른 User들의 Post It 확인 가능

---
<!-- Line -->

### Main UI
![post it main UI](https://user-images.githubusercontent.com/80020227/146124551-76118fbf-c20d-4e0b-89de-36e5bc094bac.JPG)

---

#### 사용 방법

1. 로그인
 - Sign up/Sign in
![PostIt App - login](https://user-images.githubusercontent.com/80020227/146125367-d4ea4512-55df-444f-9e9f-3177c1d03005.gif)
 - Google Log in
![PostIt App - login with google](https://user-images.githubusercontent.com/80020227/146125386-88cc3dc5-55e0-4bf3-97ec-7910ca7146fa.gif)

2. Post It 생성
palette에서 가장 왼쪽에 있는 add post 버튼 클릭
![PostIt App - create Post](https://user-images.githubusercontent.com/80020227/146128301-209cc56f-27c5-41e8-a5ed-f557d3e34f1c.gif)

3. Post 수정
 더블 클릭(Double tab)한 후 Edit 상태로 진입하여 선택한 Post 수정 가능
 \* User가 생성한 Post만 가능
 
 1) Post Position
 Drag & Drop 하여 위치 선정 후 Edit Done 버튼 클릭
 \* Edit 상태가 아닐 때 Drag & Drop 시 새로고침 시 원상태로 변경
 ![PostIt App - move post](https://user-images.githubusercontent.com/80020227/146128403-195dbb16-e27e-498f-81f2-be5158421567.gif)

 2) Tag (추가, 삭제)
 Post의 위쪽 부분에서 오른쪽 클릭
 Context menu에서 원하는 태그 선택하여 추가
 태그 옆의 x 버튼 이용 삭제
 \* Edit 상태가 아닐 때 추가 및 삭제 불가
 ![PostIt App - add tags](https://user-images.githubusercontent.com/80020227/146128424-b8ba1a27-1760-484d-9c50-bc7dd0051a88.gif)

 3) Todo (추가, 삭제, 변경, 완료)
 Input Form 생기면 원하는 todo 생성 가능
 x icon 이용 todo 삭제 가능
 edit icon 클릭 시 해당 todo 수정 가능
 todo 자체 클릭 시 해당 todo 완료 처리
 \* Edit 상태가 아닐 때 todo 수정 불가
 ![PostIt App - todos (add, edit, remove, complete)](https://user-images.githubusercontent.com/80020227/146128456-88abbac3-77b8-4929-b66c-9e24e79d8fcf.gif)

4. Post It 삭제
 Post에 마우스 올려 놓을 시 X 버튼(remove button) 생성, 개별 삭제 가능
 1) Post 삭제
 ![PostIt App - delete post](https://user-images.githubusercontent.com/80020227/146128485-29fea2ee-d691-423b-9066-7fc34898a2a6.gif)

 2) 모든 Post 삭제
 palette의 두번째 버튼 클릭 시 모든 Post 삭제 가능 (user가 생성한 것만 모두 삭제)
 ![PostIt App - delete all post](https://user-images.githubusercontent.com/80020227/146128493-22f465ea-86ad-495b-ae75-3cd8cbf833c5.gif)

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

 ##### 지난 버전
 1. Vanilla JS + Local Storage 활용 구현
  ![My ToDoList - Chrome 2021-09-28 17-36-24](https://user-images.githubusercontent.com/80020227/135054537-9be21371-8df5-4465-91cb-a823323ad110.gif)

 2. React Client 부분만 구현
  ![React App - Chrome 2021-09-28 17-38-22](https://user-images.githubusercontent.com/80020227/135054556-8112ed5e-321c-4159-9c2e-86645c9630cf.gif)

#### 개발 인원
1인

#### 개발 기간
2021.06부터 (Vanilla JS->React->Mern Stack) 진행 중 
