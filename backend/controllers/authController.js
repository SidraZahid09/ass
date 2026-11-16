const db=require("../config/db"),bcrypt=require("bcryptjs"),jwt=require("jsonwebtoken");
async function login(req,res,next){
 try{
  const username=String(req.body.username||"").trim(),password=String(req.body.password||"");
  if(!username||!password)return res.status(400).json({message:"Enter your username and password."});
  const [rows]=await db.execute("SELECT id,username,password_hash FROM admins WHERE username=? LIMIT 1",[username]);
  if(!rows.length||!(await bcrypt.compare(password,rows[0].password_hash)))return res.status(401).json({message:"Invalid username or password."});
  if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32)return res.status(500).json({message:"Set a JWT_SECRET of at least 32 characters in the backend environment."});
  const token=jwt.sign({id:rows[0].id,username:rows[0].username},process.env.JWT_SECRET,{expiresIn:"8h",issuer:"assetelevatte"});
  res.json({token,admin:{id:rows[0].id,username:rows[0].username}});
 }catch(e){next(e);}
}
module.exports={login};
