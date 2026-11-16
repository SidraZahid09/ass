const jwt = require("jsonwebtoken");
module.exports = function requireAdmin(req,res,next) {
 const h=req.headers.authorization||"", token=h.startsWith("Bearer ")?h.slice(7):"";
 if(!token)return res.status(401).json({message:"Please sign in to continue."});
 try{const p=jwt.verify(token,process.env.JWT_SECRET);req.admin={id:p.id,username:p.username};next();}
 catch{return res.status(401).json({message:"Your session has expired. Please sign in again."});}
};
