# GitHub 관리

현재 서비스는 [GitHub Pages 데모](https://with-demo.github.io/study/jshwan/task-workspace/)입니다. 기존 여행 사이트 파일과 다른 팀원 폴더는 유지합니다.

코드 수정 후 `npm run test:demo`, `npm run build:demo`를 실행하고 소스와 `demo-assets/`를 함께 커밋합니다. PR 검토·병합 후 기존 Pages 배포가 끝나면 웹 화면에 반영됩니다.

폴더 내부 경로를 유지하세요. 특히 `demo-assets`는 이 데모가 바로 실행하는 정적 파일이므로 업로드 대상입니다. 반면 `node_modules`, `.next`, `dist`, `.wrangler`, `.sites-runtime`, `outputs`, `*.tsbuildinfo`, 비밀 환경 파일은 업로드하지 않습니다.
