const db=require("../config/db");
function validate(b){
 const p={};for(const k of ["title","slug","excerpt","content","cover_image","status"])p[k]=String(b[k]??"").trim();
 if(!p.title||!p.slug||!p.content)return{error:"Title, URL slug and article content are required."};
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))return{error:"Slug must use lowercase letters, numbers and hyphens only."};
 if(!["draft","published"].includes(p.status))return{error:"Choose draft or published status."};
 if(p.title.length>220||p.slug.length>240||p.cover_image.length>500)return{error:"A field exceeds its maximum length."};
 return{p};
}
async function list(_req,res,next){try{const[posts]=await db.execute("SELECT id,title,slug,excerpt,content,cover_image,status,published_at,created_at,updated_at FROM posts ORDER BY updated_at DESC,id DESC");res.json({posts});}catch(e){next(e);}}
async function create(req,res,next){try{const v=validate(req.body);if(v.error)return res.status(400).json({message:v.error});const p=v.p,date=p.status==="published"?new Date():null;const[r]=await db.execute("INSERT INTO posts(title,slug,excerpt,content,cover_image,status,published_at) VALUES(?,?,?,?,?,?,?)",[p.title,p.slug,p.excerpt,p.content,p.cover_image||null,p.status,date]);res.status(201).json({message:"Article created.",id:r.insertId});}catch(e){if(e.code==="ER_DUP_ENTRY")return res.status(409).json({message:"That URL slug is already in use."});next(e);}}
async function update(req,res,next){try{const v=validate(req.body);if(v.error)return res.status(400).json({message:v.error});const[old]=await db.execute("SELECT status,published_at FROM posts WHERE id=?",[req.params.id]);if(!old.length)return res.status(404).json({message:"Article not found."});const p=v.p;let date=old[0].published_at;if(p.status==="published"&&!date)date=new Date();if(p.status==="draft")date=null;await db.execute("UPDATE posts SET title=?,slug=?,excerpt=?,content=?,cover_image=?,status=?,published_at=? WHERE id=?",[p.title,p.slug,p.excerpt,p.content,p.cover_image||null,p.status,date,req.params.id]);res.json({message:"Article updated."});}catch(e){if(e.code==="ER_DUP_ENTRY")return res.status(409).json({message:"That URL slug is already in use."});next(e);}}
async function remove(req,res,next){try{const[r]=await db.execute("DELETE FROM posts WHERE id=?",[req.params.id]);if(!r.affectedRows)return res.status(404).json({message:"Article not found."});res.json({message:"Article deleted."});}catch(e){next(e);}}
module.exports={list,create,update,remove};
