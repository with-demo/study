# Task — 나의 작업 공간

개인 작업, 프로젝트, 일정을 한곳에서 관리하는 한국어 웹 앱입니다. 제공된 사이트맵·기능 명세 v0.2를 기준으로 구현했습니다.

## 기능

- ChatGPT 계정 로그인과 계정별 서버 저장
- 오늘·기한 초과·진행 중 요약 대시보드
- 작업 CRUD, 완료·다시 열기, 목록·드래그 보드
- 프로젝트·우선순위·태그·상태 필터, 정렬, 일괄 변경
- 프로젝트 개요·진행률·목표일·보관
- 월간 캘린더와 날짜별 작업
- 휴지통, 복원, 확인 후 영구 삭제
- 통합 검색, 체크리스트, 모바일 레이아웃
- JSON 백업 내보내기·검증 후 전체 대체 가져오기

처음 로그인하면 빈 공간으로 시작합니다. 작업 제목·설명 등 필드 편집은 저장 버튼으로 확정합니다. 날짜 기준은 Asia/Seoul입니다.

## 기술 구성

React 19, TypeScript, Vinext, Cloudflare Workers, D1, Drizzle. 인증은 Sites의 ChatGPT 인증 게이트웨이를 사용합니다. D1에는 사용자별 작업 공간과 수정 버전을 저장합니다. 충돌 시 서버는 409를 반환해 덮어쓰기를 막습니다.

## 실행

Node.js 22.13 이상과 npm이 필요합니다.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_fluffy_kate_bishop.sql
npm run dev
```

`http://127.0.0.1:5173`에서 로컬 미리보기를 엽니다. 로컬 인증은 starter가 제공하는 테스트 계정이며 실제 서비스 데이터와 분리됩니다. 위 SQL은 최초 로컬 DB 초기화 때 한 번만 적용합니다. 이미 초기화했다면 생략합니다.

다른 호스팅 환경에서 실행하려면 신뢰할 수 있는 인증 계층과 D1 바인딩을 구성해야 합니다. GitHub Pages만으로 서버 API를 실행할 수 없습니다.

## 검증

```sh
node --test tests/domain.test.mjs tests/api.test.mjs
npx tsc --noEmit
npm run build
```

`tests/api.test.mjs`는 Node.js 24의 내장 SQLite를 이용해 실제 API 핸들러를 검증합니다. API·도메인 테스트 총 16개, 타입 검사, 배포 빌드를 통과했습니다. 로컬 브라우저 미리보기는 실행 승인이 없어 검증하지 못했습니다. 실계정 로그인과 실기기 화면 검증은 별도로 필요합니다.

## 코드 안내

- `app/task-app.tsx`: 화면과 입력 흐름
- `app/task.css`: 반응형 스타일
- `app/api/workspace/route.ts`: 인증·검증·데이터 갱신
- `app/domain.ts`: 상태·완료율·삭제·복원 규칙
- `db/schema.ts`, `drizzle/`: 데이터베이스 스키마와 마이그레이션
- `.openai/hosting.json`: 사이트 식별자와 D1 바인딩

[구현 정책](IMPLEMENTATION.md) · [GitHub 업로드 안내](GITHUB-GUIDE.md)

## GitHub 저장 위치

기존 `with-demo/study` 저장소의 `jshwan` 폴더 아래에 **task-workspace**를 추가합니다. 기존 `index.html` 등은 유지합니다. GitHub는 소스와 변경 이력을 관리하며 실제 서비스 배포와는 별도입니다.
