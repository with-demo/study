import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {handle, hash} from '../src/worker.mjs';

class D1 {
  constructor() { this.sqlite = new DatabaseSync(':memory:'); this.sqlite.exec(readFileSync(new URL('../migrations/0001_initial.sql', import.meta.url), 'utf8')); }
  prepare(sql) {
    const db = this.sqlite;
    return {args: [], bind(...args) { this.args = args; return this; }, async first() { return db.prepare(sql).get(...this.args) || null; }, async all() { return {results: db.prepare(sql).all(...this.args)}; }, async run() { return {meta: {changes: Number(db.prepare(sql).run(...this.args).changes)}}; }, sql};
  }
  async batch(statements) {
    this.sqlite.exec('BEGIN');
    try {
      const results = [];
      for (const s of statements) results.push(/^SELECT/i.test(s.sql) ? await s.all() : await s.run());
      this.sqlite.exec('COMMIT'); return results;
    } catch(e) { this.sqlite.exec('ROLLBACK'); throw e; }
  }
}
const origin = 'https://with-demo.github.io';
const token = 'a'.repeat(64);
async function fixture() {
  const env = {DB: new D1(), FRONTEND_BASE: origin + '/study/', GITHUB_CLIENT_ID: 'test-client', GITHUB_CLIENT_SECRET: 'test-only', GITHUB_REPOSITORY_TOKEN: 'test-only'};
  const user = {id: 7, login: 'member', name: '테스터', editor: true};
  await env.DB.prepare('INSERT INTO sessions VALUES(?,?,?,?)').bind(await hash(token), 'mjha', JSON.stringify(user), Math.floor(Date.now()/1000)+1000).run();
  return env;
}
async function call(env, op, body, bearer = token, p = 'mjha', requestOrigin = origin) {
  const headers = {Origin: requestOrigin}; if (bearer) headers.Authorization = 'Bearer ' + bearer;
  const init = {headers};
  if (body) { init.method = 'POST'; headers['Content-Type'] = 'application/json'; init.body = JSON.stringify({op, project:p, ...body}); }
  const response = await handle(new Request('https://api.example/api/collab?' + new URLSearchParams({op,project:p,screen:'START-01'}), init), env);
  return {status: response.status, data: await response.json(), headers: response.headers};
}
const payload = {screen:'START-01', text:JSON.stringify({format:'description-spec-v1',item:'제목',planningNote:'검토 필요'}), anchor:{selector:'#content',sample:'제목',x:0.5,y:0.2}};

test('인증, 프로젝트 분리, 실제 저장과 충돌/삭제/권한회수', async t => {
  const env = await fixture(), original = globalThis.fetch;
  let permission = 'write';
  globalThis.fetch = async url => {
    assert.equal(String(url), 'https://api.github.com/repos/with-demo/study/collaborators/member/permission');
    return Response.json({permission, user:{id:7}});
  };
  t.after(() => { globalThis.fetch = original; });
  assert.equal((await call(env,'create',payload,'')).status,401);
  assert.equal((await call(env,'create',payload,token,'shyu')).status,401);
  assert.equal((await call(env,'create',payload,token,'mjha','https://evil.example')).status,403);
  const created = await call(env,'create',payload); assert.equal(created.status,200);
  let list = await call(env,'list'); assert.equal(list.data.records[0].number,1);
  assert.equal(list.headers.get('Access-Control-Allow-Origin'),origin);
  assert.equal((await call(env,'list',null,'','shyu')).data.records.length,0);
  const id = created.data.id;
  assert.equal((await call(env,'update',{id,text:'수정',revision:1})).status,200);
  assert.equal((await call(env,'update',{id,text:'덮어쓰기',revision:1})).status,409);
  assert.equal((await call(env,'move',{id,revision:2,offsetX:12,offsetY:-3})).status,200);
  list = await call(env,'list'); assert.equal(list.data.records[0].anchor.offsetY,-3);
  assert.equal((await call(env,'move',{id,revision:3,offsetX:9000,offsetY:0})).status,400);
  permission = 'read'; assert.equal((await call(env,'delete',{id,revision:3})).status,403);
  permission = 'write'; assert.equal((await call(env,'delete',{id,revision:3})).status,200);
  assert.equal((await call(env,'list')).data.records.length,0);
  const next = await call(env,'create',payload); assert.equal(next.status,200);
  assert.equal((await call(env,'list')).data.records[0].number,2);
  const notes = await call(env,'planning-notes'); assert.equal(notes.data.records[0].planningNote,'검토 필요');
  assert.equal((await call(env,'logout',{})).status,200);
  assert.equal((await call(env,'list')).status,401);
});

test('GitHub OAuth state/cookie, PKCE 및 일회용 교환 코드', async t => {
  const env = await fixture(), original = globalThis.fetch;
  const verifier = 'b'.repeat(64), challenge = await hash(verifier);
  globalThis.fetch = async (url, init) => {
    if (String(url) === 'https://github.com/login/oauth/access_token') {
      const args = JSON.parse(init.body); assert.ok(args.code_verifier); assert.equal(args.code,'github-code');
      return Response.json({access_token:'ephemeral-test-token'});
    }
    if (String(url) === 'https://api.github.com/user') return Response.json({id:7,login:'member',name:'테스터'});
    return Response.json({permission:'write',user:{id:7}});
  };
  t.after(() => { globalThis.fetch = original; });
  const start = await handle(new Request('https://api.example/api/github/start?' + new URLSearchParams({project:'mjha',screen:'START-01',challenge})),env);
  assert.equal(start.status,302);
  const target = new URL(start.headers.get('Location')), state = target.searchParams.get('state');
  assert.equal(target.origin,'https://github.com'); assert.equal(target.searchParams.get('scope'),'');
  assert.equal(target.searchParams.get('code_challenge_method'),'S256');
  const callbackURL = 'https://api.example/api/github/callback?' + new URLSearchParams({state,code:'github-code'});
  assert.equal((await handle(new Request(callbackURL),env)).status,400);
  const result = await handle(new Request(callbackURL,{headers:{Cookie:'__Host-study-oauth='+state}}),env);
  assert.equal(result.status,302);
  const returned = new URL(result.headers.get('Location')); assert.equal(returned.origin,origin); assert.equal(returned.pathname,'/study/mjha/index.html'); assert.equal(returned.hash,'#START-01');
  const code = returned.searchParams.get('annotation_code'); assert.ok(code);
  assert.equal((await call(env,'exchange',{code,verifier:'c'.repeat(64)},'')).status,401);
  const exchanged = await call(env,'exchange',{code,verifier},''); assert.equal(exchanged.status,200); assert.ok(exchanged.data.user.editor);
  assert.equal((await call(env,'exchange',{code,verifier},'')).status,401);
  assert.equal((await handle(new Request(callbackURL,{headers:{Cookie:'__Host-study-oauth='+state}}),env)).status,400);
});

test('잘못된 위치/요청과 만료 세션을 거부하고 미설정 상태를 전달', async () => {
  const env = await fixture(); env.GITHUB_CLIENT_SECRET='';
  assert.equal((await call(env,'config',null,'')).data.githubConfigured,false);
  const response = await handle(new Request('https://api.example/api/collab',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{'}),env);
  assert.equal(response.status,400);
  await env.DB.prepare('UPDATE sessions SET expires=0').run();
  assert.equal((await call(env,'list')).status,401);
});
