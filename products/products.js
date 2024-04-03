const express=require('express');
const app=express();
app.use(express.json())
const router=express.Router();
const products=[
   
    {id:1,name:"shirt",price:'300',desc:"amazing shirt for you dear(:"},
    {id:2,name:"t-shirt",price:'340',desc:"amazing shirt for you dear(:"},
    {id:3,name:"shirt",price:'200',desc:"amazing shirt for you dear(:"},
    {id:4,name:"red-shirt",price:'370',desc:"amazing shirt for you dear(:"},
    {id:5,name:"pants",price:'350',desc:"amazing shirt for you dear(:"},
    {id:6,name:"shoes",price:'600',desc:"amazing shirt for you dear(:"}, 
];


//all products
router.get('/products',(req,res)=>{
res.status(200).json(products)
})

//one product
router.get('/products/:id',(req,res)=>{
const id=Number(req.params.id);
try{
    const product=products.find((pro)=>pro.id===id);
    if(!product){
        res.status(400).json("not found product by this id")
    }
    else{
        res.status(200).json(product)
    }

}catch(err){
    res.status(500).json({message:err.message})
}
});

//add products
router.post('/products',(req,res)=>{
    const {name,price,desc}=req.body;
    try{
        const product=products.find((pro)=>pro.name===name);
        if(product){
            return res.status(400).json({message:'product already find'})
          }
          else{
            if(!name || !price || !desc){
              return res.status(400).json({message:'please enter all fileds'})
            }
            const newProduct={
              id:products.length+1,
              name:name,
              price:price,
              desc:desc,
            };
            products.push(newProduct);
            res.status(200).json(newProduct)
          }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//update product
router.patch('/products/:id',(req,res)=>{
    const Id=Number(req.params.id);
    try{
    const product=products.find((pro)=>pro.id===Id);
    if(!product){
        return res.status(400).json({message:'product not found'})
    }
    else{
        product={...product,...req.body};
        res.status(200).json(product)
    }
    }
    catch(err){
        res.status(500).json({message:err.message});  
    }

})

//delete product
router.delete('/products/:id',(req,res)=>{
const Id=Number(req.params.id);
try{
    const product=products.filter((pro)=>pro.id !==Id);
  if(!product){
     return res.status(400).json({message:'product not found'});
  }
  res.status(200).json(product)
}
catch(err){
    res.status(500).json({message:err.message});    
}
})
module.exports=router;

const productsbyId=(productId)=>{
    const proId=products.find((x)=>x.id===productId);
    return proId;
}

const updateQuantity=(productId)=>{
    const product = products.find((pro) => pro.id === productId);
    if (product.quantity > 0) {
        product.quantity -= 1;
        return true;
    }
    return false
}


module.exports = { productsbyId };
module.exports={updateQuantity};

module.exports.products=products;
