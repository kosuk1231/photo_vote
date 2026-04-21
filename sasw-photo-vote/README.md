# 📸 사진 투표 앱 — 서울특별시사회복지사협회

창립 40주년 기념 사진 투표 웹앱입니다.

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 빌드 (배포용)
npm run build
```

## 📁 프로젝트 구조

```
├── index.html          # 진입점
├── package.json
├── vite.config.js
├── public/
│   └── photos/         # 사진 파일을 여기에 넣으세요 (01.jpg ~ 08.jpg)
└── src/
    ├── main.jsx        # React 마운트
    └── App.jsx         # 메인 앱 (투표 + 관리자)
```

## 🖼️ 사진 교체 방법

1. `public/photos/` 폴더에 사진 파일을 넣으세요
2. `src/App.jsx` 파일 상단의 `PHOTOS` 배열에서 각 항목에 `image` 필드를 추가하세요:

```js
const PHOTOS = [
  { id: 1, title: "따뜻한 동행", description: "...", image: "/photos/01.jpg" },
  { id: 2, title: "작은 쉼터", description: "...", image: "/photos/02.jpg" },
  // ...
];
```

## 📊 Google 스프레드시트 연동

### 1단계: Apps Script 생성

스프레드시트 → 확장 프로그램 → Apps Script에서 아래 코드를 붙여넣으세요:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.time,
    data.name,
    data.phone,
    data.photoId,
    data.photoTitle,
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 2단계: 웹앱으로 배포

- 배포 → 새 배포 → 웹앱
- 실행 권한: **나**
- 액세스: **모든 사용자**
- 배포 후 URL 복사

### 3단계: URL 연결

`src/App.jsx`에서 `APPS_SCRIPT_URL`에 복사한 URL을 입력:

```js
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/...여기에.../exec";
```

## 🔐 관리자 모드

- 시작 화면 하단 **관리자 모드** 클릭
- 기본 비밀번호: `admin2026`
- `src/App.jsx`에서 `ADMIN_PASSWORD` 값을 변경하세요

## 🌐 Vercel 배포

```bash
# Vercel CLI
npm i -g vercel
vercel
```

또는 GitHub 리포지토리를 Vercel에 연결하면 push 시 자동 배포됩니다.
