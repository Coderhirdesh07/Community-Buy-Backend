const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const logEvent = require("../utils/Anaylitcs.logger.utils.js");

async function handleUserRegistration(request,response){
    try{
        const {fullname,email,password} = request.body;
    if(!fullname|| !email || !password){
        return response.status(400).json({message:"Full name or email or password is missing"});
    }
    const isEmailExist = await User.findOne({email:email}); 
    if(isEmailExist) return response.status(400).json({message:'User with email already exist'});

    const encryptedPassword = await bcrypt.hash(this.password,10);
    const newUser = await User.create({fullname,email,password:encryptedPassword});

    // analytics
    logEvent({
        event:"USER_REGISTERED",
        userId:newUser._id,
        email:newUser.email,
        request:request
    });

      return response.status(200).json({message:"User Created successfully",data:newUser});
    }
    catch(error){
        console.log('error occurred');
        return response.status(500).json({message:'Internal server error'});
    }
}

async function handleUserLogin(reques, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Email or password is missing"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return response.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.fullname
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "1d" }
        );

        // Successful login
          logEvent({
              event: "USER_LOGGED_IN",
              userId: user._id,
              email: user.email,
              req: request
          });


        return response
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .json({ message: "User login success" });

    } catch (error) {
        console.error("Login error:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

async function handleUserLogout(request,response){

    
}

async function handleUserDelete(request,response){
    const {email} = request.body;
    if(!email) return response.status(400).json({message:'Email is required'});

    const user = await User.findOne({email:email});
    if(!user) return response.status(400).json({message:'Email does not exist'});

    await User.findOneAndDelete({email:email});

    logEvent({
        event: "USER_ACCOUNT_DELETED",
        userId: user._id,
        email: user.email,
        req: request
    });

    return response.status(200).json({message:'User delete success'});
}

async function handleUserGetInfo(request,response){
    const { email } = request.body;
    if(!email){
        return response.status(400).json({message:'Email does not exist'});
    }
    const user = User.findOne({email:email});
    if(!user) return response.status(400).json({message:'user with email does not exist'});
    return response.status(200).json({message:'User Info fetched success',data:user});
}


module.exports = {
    handleUserDelete,
    handleUserGetInfo,
    handleUserLogin,
    handleUserLogout,
    handleUserRegistration
};

