# ๐ Post It!

## โโ ํ๋ก์ ํธ ์ค๋ช
ํฌ์คํธ์์ ์ด์ฉํด์ ์ฆ๊ฐ์ ์ผ๋ก ์๊ฐ๋๋ ๊ฒ๋ค์ ์ถ๊ฐํ๊ณ ,
์ด๋ฅผ ๋ชจ๋  ์ฌ๋๊ณผ ๊ณต์ ํ  ์ ์๋ ์น ์ดํ๋ฆฌ์ผ์ด์

**์ํ ๋งํฌ**
<br> [link] https://post-your-plans.netlify.app/

---

### ๐ ์ฃผ์ ๊ธฐ๋ฅ

1. Post It ์์ฑ, ์๋ฐ์ดํธ, ์ญ์  ๊ธฐ๋ฅ
2. Post It ๊ฐ๋ณ ์์น ์ค์ (Drag & Drop)
3. Post It์ tag(์์ฑ) ์ถ๊ฐ, ์ญ์  ๋ฐ todo ์ถ๊ฐ, ๋ณ๊ฒฝ, ์๋ฃ, ์ญ์  ๊ธฐ๋ฅ
4. Google Log in ๋ฐ JWT Sign up/Sign in ๊ธฐ๋ฅ
5. ๋ค๋ฅธ User๋ค์ Post It ํ์ธ ๊ฐ๋ฅ

---
<!-- Line -->

