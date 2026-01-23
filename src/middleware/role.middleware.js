

async function verifyRole(request,response,next){
    try{

    }
    catch(error){
        console.log(error);
        return response.status(500).json({message:'Internal server error'});
    }

}

module.exports = verifyRole;