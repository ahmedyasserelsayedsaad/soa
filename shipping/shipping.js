const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

const ordersser=require('../orders/orders.js')

//console.log(orders.findOrderById());









const shippings = [];

router.post('/shipping',(req,res)=>{
    const { orderId, address } = req.body;
    try{
       
        if (!address) {
            return res.status(400).json({ message: 'enter your addres' });
        }
        else{
            const newShipping = { orderId, address };
            shippings.push(newShipping);
            res.status(200).json({ message: `Shipping started to ${address}` });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.get('/shippings', (req, res) => {
 
    res.status(200).json(shippings);
});



const addShipping=(info)=>{
shippings.push(info)
}


module.exports=router;
module.exports.addShipping=addShipping;