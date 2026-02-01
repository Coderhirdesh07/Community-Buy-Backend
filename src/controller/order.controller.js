const Order = require("../models/order.model");

  async function handleCreateNewOrder(request,response){
    const {userId,productId,quantity} = request.body;

    if(!userId || !productId || !quantity) return response.status(400).json({message:"UserId or productId or quantity is missing"});

    const newOrder = await Order.create({userId,productId,quantity});

    return response.status(200).json({message:"Order created success",data:newOrder}); 
  
  }
  
  async function handleGetAllOrder(request,response){
    const {userId} = request.body;

    if(!userId) return response.status(400).json({message:"User id is missing"});

    const orderList = await Order.find({userId});

    return response.status(200).json({message:"Orders fetched success",data:orderList});  
  }


//  async function handleGetAllOrder(req, res) {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: "User id is missing" });
//     }

//     const orders = await Order.find({ userId });

//     return res.status(200).json({
//       message: "Orders fetched successfully",
//       data: orders
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// } 

module.exports = {handleCreateNewOrder,handleGetAllOrder};
