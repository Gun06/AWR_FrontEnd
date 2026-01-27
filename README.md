# AWESOME REASON

<img width="1462" height="706" alt="awesome reason" src="https://github.com/user-attachments/assets/8bec4f54-088a-4e24-9998-934ff6f3583e" />

---

## 📋 프로젝트 소개

AWESOME REASON은 Cafe24 기반의 전자상거래 웹사이트 프로젝트입니다. 커스텀 테마(artfinger)를 사용하여 구현된 쇼핑몰 사이트로, 상품 관리, 주문 처리, 회원 관리, 게시판 등 다양한 기능을 제공합니다.

---

## 🎯 주요 기능

### 🛍️ 상품 관리
- 상품 목록 조회 (갤러리, 썸네일, 줌 뷰)
- 상품 상세 정보 및 옵션 선택
- 상품 검색 및 필터링
- 장바구니 및 위시리스트 관리

### 📦 주문 관리
- 주문서 작성 및 결제 처리
- 주문 내역 조회 및 관리
- 배송지 관리
- 정기배송 서비스

### 👤 회원 관리
- 회원 가입/로그인
- 회원 정보 수정
- 마일리지 및 쿠폰 관리
- 주문 내역 조회

### 📝 게시판
- 자유 게시판
- 상품 후기 및 문의(Q&A)
- 갤러리
- 공지사항

### ✨ 기타 기능
- 룩북(Lookbook)
- 아카이브
- 이벤트/프레스
- 쿠폰존

---

## 📁 프로젝트 구조

```
AWESOME REASON/
│
├── artfinger/              # 커스텀 테마 디렉토리
│   ├── css/               # 테마 스타일시트
│   │   ├── main.css
│   │   ├── category.css
│   │   ├── footer.css
│   │   ├── extend.css
│   │   └── ...
│   ├── js/                # 테마 JavaScript 파일
│   │   ├── basetool.js   # 기본 유틸리티
│   │   ├── category.js
│   │   ├── main_control.js
│   │   └── ...
│   ├── img/              # 테마 이미지 파일
│   └── *.html            # 테마 HTML 템플릿 파일
│
├── product/              # 상품 관련 페이지
│   ├── list.html        # 상품 목록
│   ├── detail.html      # 상품 상세
│   ├── search.html      # 상품 검색
│   ├── list.js
│   ├── detail.js
│   └── ...
│
├── order/                # 주문 관련 페이지
│   ├── basket.html      # 장바구니
│   ├── form.html        # 주문서
│   └── ...
│
├── member/               # 회원 관련 페이지
│   ├── login.html
│   ├── join.html
│   └── ...
│
├── myshop/               # 마이샵 (회원 전용 페이지)
│   ├── index.html
│   ├── order/           # 주문 내역
│   ├── mileage/         # 마일리지
│   ├── addr/            # 배송지 관리
│   └── ...
│
├── board/                # 게시판
│   ├── free/            # 자유 게시판
│   ├── product/         # 상품 게시판
│   ├── review/          # 후기
│   ├── gallery/         # 갤러리
│   └── ...
│
├── layout/               # 레이아웃 컴포넌트
│   └── basic/           # 기본 레이아웃
│
├── css/                  # 전역 스타일시트
│   └── module/          # 모듈별 CSS
│
├── js/                   # 전역 JavaScript
│   ├── common.js
│   └── module/          # 모듈별 JS
│
├── calendar/             # 캘린더 기능
├── coupon/               # 쿠폰 관련
├── lookbook/             # 룩북
├── archive/              # 아카이브
├── press/                # 프레스
├── contact/              # 연락처
├── shopinfo/             # 쇼핑몰 정보
├── gridsystem/           # 그리드 시스템
├── config/               # 설정 파일
│
├── index.js              # 메인 JavaScript
├── index.css             # 메인 CSS
└── robots.txt            # 검색 엔진 설정
```

---

## 🛠 기술 스택

### Frontend
- **HTML5** - 마크업
- **CSS3** - 스타일링
- **JavaScript (jQuery)** - 인터랙션 및 동적 기능
- **Swiper.js** - 슬라이더/캐러셀
- **FullCalendar** - 캘린더 기능
- **Colorbox/Fancybox** - 이미지 팝업

### Backend Platform
- **Cafe24** - 전자상거래 플랫폼

---

## 📂 주요 디렉토리 설명

| 디렉토리 | 설명 |
|---------|------|
| **`/artfinger`** | 커스텀 테마의 핵심 디렉토리. 모든 레이아웃, 스타일, 스크립트 포함 |
| **`/product`** | 상품 관련 모든 페이지와 기능 |
| **`/order`** | 주문 프로세스 관련 페이지 |
| **`/myshop`** | 회원 전용 마이페이지 기능 |
| **`/board`** | 다양한 게시판 기능 |
| **`/layout`** | 재사용 가능한 레이아웃 컴포넌트 |
| **`/css`** | 전역 및 모듈별 스타일시트 |
| **`/js`** | 전역 및 모듈별 JavaScript |

---

## 🚀 시작하기

### 요구사항
- 웹 서버 (Cafe24 호스팅 환경)
- 브라우저 지원: 최신 버전의 Chrome, Firefox, Safari, Edge

### 설치 방법
1. 프로젝트 파일을 웹 서버에 업로드
2. Cafe24 관리자 페이지에서 테마 설정
3. 필요한 설정 파일(`config/`) 구성
4. 데이터베이스 연결 확인

---

## 📝 주요 파일 설명

| 파일 | 설명 |
|------|------|
| `artfinger/js/basetool.js` | 테마의 기본 유틸리티 및 공통 기능 (상품 옵션 선택, 검색, 슬라이더 초기화 등) |
| `artfinger/css/extend.css` | 테마의 확장 스타일 정의 |
| `artfinger/css/main.css` | 메인 페이지 스타일 정의 |
| `product/list.js` | 상품 목록 페이지의 동적 기능 처리 |
| `product/detail.js` | 상품 상세 페이지의 동적 기능 처리 |

---

## 🎨 커스터마이징

### 테마 색상 변경
`artfinger/css/` 디렉토리의 CSS 파일에서 색상 변수를 수정하세요.

### 레이아웃 수정
`artfinger/` 디렉토리의 HTML 템플릿 파일들을 수정하세요.

### 기능 추가
`artfinger/js/` 디렉토리에 새로운 JavaScript 파일을 추가하거나 기존 파일을 수정하세요.

---

## 📱 반응형 디자인

이 프로젝트는 모바일, 태블릿, 데스크톱 환경을 모두 지원합니다.

- ✅ 모바일 최적화 레이아웃
- ✅ 터치 제스처 지원
- ✅ 반응형 이미지 및 미디어 쿼리

---

**마지막 업데이트**: 2026년 1월
