const PROJECTS = new Set(['mjha', 'shyu', 'yjgeum', 'jshwan', 'hekim']);
const REPOSITORY = 'with-demo/study';
const enc = new TextEncoder();
const now = () => Math.floor(Date.now() / 1000);
const random = () => crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
const base64url = bytes => btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
export const hash = async text => base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(text))));
class Fault extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = (status, message) => { throw new Fault(status, message); };
const json = (data, status = 200) => Response.json(data, {status, headers: {'Cache-Control': 'no-store'}});
const redirect = url => new Response(null, {status: 302, headers: {Location: String(url), 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer'}});
const configured = env => !!(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET && env.GITHUB_REPOSITORY_TOKEN);
function project(value) { if (!PROJECTS.has(value)) fail(400, '등록되지 않은 프로젝트입니다.'); return value; }
function screen(value) { if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(value)) fail(400, '화면 ID를 확인해 주세요.'); return value; }
function text(value, max = 5000) { if (typeof value !== 'string' || !value.trim() || value.length > max) fail(400, '입력 내용의 길이를 확인해 주세요.'); return value.trim(); }
export function anchor(value) {
  if (!value || typeof value.selector !== 'string' || !value.selector || value.selector.length > 1000 || !Number.isFinite(value.x) || !Number.isFinite(value.y) || value.x < 0 || value.x > 1 || value.y < 0 || value.y > 1) fail(400, '설명 위치를 확인해 주세요.');
  return {selector: value.selector, sample: String(value.sample || '').slice(0, 100), x: value.x, y: value.y};
}
function revision(value) { if (!Number.isSafeInteger(value) || value < 1) fail(400, '수정 버전을 확인해 주세요.'); return value; }
function base(env) {
  const url = new URL(env.FRONTEND_BASE);
  if (url.protocol !== 'https:' || url.origin !== 'https://with-demo.github.io' || url.pathname !== '/study/') fail(503, '사이트 복귀 주소 설정을 확인해 주세요.');
  return url;
}
function returnURL(env, p, s, params) {
  const url = new URL(p + '/index.html', base(env));
  url.hash = s; for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url;
}
async function gh(path, token) {
  const response = await fetch('https://api.github.com' + path, {headers: {Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'User-Agent': 'study-collaboration', 'X-GitHub-Api-Version': '2022-11-28'}, signal: AbortSignal.timeout(10000)});
  if (!response.ok) fail(503, 'GitHub 계정 또는 저장소 권한 설정을 확인해 주세요.');
  return response.json();
}
async function editor(env, user) {
  // Identity comes from OAuth, access comes only from this repository's metadata.
  const result = await gh('/repos/' + REPOSITORY + '/collaborators/' + encodeURIComponent(user.login) + '/permission', env.GITHUB_REPOSITORY_TOKEN);
  return result.user?.id === user.id && ['write', 'admin', 'maintain'].includes(result.permission);
}
async function session(request, env, p) {
  const bearer = request.headers.get('Authorization') || '';
  if (!bearer) return null;
  if (!/^Bearer [a-f0-9]{64}$/.test(bearer)) fail(401, '다시 로그인해 주세요.');
  const row = await env.DB.prepare('SELECT user_json FROM sessions WHERE token_hash=? AND project=? AND expires>?').bind(await hash(bearer.slice(7)), p, now()).first();
  if (!row) fail(401, '로그인이 만료되었습니다. 다시 로그인해 주세요.');
  return JSON.parse(row.user_json);
}
function record(row, comments = []) {
  return {id: row.id, screen: row.screen, number: row.number, text: row.text, anchor: JSON.parse(row.anchor), author: row.author, created: row.created, updated: row.updated, updatedBy: row.updated_by, revision: row.revision, comments: comments.map(c => ({id:c.id, text:c.text, author:c.author, created:c.created, status:c.status, updated:c.updated, updatedBy:c.updated_by, revision:c.revision}))};
}
async function start(request, env) {
  if (!configured(env)) fail(503, 'GitHub 로그인 서버 설정이 필요합니다.');
  const url = new URL(request.url), p = project(url.searchParams.get('project')), s = screen(url.searchParams.get('screen'));
  const challenge = url.searchParams.get('challenge');
  if (!/^[A-Za-z0-9_-]{43}$/.test(challenge || '')) fail(400, '로그인 요청을 다시 시작해 주세요.');
  const state = random(), verifier = random();
  await env.DB.prepare('INSERT INTO oauth_requests VALUES(?,?,?,?,?,?)').bind(await hash(state), p, s, challenge, verifier, now() + 600).run();
  const dest = new URL('https://github.com/login/oauth/authorize');
  dest.search = new URLSearchParams({client_id: env.GITHUB_CLIENT_ID, redirect_uri: new URL('/api/github/callback', url).href, state, scope: '', code_challenge: await hash(verifier), code_challenge_method: 'S256', allow_signup: 'false'}).toString();
  const response = redirect(dest);
  response.headers.set('Set-Cookie', '__Host-study-oauth=' + state + '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600');
  return response;
}
async function callback(request, env) {
  const url = new URL(request.url), state = url.searchParams.get('state');
  const cookie = /(?:^|;\s*)__Host-study-oauth=([a-f0-9]{64})(?:;|$)/.exec(request.headers.get('Cookie') || '')?.[1];
  if (!state || state !== cookie) fail(400, '로그인을 시작한 브라우저에서 다시 시도해 주세요.');
  const row = await env.DB.prepare('DELETE FROM oauth_requests WHERE state_hash=? AND expires>? RETURNING *').bind(await hash(state), now()).first();
  if (!row) fail(400, '로그인 요청이 만료되었습니다.');
  let response;
  try {
    if (url.searchParams.has('error')) throw new Fault(403, 'github_cancelled');
    const code = url.searchParams.get('code'); if (!code) throw new Fault(400, 'github_request');
    const result = await fetch('https://github.com/login/oauth/access_token', {method: 'POST', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, code_verifier: row.verifier, redirect_uri: new URL('/api/github/callback', url).href}), signal: AbortSignal.timeout(10000)});
    const oauth = await result.json(); if (!result.ok || !oauth.access_token) throw new Fault(401, 'github_login');
    const identity = await gh('/user', oauth.access_token);
    const user = {id: identity.id, login: identity.login, name: identity.name || identity.login, editor: true};
    if (!await editor(env, user)) throw new Fault(403, 'github_not_collaborator');
    const ticket = random();
    await env.DB.prepare('INSERT INTO login_codes VALUES(?,?,?,?,?)').bind(await hash(ticket), row.project, row.challenge, JSON.stringify(user), now() + 120).run();
    response = redirect(returnURL(env, row.project, row.screen, {annotation_code: ticket}));
  } catch (error) {
    const reason = ['github_cancelled','github_request','github_not_collaborator','github_login'].includes(error.message) ? error.message : 'github_permissions';
    response = redirect(returnURL(env, row.project, row.screen, {annotation_error: reason}));
  }
  response.headers.set('Set-Cookie', '__Host-study-oauth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  return response;
}
async function exchange(env, body, p) {
  if (!/^[a-f0-9]{64}$/.test(body.code || '') || !/^[a-f0-9]{64}$/.test(body.verifier || '')) fail(400, '로그인 요청을 다시 시작해 주세요.');
  const row = await env.DB.prepare('DELETE FROM login_codes WHERE code_hash=? AND project=? AND challenge=? AND expires>? RETURNING *').bind(await hash(body.code), p, await hash(body.verifier), now()).first();
  if (!row) fail(401, '로그인 요청이 만료되었거나 이미 사용되었습니다.');
  const token = random();
  await env.DB.prepare('INSERT INTO sessions VALUES(?,?,?,?)').bind(await hash(token), p, row.user_json, now() + 28800).run();
  return json({token, user: JSON.parse(row.user_json)});
}
async function mutate(env, p, user, body) {
  if (!user) fail(401, '공동작업자 로그인이 필요합니다.');
  if (!await editor(env, user)) fail(403, '저장소 쓰기 권한이 없습니다. 공동작업자 초대 수락과 권한을 확인해 주세요.');
  const timestamp = new Date().toISOString();
  if (body.op === 'create') {
    const s = screen(body.screen), value = text(body.text), a = anchor(body.anchor), id = crypto.randomUUID();
    await env.DB.batch([
      env.DB.prepare('INSERT INTO counters VALUES(?,?,1) ON CONFLICT(project,screen) DO UPDATE SET number=number+1').bind(p, s),
      env.DB.prepare('INSERT INTO records(id,project,screen,number,text,anchor,author,created) SELECT ?,?,?,number,?,?,?,? FROM counters WHERE project=? AND screen=?').bind(id, p, s, value, JSON.stringify(a), user.name, timestamp, p, s)
    ]);
    return json({id});
  }
  const id = text(body.id, 100), rev = revision(body.revision);
  let result;
  if (body.op === 'status') {
    if (!['미처리', '처리중', '처리완료'].includes(body.status)) fail(400, '처리 상태를 확인해 주세요.');
    result = await env.DB.prepare('UPDATE comments SET status=?,updated=?,updated_by=?,revision=revision+1 WHERE id=? AND revision=? AND record_id IN (SELECT id FROM records WHERE project=?)').bind(body.status, timestamp, user.name, id, rev, p).run();
  } else if (body.op === 'delete') {
    result = await env.DB.prepare('DELETE FROM records WHERE id=? AND project=? AND revision=?').bind(id, p, rev).run();
  } else if (body.op === 'update') {
    result = await env.DB.prepare('UPDATE records SET text=?,updated=?,updated_by=?,revision=revision+1 WHERE id=? AND project=? AND revision=?').bind(text(body.text), timestamp, user.name, id, p, rev).run();
  } else if (body.op === 'move') {
    if (![body.offsetX, body.offsetY].every(v => Number.isFinite(v) && Math.abs(v) <= 4096)) fail(400, '핀 위치를 확인해 주세요.');
    result = await env.DB.prepare("UPDATE records SET anchor=json_set(anchor,'$.offsetX',?,'$.offsetY',?),updated=?,updated_by=?,revision=revision+1 WHERE id=? AND project=? AND revision=?").bind(body.offsetX, body.offsetY, timestamp, user.name, id, p, rev).run();
  } else fail(400, '지원하지 않는 요청입니다.');
  if (!result.meta.changes) fail(409, '다른 사용자가 변경했거나 삭제한 항목입니다. 새로 불러와 주세요.');
  return json({id});
}
async function collab(request, env) {
  const url = new URL(request.url); let body;
  if (request.method === 'POST') {
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) fail(415, 'JSON 요청이 필요합니다.');
    if (Number(request.headers.get('Content-Length')) > 32768) fail(413, '요청이 너무 큽니다.');
    const raw = await request.text(); if (raw.length > 32768) fail(413, '요청이 너무 큽니다.');
    try { body = JSON.parse(raw); } catch { fail(400, '요청 형식을 확인해 주세요.'); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, '요청 형식을 확인해 주세요.');
  } else if (request.method !== 'GET') fail(405, '지원하지 않는 요청 방식입니다.');
  const p = project(body ? body.project : url.searchParams.get('project'));
  const op = body ? body.op : url.searchParams.get('op');
  if (!body && op === 'config') return json({githubConfigured: configured(env)});
  if (body && op === 'exchange') return exchange(env, body, p);
  const user = await session(request, env, p);
  if (body && op === 'logout') {
    const bearer = request.headers.get('Authorization');
    if (bearer) await env.DB.prepare('DELETE FROM sessions WHERE token_hash=? AND project=?').bind(await hash(bearer.slice(7)), p).run();
    return json({ok: true});
  }
  if (body) return mutate(env, p, user, body);
  if (op === 'planning-notes') {
    const rows = await env.DB.prepare('SELECT * FROM records WHERE project=? ORDER BY screen,number').bind(p).all();
    const records = rows.results.flatMap(r => {try { const spec = JSON.parse(r.text); return spec.format === 'description-spec-v1' && spec.planningNote ? [{id:r.id, screen:r.screen, number:r.number, item:spec.item || '', planningNote:spec.planningNote}] : []; } catch { return []; }});
    return json({records});
  }
  if (op !== 'list') fail(400, '지원하지 않는 요청입니다.');
  const s = screen(url.searchParams.get('screen'));
  const [rows, comments] = await env.DB.batch([
    env.DB.prepare('SELECT * FROM records WHERE project=? AND screen=? ORDER BY number').bind(p, s),
    env.DB.prepare('SELECT * FROM comments WHERE record_id IN (SELECT id FROM records WHERE project=? AND screen=?) ORDER BY created,id').bind(p, s)
  ]);
  return json({user, githubConfigured: configured(env), records: rows.results.map(r => record(r, comments.results.filter(c => c.record_id === r.id)))});
}
export async function handle(request, env) {
  const url = new URL(request.url), allowed = base(env).origin, origin = request.headers.get('Origin');
  if (origin && origin !== allowed) return json({error: '허용되지 않은 사이트입니다.'}, 403);
  let response;
  try {
    if (request.method === 'OPTIONS') response = new Response(null, {status: 204});
    else if (url.pathname === '/api/github/start' && request.method === 'GET') response = await start(request, env);
    else if (url.pathname === '/api/github/callback' && request.method === 'GET') response = await callback(request, env);
    else if (url.pathname === '/api/collab') response = await collab(request, env);
    else if (url.pathname === '/health' && request.method === 'GET') { await env.DB.prepare('SELECT 1 FROM sessions LIMIT 1').first(); response = json({ok: true, githubConfigured: configured(env)}); }
    else response = json({error: '경로를 찾지 못했습니다.'}, 404);
  } catch (error) { response = json({error: error instanceof Fault ? error.message : '서버 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'}, error.status || 500); }
  response.headers.set('Vary', 'Origin');
  if (origin === allowed) {
    response.headers.set('Access-Control-Allow-Origin', allowed);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
export default {
  fetch: handle,
  async scheduled(event, env) {
    await env.DB.batch(['oauth_requests','login_codes','sessions'].map(table => env.DB.prepare('DELETE FROM ' + table + ' WHERE expires<=?').bind(now())));
  }
};
