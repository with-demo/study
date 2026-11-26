# GitHub에서 사이트 코드 관리하기

기존 프로젝트는 이미 `https://github.com/with-demo/study/tree/main/jshwan`에 있습니다. 기존 파일을 옮기거나 덮어쓰지 않고 아래 구조로 새 사이트를 추가합니다.

```text
study/
└─ jshwan/
   ├─ index.html          기존 프로젝트
   ├─ app.js             기존 프로젝트
   ├─ assets/            기존 프로젝트
   └─ task-workspace/    새 Task 사이트
      ├─ app/
      ├─ db/
      ├─ drizzle/
      ├─ scripts/
      ├─ .openai/
      ├─ .gitignore
      ├─ package.json
      └─ package-lock.json
```

## GitHub Desktop으로 올리기

1. GitHub Desktop에 본인 GitHub 계정으로 로그인합니다.
2. **File → Clone repository → URL**에서 `https://github.com/with-demo/study.git`을 입력하고 복제합니다. 이미 이 저장소를 복제했다면 해당 저장소를 열고 **Fetch origin → Pull origin**으로 최신 내용을 받습니다.
3. **Current branch → New branch**로 `jshwan/task-workspace` 브랜치를 만듭니다.
4. 함께 제공한 `task-workspace-github.zip`을 압축 해제합니다. 그 안의 **task-workspace 폴더 전체**를 복제한 저장소의 **jshwan 폴더 안**으로 복사합니다. 기존 파일은 건드리지 않습니다. 숨김 파일 `.gitignore`, `.openai/hosting.json`도 포함합니다.
5. Desktop의 **Changes**에서 변경 파일이 모두 `jshwan/task-workspace/` 아래인지 확인합니다. `node_modules`, `dist`, `.git`, `.wrangler`, `.sites-runtime`, `.env`는 올리지 않습니다. 제공된 ZIP에서는 제외했습니다.
6. Summary에 `Add personal task workspace`를 입력하고 **Commit to jshwan/task-workspace**를 누릅니다.
7. **Publish branch** 또는 **Push origin**을 누른 뒤 **Create Pull Request**로 변경 내용을 제출합니다. 공유 저장소의 병합 절차를 따릅니다. 쓰기 권한이 없으면 Desktop에서 포크를 만들어 PR을 보낼 수 있습니다.
8. 병합 후 `https://github.com/with-demo/study/tree/main/jshwan/task-workspace`에서 조회합니다. 병합 전에는 GitHub의 브랜치 선택에서 `jshwan/task-workspace`를 선택하면 됩니다.

이 안내는 업로드 방법입니다. 이번 작업에서 해당 GitHub 저장소에 직접 push하거나 기존 파일을 수정하지 않았습니다.

## 이후 수정하기

복제한 저장소의 `jshwan/task-workspace` 폴더를 개발 작업 폴더로 사용합니다. 변경 후 **Changes 확인 → Commit → Push** 순서로 GitHub에 반영합니다. GitHub 업로드는 실행 중인 사이트 배포와 별개입니다. 현재 사이트는 Sites 인증과 Cloudflare D1을 사용하므로, 사이트 소스 변경 후 Sites 배포 과정도 필요합니다.

GitHub Pages는 정적 파일 호스팅입니다. 이 프로젝트의 서버 API, 계정별 저장소, 로그인 처리는 GitHub Pages만으로 실행되지 않습니다. GitHub에는 소스를 보관하고 README의 실제 서비스 주소에서 사이트를 사용하세요. 다른 호스팅으로 옮기려면 인증과 D1 설정도 함께 구성해야 합니다.

## 공식 안내

- [GitHub Desktop 저장소 복제](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
- [GitHub에 파일 추가](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Pages의 지원 범위](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
