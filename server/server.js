import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { WebSocketServer } from "ws";
const PORT=process.env.PORT||8787;
const publicDir=path.resolve("./public");
const clients=new Map();
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".json":"application/json"};
const server=http.createServer((req,res)=>{
  let p=req.url.split("?")[0]; if(p==="/")p="/index.html";
  const file=path.join(publicDir,p);
  if(!file.startsWith(publicDir)){res.writeHead(403);return res.end("Forbidden")}
  fs.readFile(file,(e,d)=>{if(e){res.writeHead(404);return res.end("Not found")}res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});res.end(d)});
});
const wss=new WebSocketServer({server});
function presence(){const online=[...clients.keys()];for(const set of clients.values())for(const ws of set)if(ws.readyState===1)ws.send(JSON.stringify({type:"presence",online}))}
wss.on("connection",ws=>{
 let id=null;
 ws.on("message",raw=>{let m;try{m=JSON.parse(raw)}catch{return}
  if(m.type==="register"){id=String(m.userId||"").slice(0,64);if(!id)return;(clients.get(id)||clients.set(id,new Set()).get(id)).add(ws);presence();return}
  if(!id)return;
  if(["message","typing","signal"].includes(m.type)&&m.to){const set=clients.get(String(m.to));if(set)for(const peer of set)if(peer.readyState===1)peer.send(JSON.stringify(m))}
 });
 ws.on("close",()=>{if(id){const set=clients.get(id);if(set){set.delete(ws);if(!set.size)clients.delete(id)}presence()}});
});
server.listen(PORT,()=>console.log(`Privora relay/web server on http://localhost:${PORT}`));