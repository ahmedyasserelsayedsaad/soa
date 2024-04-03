const express=require('express');
const bcrypt=require('bcrypt')
const app=express();

const router=express.Router();

app.use(express.json())


//array of users that simulate DB
const users=[];


//register
router.post('/register',async(req,res)=>{
    const {email,password,name,phone}=req.body;
try{
const foundUser=users.find((user)=>user.email===email);
if(foundUser){
    return res.status(400).json({message:"error in usermail"})
}
else{
const solt=10;
//hashpass
const hashdPass=await bcrypt.hash(password,solt);
const newUser={
    id:users.length+1,
    email:email,
    password:hashdPass,
    name:name,
    phone:phone,
};
users.push(newUser);
res.status(200).json({message:'register is done'});
}
}
catch(err){
    res.status(500).json({message:err.message})
}
});



//login
router.post('/login',async(req,res)=>{
const {email,password}=req.body;
try{
const foundUser=users.find((user)=>user.email===email);
if(!foundUser){
    res.status(400).json({message:'not found user by this email'});

}
else{
    const matchPass=await bcrypt.compare(password,foundUser.password);
    if(matchPass){
        res.status(200).json({message:"logged in successfully"});
    }else{
        res.status(400).json({message:"not found user"})
    }
}
}catch(err){
    res.status(500).json({message:err.message})
}
});



//logout
router.post('/logout',(req,res)=>{
const {email}=req.body;
try{
const foundUser=users.find((user)=>user.email===email)
if(foundUser){
    users.splice(foundUser,1);
    res.status(200).json({message:'logout success'})
}else{
    res.status(404).json({ message: "not found user" })
}
}
catch(err){
    res.status(500).json({message:err.message})
}
});



//all users
router.get('/user',(req,res)=>{
res.status(200).json(users)
});



//exports functions
module.exports=router;