### ๐ฃ Main UI
![post it main UI](https://user-images.githubusercontent.com/80020227/146124551-76118fbf-c20d-4e0b-89de-36e5bc094bac.JPG)

---

### ๐จโ๐ซ ์ฌ์ฉ ๋ฐฉ๋ฒ

1. ๋ก๊ทธ์ธ
 - Sign up/Sign in
![PostIt App - login](https://user-images.githubusercontent.com/80020227/146125367-d4ea4512-55df-444f-9e9f-3177c1d03005.gif)
 - Google Log in
![PostIt App - login with google](https://user-images.githubusercontent.com/80020227/146125386-88cc3dc5-55e0-4bf3-97ec-7910ca7146fa.gif)

2. Post It ์์ฑ 
<br>palette์์ ๊ฐ์ฅ ์ผ์ชฝ์ ์๋ add post ๋ฒํผ ํด๋ฆญ
![PostIt App - create Post](https://user-images.githubusercontent.com/80020227/146128301-209cc56f-27c5-41e8-a5ed-f557d3e34f1c.gif)

3. Post ์์ 
 <br>๋๋ธ ํด๋ฆญ(Double tab)ํ ํ Edit ์ํ๋ก ์ง์ํ์ฌ ์ ํํ Post ์์  ๊ฐ๋ฅ
 <br>\* User๊ฐ ์์ฑํ Post๋ง ๊ฐ๋ฅ<br>
  - Post Position
    - Drag & Drop ํ์ฌ ์์น ์ ์  ํ Edit Done ๋ฒํผ ํด๋ฆญ
    - Edit ์ํ๊ฐ ์๋ ๋ Drag & Drop ์ ์๋ก๊ณ ์นจ ์ ์์ํ๋ก ๋ณ๊ฒฝ
  ![PostIt App - move post](https://user-images.githubusercontent.com/80020227/146128403-195dbb16-e27e-498f-81f2-be5158421567.gif)
  
  - Tag (์ถ๊ฐ, ์ญ์ )
    - Post์ ์์ชฝ ๋ถ๋ถ์์ ์ค๋ฅธ์ชฝ ํด๋ฆญ
    - Context menu์์ ์ํ๋ ํ๊ทธ ์ ํํ์ฌ ์ถ๊ฐ
    - ํ๊ทธ ์์ x ๋ฒํผ ์ด์ฉ ์ญ์ 
    - Edit ์ํ๊ฐ ์๋ ๋ ์ถ๊ฐ ๋ฐ ์ญ์  ๋ถ๊ฐ
    ![PostIt App - add tags](https://user-images.githubusercontent.com/80020227/146128424-b8ba1a27-1760-484d-9c50-bc7dd0051a88.gif)

  - Todo (์ถ๊ฐ, ์ญ์ , ๋ณ๊ฒฝ, ์๋ฃ)
    - Input Form ์๊ธฐ๋ฉด ์ํ๋ todo ์์ฑ ๊ฐ๋ฅ
    - x icon ์ด์ฉ todo ์ญ์  ๊ฐ๋ฅ
    - edit icon ํด๋ฆญ ์ ํด๋น todo ์์  ๊ฐ๋ฅ
    - todo ์์ฒด ํด๋ฆญ ์ ํด๋น todo ์๋ฃ ์ฒ๋ฆฌ
    - Edit ์ํ๊ฐ ์๋ ๋ todo ์์  ๋ถ๊ฐ
    
    ![PostIt App - todos (add, edit, remove, complete)](https://user-images.githubusercontent.com/80020227/146128456-88abbac3-77b8-4929-b66c-9e24e79d8fcf.gif)

4. Post It ์ญ์  
  - Post ์ญ์ 
    - Post์ ๋ง์ฐ์ค ์ฌ๋ ค ๋์ ์ X ๋ฒํผ(remove button) ์์ฑ, ๊ฐ๋ณ ์ญ์  ๊ฐ๋ฅ
    ![PostIt App - delete post](https://user-images.githubusercontent.com/80020227/146128485-29fea2ee-d691-423b-9066-7fc34898a2a6.gif)

  - ๋ชจ๋  Post ์ญ์ 
    - palette์ ๋๋ฒ์งธ ๋ฒํผ ํด๋ฆญ ์ ๋ชจ๋  Post ์ญ์  ๊ฐ๋ฅ (user๊ฐ ์์ฑํ ๊ฒ๋ง ๋ชจ๋ ์ญ์ )
    ![PostIt App - delete all post](https://user-images.githubusercontent.com/80020227/146128493-22f465ea-86ad-495b-ae75-3cd8cbf833c5.gif)

---

### ๐  ๊ธฐ์  ์คํ

- Frontend : React, Redux
- Backend : node.JS(express), MongoDB
- ๋ฐฐํฌ: front(Netlify), back(Heroku)

---

### ๐ ๊ฐ๋ฐ ๊ณผ์ 
 - Vanilla JS์ Local Storage๋ฅผ ํ์ฉํ์ฌ ๊ธฐํ ๋ฐ ๊ธฐ๋ฅ ๊ตฌํ
 - React๋ฅผ ์ฌ์ฉํ์ฌ Refactoring ๋ฐ ๊ธฐ๋ฅ ์ถ๊ฐ
 - MERN stack ์ฌ์ฉํ์ฌ Front๋จ Refactoring ๋ฐ MongoDB์ Express๋ฅผ ์ฌ์ฉํ์ฌ Server๋จ์ ๊ตฌ์ถ

### ๐ ์ง๋ ๋ฒ์ 
 1. Vanilla JS + Local Storage ํ์ฉ ๊ตฌํ
  ![My ToDoList - Chrome 2021-09-28 17-36-24](https://user-images.githubusercontent.com/80020227/135054537-9be21371-8df5-4465-91cb-a823323ad110.gif)
  [link] https://github.com/JISU-Y/PostIt

 2. React Client ๋ถ๋ถ๋ง ๊ตฌํ
  ![React App - Chrome 2021-09-28 17-38-22](https://user-images.githubusercontent.com/80020227/135054556-8112ed5e-321c-4159-9c2e-86645c9630cf.gif)
  [link] https://github.com/JISU-Y/react-app-post-it

### ๐จโ๐ป ๊ฐ๋ฐ ์ธ์
1์ธ

### โ ๊ฐ๋ฐ ๊ธฐ๊ฐ
2021.09.03 ~ ์ง์ ๋ฆฌํฉํ ๋ง ์ค
