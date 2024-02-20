# [react] 좋아하는 아티스트에게 팬 레터를 보내세요!

## 프로젝트 미리보기
![프로젝트 소개](./src/assets/img/projectView.gif)

<br />

## 프로젝트 소개
- react useState, context API, redux 를 활용한 상태 관리
- url : [바로가기](https://artist-letters-project.vercel.app/)

<br />

## 개발 기간
2024.01.29 - 2024.02.04 (8일)

<br />

## 프로젝트 요구사항
### 필수 요구사항
- [x]  props-drilling, context, redux 순으로 각각 별도의 브랜치를 만들어 제출
  - `props-drilling` : context나 redux 없이 useState만으로 상태관리해서 코드를 작성합니다.
  - `context` : react context API를 사용하여 전역상태를 이용한 리팩터링
  - `redux` : react context API를 redux로 리팩터링
- [x]  styled-components 를 이용하여 스타일링
    - 인라인 스타일링이나 일반 css 파일을 이용한 스타일링 방식 지양 (이번 과제 한정)
    - 모든 태그를 styled-components 화 할 필요는 없으나 스타일링이 들어가는 경우는 styled-components 화 할 것
- [x]  전역 스타일에 reset.css 를 적용해주고 box-sizing이 border-box가 되도록 설정
- [x]  styled-components에 props를 넘김으로 인한 조건부 스타일링 적용
    - 아티스트 선택탭에 적용해 보세요
- [x]  팬레터 등록 시 id는 uuid 라이브러리를 이용

### 선택 요구사항
- [ ] 모달 구현
    - window.alert 이나 window.conform 대신 직접 구현한 모달을 적용해 봅시다.
- [x] 만능 버튼 구현(공통 컴포넌트 버튼)
    - 하나의 버튼 컴포넌트를 홈화면과 상세화면 모두에서 적용할 수 있도록 해봅시다.
    - props 로 버튼 크기나 버튼 텍스트 등을 받아봅시다.
- [x] 새로고침해도 UI 유지
    - 로컬스토리지를 이용해 봅시다.
- [ ] 검색 기능 구현
    - query string을 적용해 봅시다. (ex. http://localhost:3000?search=에스파)
    - react-router-dom의 useSearchParams를 이용해 보세요.

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