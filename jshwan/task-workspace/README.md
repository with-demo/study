# Task — 스터디 데모

**[GitHub Pages에서 데모 열기](https://with-demo.github.io/study/jshwan/task-workspace/)**

로그인 화면의 **로그인** 버튼을 누르면 즉시 작업 공간으로 들어갑니다. 실제 계정 생성, 비밀번호 입력, ChatGPT·GitHub 인증은 하지 않습니다.

## 사용 방식

- 홈, 작업 목록·보드, 프로젝트, 캘린더, 보관함·휴지통, 검색, 체크리스트, 설정을 체험할 수 있습니다.
- 작업은 현재 브라우저의 localStorage에 저장합니다. 다른 기기·브라우저와 공유하거나 서버에 동기화하지 않습니다.
- 로그아웃은 로그인 화면으로 돌아가는 데모 동작입니다. 저장한 작업은 같은 브라우저에서 다시 볼 수 있습니다.
- 브라우저 데이터를 삭제하면 작업도 삭제됩니다. 데이터 관리에서 JSON 백업을 다운로드하거나 가져올 수 있습니다.
- 최초 상태는 빈 작업 공간입니다. 실제 사용자의 예시 데이터나 계정 정보는 포함하지 않습니다.

## GitHub Pages 구성

저장소의 기존 Pages 설정으로 서비스합니다. 새 서버나 데이터베이스 설정은 필요하지 않습니다.

- `index.html`: Pages 진입점
- `demo-assets/`: 빌드된 JavaScript·CSS·라이선스
- `demo/`: 데모 진입·브라우저 저장·해시 경로·공통 도구 연결
- `app/task-app.tsx`, `app/task.css`: 기존 화면과 스타일
- `../../common/include/spec-panel.js`: 저장소 공통 스터디 도구를 상대 경로로 참조

메뉴는 해시 경로를 사용하므로 하위 화면에서 새로고침해도 GitHub Pages 404가 나지 않습니다. 이전 여행 사이트는 [기존 주소](https://with-demo.github.io/study/jshwan/)에서 그대로 유지합니다.

상단 도구의 Description은 읽기 전용 화면 설명입니다. 설명 공동 저장·댓글·실제 GitHub 인증은 이번 데모에 연결하지 않았습니다. 화면 ID는 JST 접두사, 데모 데이터 키는 study.jshwan.task-workspace.v1을 사용합니다.

## 수정 및 빌드

Node.js 22 이상에서 다음을 실행합니다.

```sh
npm ci
npm run test:demo
npm run build:demo
```

소스를 수정하면 생성된 `demo-assets/`도 함께 커밋해야 Pages 화면에 반영됩니다. Pages에서는 `npm run build`나 서버 API를 실행하지 않습니다.

기존 서버 구현인 `app/api/`, `worker/`, `db/`, `.openai/`는 이전 구현을 보존한 것이며 이 정적 데모에서는 사용하지 않습니다. 기존 비공개 Sites 배포의 인증과 데이터를 변경하거나 공개하지 않습니다.

## 검증

데모 로그인, 인증·네트워크 없는 저장, 로그아웃 후 유지, 잘못된 입력, 완료·다시 열기, 버전 충돌, 저장 공간 실패, 삭제·복원, 백업 검증 테스트 9개와 TypeScript·정적 빌드를 확인합니다. 실제 브라우저 화면 검증 여부는 PR의 검증 결과를 참고하세요.
