# [react] 좋아하는 아티스트에게 팬 레터를 보내세요!

## 프로젝트 미리보기
![프로젝트 소개](./src/assets/img/projectView.gif)

<br />

## 프로젝트 소개
- react redux thunk 를 활용한 프로젝트
- url : [바로가기](https://artist-letters-auth-project.vercel.app/)

<br />

## 개발 기간
2024.02.20 - 2024.02.22 (3일)

<br />

## 프로젝트 기능
- 로그인
- 회원가입
- 팬 레터 CRUD
- 마이페이지 닉네임 수정

## 구현하지 못한 기능
- 프로필 이미지 변경 기능

<br />

## 상태 관리
### 전역 상태
[letter]
- 레터의 전체 데이터
- localStorage key

[member]
- 아티스트 멤버별 데이터
- 선택한 아티스트 id 데이터


<br />


## 프로젝트 구조

### redux 브랜치
- 컴포넌트명styles.js : 컴포넌트 별 styled-component 파일
```
artist-letters-project
├─ .git
├─ .gitignore
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  ├─ reset.css
│  └─ robots.txt
├─ README.md
├─ README.old.md
└─ src
   ├─ App.jsx
   ├─ App.test.js
   ├─ assets
   │  └─ img
   │     ├─ projectView.gif
   │     ├─ thumb1.jpg
   │     ├─ thumb2.jpg
   │     ├─ thumb3.jpg
   │     ├─ thumb4.jpg
   │     ├─ thumb5.jpg
   │     ├─ thumb6.jpg
   │     ├─ thumb7.jpg
   │     ├─ thumb8.jpg
   │     ├─ topBanner1.jpg
   │     ├─ topBanner2.jpg
   │     ├─ topBanner3.png
   │     ├─ user-w.png
   │     └─ user.png
   ├─ components
   │  ├─ Button
   │  │  ├─ Button.jsx
   │  │  └─ ButtonStyles.js
   │  ├─ Footer
   │  │  ├─ Footer.jsx
   │  │  └─ FooterStyles.js
   │  ├─ Header
   │  │  ├─ Header.jsx
   │  │  └─ HeaderStyles.js
   │  ├─ Layout
   │  │  ├─ Layout.jsx
   │  │  └─ LayoutStyles.js
   │  ├─ Letter
   │  │  ├─ EmptyItem.jsx
   │  │  ├─ LetterItem.jsx
   │  │  ├─ LetterList.jsx
   │  │  └─ LetterStyles.js
   │  ├─ LetterDetail
   │  │  ├─ LetterContent.jsx
   │  │  └─ LetterDetailStyles.js
   │  ├─ LetterForm
   │  │  ├─ LetterForm.jsx
   │  │  ├─ LetterFormStyles.js
   │  │  └─ LetterSelect.jsx
   │  ├─ Members
   │  │  ├─ Member.jsx
   │  │  ├─ MemberList.jsx
   │  │  └─ MemberStyles.js
   │  └─ TopBanner
   │     ├─ TopBanner.jsx
   │     └─ TopBannerStyles.js
   ├─ index.js
   ├─ pages
   │  ├─ Detail.jsx
   │  └─ Home.jsx
   ├─ redux
   │  ├─ config
   │  │  └─ configStore.js
   │  └─ modules
   │     ├─ letter.js
   │     └─ member.js
   ├─ reportWebVitals.js
   ├─ setupTests.js
   └─ shared
      ├─ fakeData.json
      ├─ memberData.js //아티스트 데이터
      └─ Router.js

```