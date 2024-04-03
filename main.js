const express=require('express');
const app=express();
const path=require('path')
const bcrypt=require('bcrypt')
const port=3000;
const users=require('./users/user');
const products=require('./products/products');
const orders=require('./orders/orders');
const shipping=require('./shipping/shipping');
const cart=require('./carty/cart');
app.use(express.json())

//urls

app.use('/soa',users);
app.use('/soa',products),
app.use('/soa',orders),
app.use('/soa',shipping);
app.use('/soa',cart),

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + "./public/index.html"));
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})