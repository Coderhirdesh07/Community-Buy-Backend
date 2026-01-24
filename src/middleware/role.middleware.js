
async function verifyRoleAdmin(request,response,next){
    try{
        const {role} = request.role;
        if(!role){
            return response.status(400).json({message:'Role is not found'});
        }
        if(role=="Admin"){
            return next();
        }
        return response.status(400).json({message:'Restricted access'});

    }
    catch(error){
        console.log(error);
        return response.status(500).json({message:'Internal server error'});
    }

}

async function verifyRoleMerchant(request,response,next){
    try{
        const {role} = request.role;
        if(!role){
            return response.status(400).json({message:'Role is not found'});
        }
        if(role=="Merchant"){
            return next();
        }
        return response.status(400).json({message:'Restricted access'});

    }
    catch(error){
        console.log(error);
        return response.status(500).json({message:'Internal server error'});
    }

}

module.exports = {verifyRoleAdmin,verifyRoleMerchant};