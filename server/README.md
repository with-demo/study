# study 전용 로그인·Description 서버

GitHub Pages 화면은 그대로 유지하고, Cloudflare Workers + D1에서 인증과 설명을 저장합니다.
대상 저장소는 `with-demo/study`로 고정합니다. 다른 프로젝트 서버/권한을 사용하지 않습니다.
현재 서버 코드는 준비되어 있으나 계정·DB·비밀값 설정 및 배포 전입니다.
`common/config.js`는 실제 배포 확인 전까지 미설정을 유지합니다.

## 계정 소유자가 할 일

1. [Cloudflare](https://dash.cloudflare.com/sign-up)에서 계정을 만들고 로그인합니다.
2. 아래 배포로 Worker 주소를 확정합니다.
3. [GitHub OAuth App 등록](https://github.com/settings/applications/new)에서 다음을 입력합니다.
   - Application name: `study Description`
   - Homepage URL: `https://with-demo.github.io/study/index`
   - Authorization callback URL: `https://확정된-Worker-주소/api/github/callback`
4. Client ID와 Client secret을 아래 Worker secrets에 직접 입력합니다. 채팅/소스/커밋에 붙여 넣지 않습니다.
5. 저장소 소유 계정에서 [fine-grained token](https://github.com/settings/personal-access-tokens/new)을 생성합니다.
   - Resource owner: `with-demo`
   - Repository access: **Only select repositories → study만**
   - Repository permissions: **Metadata: Read-only**만 사용합니다. Contents 쓰기 등은 필요 없습니다.
   - 만료 기간을 지정하고, 만료 시 Worker secret만 교체합니다.
   - 이 토큰은 서버에서 공동작업자 쓰기 권한 확인에만 사용합니다.

OAuth 로그인은 추가 GitHub scope를 요청하지 않습니다. 사용자 계정 식별과 저장소 쓰기 권한 확인을 분리합니다.
공동작업자 초대를 수락하고 저장소 Write 이상 권한이 있는 계정만 설명을 저장할 수 있습니다.

## 배포

Node.js 24와 npm이 설치된 터미널에서 저장소의 `server/` 디렉터리를 사용합니다.

```sh
npm install
npx wrangler login
npx wrangler d1 create study-collaboration
```

생성 결과의 database_id를 `wrangler.jsonc`의 `REPLACE_WITH_CREATED_D1_DATABASE_ID`에 입력합니다.
같은 이름의 기존 DB가 있다면 재생성하지 말고 그 ID를 사용합니다.

```sh
npm run db:remote
npm run deploy
```

출력된 HTTPS Worker 주소를 위 OAuth App의 callback URL에 사용합니다.
Worker secrets는 아래 명령이 표시하는 입력란에 **직접** 입력합니다. 셸 인수로 전달하지 않습니다.

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put GITHUB_REPOSITORY_TOKEN
```

```sh
node scripts/connect.mjs https://확정된-Worker-주소
```

연결 스크립트는 DB 응답·인증 설정 유무·CORS를 확인하고 `common/config.js`를 갱신합니다.
이 검사만으로 OAuth App 설정이나 권한 토큰의 실제 유효성까지 확인되는 것은 아닙니다.
갱신 파일을 GitHub Pages 배포 브랜치에 반영한 뒤 아래 실사용 검증을 완료합니다.

## 실사용 검증

- `mjha/index.html#HOME-01` 등 실제 화면의 상단 로그인 버튼을 누릅니다.
- GitHub 인증을 완료하면 원래 프로젝트/화면으로 복귀하고 공동작업자로 표시되어야 합니다.
- 영역에 설명을 작성하고 새로고침 후 유지되는지 확인합니다.
- 다른 브라우저에서도 같은 화면의 설명이 보이는지 확인합니다.
- 같은 화면 ID여도 다른 팀원 폴더에서는 설명이 섞이지 않아야 합니다.
- 로그아웃하면 설명 수정 버튼이 사라져야 합니다.
- 초대 미수락/쓰기 권한 없음 계정은 저장할 수 없어야 합니다.

설명은 기존 정적 목업과 마찬가지로 로그인 없이 조회할 수 있습니다. 개인정보나 비밀키를 입력하지 않습니다.
현재 프런트엔드에 댓글 작성 입력란은 없습니다. 기존 댓글 조회/처리 상태 API만 호환합니다.

## 개발/검증

```sh
npm test
npm run db:local
npm run dev
npx wrangler deploy --dry-run
```

로컬 비밀값은 `.dev.vars`에만 두며 이 파일은 Git에서 제외됩니다.
운영 OAuth의 HTTPS/쿠키 정책 때문에 실제 로그인은 배포된 HTTPS 주소에서 검증합니다.
자동 테스트는 인메모리 SQLite와 모의 GitHub 응답을 사용하며 실제 GitHub 인증/운영 D1 연동을 대신하지 않습니다.

## 인증과 저장 정책

- OAuth state + HttpOnly/Secure/SameSite 쿠키로 로그인 요청을 연결합니다.
- GitHub PKCE와 프런트 교환용 PKCE를 각각 검증합니다.
- 프런트 교환 코드는 2분·1회, OAuth 요청은 10분, 로그인 세션은 8시간입니다.
- GitHub 사용자 액세스 토큰은 계정 식별 후 DB나 브라우저에 저장하지 않습니다.
- 브라우저에는 현재 탭의 자체 세션 토큰만 보관하고, DB에는 그 해시만 저장합니다.
- 모든 저장 요청에서 GitHub 저장소 쓰기 권한을 재확인합니다.
- revision이 맞지 않는 수정/삭제/핀 이동은 409로 거부합니다.
- 모든 SQL 입력값은 바인딩하며, 저장은 프로젝트와 화면 ID로 분리합니다.
- cron으로 만료된 인증 요청/코드/세션을 매시간 정리합니다.

GitHub 로그인 안내: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
GitHub 권한 확인 API: https://docs.github.com/en/rest/collaborators/collaborators#get-repository-permissions-for-a-user
Cloudflare D1: https://developers.cloudflare.com/d1/wrangler-commands/
