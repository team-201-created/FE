# Ozent - 사용자 맞춤 향기 추천 서비스

> 당신만의 향기를 찾아드립니다. AI 기반 맞춤 향수 추천 플랫폼, Ozent

<br />

## 📖 프로젝트 소개

**Ozent**는 사용자의 취향, 비주얼, 웰니스 라이프스타일을 분석하여
가장 잘 어울리는 향기를 추천해주는 AI 기반 향수 추천 서비스입니다.

복잡한 향수 세계를 쉽고 재미있게 탐색하고,
나만의 향기 스토리지를 만들어 보세요.

<br />

## 🔗 배포 링크

<a href="https://oz-scent-match.duckdns.org/" target="_blank">
  <img width="30" height="30" alt="image"
       src="https://github.com/user-attachments/assets/0c8a752f-bf48-4f3f-b68b-2347bcb8a745" />
</a>

<br />

## 🖥️ 서비스 소개

### 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **내 향기 찾기** | AI 비주얼 분석, 취향 테스트, 웰니스 라이프스타일 기반 향수 추천 |
| 🛍️ **향수 탐색** | 다양한 향수 상품을 카테고리별로 탐색하고 필터링 |
| 💾 **향기 스토리지** | 마음에 드는 향수를 저장하고 나만의 컬렉션 관리 |
| 👤 **프로필 관리** | 개인 취향 프로필 설정 및 추천 기록 관리 |

### 서비스 흐름

사용자는 아래와 같은 단계로 개인화된 향기를 추천받습니다

1. 랜딩 페이지에서 서비스 탐색

https://github.com/user-attachments/assets/06d6dd57-66c1-4cf7-9e01-f3c73833233e

2. 로그인
   
https://github.com/user-attachments/assets/05389813-0f8e-45cd-a80d-cf84550feb77


3. 취향 / 웰니스 테스트

https://github.com/user-attachments/assets/7e275c99-559e-4fe7-9973-fdf2037c79c5


4. AI 비주얼 분석

https://github.com/user-attachments/assets/384704c1-4cc7-44ce-afd6-cc16a8989e35

5. 맞춤 향수 추천 결과 확인

https://github.com/user-attachments/assets/8fc36f5e-20fc-41bb-a25d-dd8421fec1e8

6. 향기 스토리지 저장

https://github.com/user-attachments/assets/4914be75-533c-4caf-b214-2b31e6be0dad

<br />

## 🧰 기술 스택

### Frontend

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, Class Variance Authority, clsx, Tailwind Merge  |
| **State Management** | Zustand 5 |
| **Animation** | Motion (Framer Motion) |
| **API Mocking** | MSW (Mock Service Worker) |
| **Component** | React Functional Component |

### DevOps & Tools

| 분류 | 기술 |
|------|------|
| **CI/CD** | GitHub Actions |
| **Deployment** | AWS EC2 + CodeDeploy + S3 |
| **Process Manager** | PM2 |
| **Code Quality** | ESLint, Prettier, Husky, lint-staged |
| **Commit Convention** | Commitlint, Commitizen |
| **Notification** | Discord Webhook |

<br />

## 👥 팀 동료

### Frontend

| **류현식** | **김소연** | **최준원** |
| :------: |  :------: | :------: | 
| [<img src="https://avatars.githubusercontent.com/u/126768512?v=4" height=150 width=150> <br/> @hyunsik2000](https://github.com/hyunsik2000) | [<img src="https://avatars.githubusercontent.com/u/233898159?v=4" height=150 width=150> <br/> @gkdl0471-code](https://github.com/gkdl0471-code) | [<img src="https://avatars.githubusercontent.com/u/235099867?v=4" height=150 width=150> <br/> @JoonHana](https://github.com/JoonHana) | 
| **어드민 페이지 , 배포 CI/CD 구조 설계** | **향 상품 페이지, 향기 테스트/결과 페이지** | **로그인 , 향기 저장소, 회원탈퇴** |

<br />

## 📑 프로젝트 규칙

### 브랜치 전략

main

├── dev # 개발 통합 브랜치 (배포 트리거)

│ ├── feat/{이슈번호} - 작업명

│ ├── fix/{이슈번호} - 작업명

│ ├── refactor/{이슈번호} - 작업명

│ ├── style/{이슈번호} - 작업명

│ ├── chore/{이슈번호} - 작업명

│ ├── docs/{이슈번호} - 작업명

### 커밋 컨벤션

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩터링 |
| `style` | 스타일 변경 (로직 변경 없음) |
| `chore` | 빌드, 패키지, 설정 변경 |
| `docs` | 문서 수정 |

### PR 규칙

- PR 템플릿 필수 작성
- 최소 1명 이상 리뷰 승인 후 머지
- `dev` 브랜치로만 PR 생성

<br />

## 📋 Documents

| 문서 | 링크 |
|------|------|
| 디자인 시안 | <a href="https://www.figma.com/design/2i0DWQDDfucuHhbYJCtdRz/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%95%88?node-id=0-1&t=cE3IePNv1p9stxIy-1" target="_blank"><img width="30" src="https://images.icon-icons.com/2429/PNG/512/figma_logo_icon_147289.png"/></a> |
| 프로우 차트 | <a href="https://www.figma.com/board/S5fL15SWgUIKfrZDp8U1hZ/%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%B0%A8%ED%8A%B8?node-id=0-1&t=wJeTlcXuC1yPyjtg-1" target="_blank"><img width="30" src="https://images.icon-icons.com/2429/PNG/512/figma_logo_icon_147289.png"/></a> |


