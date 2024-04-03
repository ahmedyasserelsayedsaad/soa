const express=require('express');
const router=express.Router();
const app=express();
app.use(express.json());

//orders array

const orders=[];

//get all-orders

router.get('/orders',(req,res)=>{
    return res.status(200).json(orders);
  });


// Add new order
router.post('/orders', (req, res) => {
  try{
    const { customerId, products } = req.body;

    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    const newOrder = {
        orderId: orders.length + 1, 
        customerId: customerId,
        products: products,
      
    };

    orders.push(newOrder);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  }catch(err){
    res.status(500).json({message:"error"+err})
  }
 
});


router.get('/orders/:customerId', (req, res) => {
    const customerId = req.params.customerId;
 
    const customerOrders = orders.filter(order => order.customerId === customerId);

    res.status(200).json(customerOrders);
});








module.exports=router;