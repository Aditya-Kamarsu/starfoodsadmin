const jwt = require("jsonwebtoken");
const JWT_SECRET = "this is my app";
const fetchadmin = (req,res,next)=>{
    //geth the user from the jwt token add add id to req 
    const token = req.header('auth-token');
    if(!token){
        res.send(401).send({error:"Please authenticate using valid token"});
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.send(401).send({error:"Please authenticate using valid token"});
    }
    
}

module.exports = fetchadmin;