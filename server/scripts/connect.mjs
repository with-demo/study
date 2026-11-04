// 실제 배포/인증 설정이 확인된 서버만 프런트에 연결합니다.
import {writeFile} from 'node:fs/promises';
const input = process.argv[2];
if (!input) throw Error('사용법: node scripts/connect.mjs https://서버주소.workers.dev');
const server = new URL(input);
if (server.protocol !== 'https:' || server.username || server.password || server.search || server.hash || server.pathname !== '/') throw Error('HTTPS 서버 origin만 입력하세요.');
const response = await fetch(new URL('/health', server), {signal:AbortSignal.timeout(15000)});
const status = await response.json();
if (!response.ok || !status.ok || !status.githubConfigured) throw Error('DB와 GitHub 인증 설정을 완료한 뒤 다시 연결하세요.');
const probe = await fetch(new URL('/api/collab?op=config&project=mjha', server), {headers:{Origin:'https://with-demo.github.io'},signal:AbortSignal.timeout(15000)});
const config = await probe.json();
if (!probe.ok || !config.githubConfigured || probe.headers.get('Access-Control-Allow-Origin') !== 'https://with-demo.github.io') throw Error('사이트에서 서버에 접근할 수 없습니다. CORS 설정을 확인하세요.');
await writeFile(new URL('../../common/config.js', import.meta.url), '// study 전용 공동작업 서버\nwindow.MOCKUP_SHARED_CONFIG=Object.freeze('+JSON.stringify({server:server.origin,defaultProject:'mjha',repository:'with-demo/study'})+');\n');
console.log('common/config.js 연결 완료. GitHub Pages에 반영 후 실제 로그인과 저장을 확인하세요.');
