const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');

const User=require('../models/user')

// write routes 

// sign up
router.post('/register', async(req,res)=>{
    try {
        
        const {username,email,password}=req.body;

         if(!username || !email || !password)
        {
            res.status(200).json({message:"All fields are required"});
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user= new User({ name:username , email ,password:hashPassword });
        await user.save().then(()=>
            res.status(200).json({message:"SignUp Successful"})//in json user is key ->value will be user values as above
        );


    } catch (error) {
        res.status(200).json({message:"User already exists"});
    }
});

// sign in
router.post('/login', async(req,res)=>{
    try {
        
        const {email,password}=req.body;

        if(!email || !password)
        {
            res.status(200).json({message:"All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user)
        {
            res.status(200).json({message:"User not exists"});
        }

        const ispasswordcorrect = await bcrypt.compare(req.body.password,user.password);
        if(!ispasswordcorrect)
            {
                res.status(200).json({message:"Password not correct"});
            } 


        // here just password is renamed as userpassword becoz it will give error as we destructured it twice and const cant be used two times
        const {password:userpassword , ...others} = user._doc;
        //here destructuring so that password is seperated from others and others containall the info from user._doc->user._doc is the document which contains all the info about the usermodels document of each user 

        res.status(200).json({message:"Signin Successful",id:others._id});


    } catch (error) {
        res.status(200).json({message:`${error}`});
    }
});



// this will be imported in the app.js for routing
module.exports = router;