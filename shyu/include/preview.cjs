const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {execFile}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),port=8907,url=`http://localhost:${port}/shyu/index.html#SH-SPACE-02`;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
 if(pathname.split('/').some(segment=>segment.startsWith('.'))){res.writeHead(403);return res.end();}
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);});
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Preview already running: ${url}`:error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{console.log(url);console.log('Keep this window open. Press Ctrl+C to stop.');if(process.platform==='win32'&&!process.argv.includes('--no-open'))execFile('explorer.exe',[url],()=>{});});
