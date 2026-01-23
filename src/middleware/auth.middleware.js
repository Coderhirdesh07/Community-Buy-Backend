const jwt = require("jsonwebtoken");

async function verifyJwt(request,response,next){
    try{
        const {token} = request.cookies.token || request.headers.authorization.split(' ')[1];
        if(!token) return response.status(400).json({message:'Token is required'});
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        response.user = decoded;
        next();
    }
    catch(error){
        console.log("error occured in middleware");
        return response.status(400).json({ message: "Invalid or expired token" });
    }

}
module.exports =  verifyJwt;