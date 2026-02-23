const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logEvent = require("../utils/Anaylitcs.logger.utils.js");


async function handleUserRegistration(request,response){
    try{
    const {fullname,email,password ,role} = request.body;
    if(!fullname|| !email || !password || !role){
        return response.status(400).json({message:"Full name or email or password or role is missing"});
    }
    const isEmailExist = await User.findOne({email:email}); 
    if(isEmailExist) return response.status(400).json({message:'User with email already exist'});

    const encryptedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({fullname,email,password:encryptedPassword,role:role});

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

async function handleUserLogin(request, response) {
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
        console.log("Analytics login line 74");
          logEvent({
              event: "USER_LOGGED_IN",
              userId: user._id,
              email: user.email,
              req: request
          });
          console.log("analytics login line 80")


        return response
            .status(200)
            .cookie("token", token, {
                httpOnly:true,
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .json({ 
                message: "User login success" ,
                token:token
            });

    } catch (error) {
        console.error("Login error:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

async function handleUserLogout(request,response){
    const {id} = request.body;
    if(!id) return response.status(400).json({message:"Id is empty"});

    const isUserExist = await User.findById({id});
    if(!isUserExist) return response.status(400).json({message:"User does not exist"});

    return response.status(200).clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })
    .json({message:"User logout success"}); 
}

async function handleUserDelete(request,response){
    const { id } = request.params;
     if (!id) return response.status(400).json({ message: "User ID is required" });

     const user = await User.findById(id);
     if (!user) return response.status(404).json({ message: "User not found" });

     await User.findByIdAndDelete(id);

    console.log("analytics login line 116")
    logEvent({
        event: "USER_ACCOUNT_DELETED",
        userId: user._id,
        email: user.email,
        request: request
    });
    console.log("analytics login line 123")

     return response.status(200).json({
    message: "User deleted successfully",
    user: { _id: user._id, email: user.email, fullname: user.fullname }
  });
}

async function handleUserGetInfo(request,response){
    const { id } = request.body;
    if(!id){
        return response.status(400).json({message:'User does not exist'});
    }
    const user = User.findOne({id});
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

