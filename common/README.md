# 스터디 공통 목업 도구

제공된 공통 목업의 CSS·Description 편집기·번호 핀·알럿/컨펌 UI를 기본으로 사용합니다.
초기 프로젝트는 `hamin`이며 저장소는 `with-demo/study`입니다.

## 현재 상태
- root `index.html`에서 `hamin/index.html`로 이동합니다.
- `hamin`은 빈 시작 화면과 화면검색으로 구성되어 있습니다.
- 공통 UI는 연결되어 있으며 Description은 기본 닫힘입니다.
- 저장·GitHub 인증 서버는 미설정입니다. 외부 서버 요청을 보내지 않습니다.
- 로그인·작성·댓글 공동 저장은 전용 서버를 연결해야 사용할 수 있습니다.
- 이전 세팅의 브라우저 저장 방식이나 JSON 백업 기능은 추가하지 않았습니다.

## 팀원 추가
자신의 폴더를 만들고 루트 `index.html`에 링크를 추가합니다.
`body data-project`를 고유 ID로 지정하고 화면에는 고유 ID를 등록합니다.
`hamin/index.html`과 `hamin/include/app.js`의 빈 구조를 참고하세요.
공통 도구는 `../common/`에서 불러오며 자기 폴더에 복제하지 않습니다.

## 전용 서버 연결 시
`common/config.js`의 server를 전용 HTTPS 주소로 설정합니다.
서버에 프로젝트 ID·화면 ID·study 저장소 권한 확인·허용된 복귀 URL을 등록합니다.
설명은 프로젝트+화면 ID로 구분하고 서버에서 GitHub 공동작업자 권한과 revision을 검증해야 합니다.
다른 프로젝트의 서버 설정이나 기존 자료를 변경하지 않습니다.
