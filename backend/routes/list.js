const express=require('express');
const router=express.Router();

const User=require('../models/user')
const List=require('../models/lists')

// add task
router.post('/addTask',async(req,res)=>{
    try {
        
         const {title,body,id} = req.body;

    if(!id || !title || !body)
    {
        res.status(400).json({message:"All fields are required"});
    }

    const existinguser = await User.findOne({_id:id});
    if(!existinguser)
    {
        res.status(400).json({message:"User not found"});
    }

    const list = new List({title,body,user:existinguser});
    await list.save().then(()=>res.status(200).json({list:list}));

    // now update also the user table who added the task for the lists array
    existinguser.list.push(list);
    await existinguser.save();

    } catch (error) {
        console.error("Adding task failed ",error);
    }
});

// update task u will send an id which is tasks id which needs to be updated
router.put('/updateTask/:id',async (req,res)=>{
    try {
        const {title,body}=req.body;
        // if(!email)
        // {
        //     res.status(400).json({message:"all fields are required"});
        // }
        // const id=req.params.id;
        // const user=await User.findOne({id});
        // if(user)
        // {
            const list = await List.findByIdAndUpdate(req.params.id,{title,body});
            await list.save().then(()=>res.status(200).json({message:"Updated sucessfully"}));
        // }
    } catch (error) {
        console.error("not updated",error);
    }
});


// delete task
router.delete('/deleteTask/:id',async(req,res)=>{
    try {
        const {id}=req.body;
        const existinguser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}})
        // if(!existinguser)
        // {
        //     res.status(400).json({message:"user not found"});
        // }
        // the tasks when added will be added to user also in the list array so u have to update that by using aggregator pull
        // const user = await User.findOneAndUpdate({id},{$pull:{list:req.params.id}});
        if(existinguser)
        {
            const list = await List.findByIdAndDelete(req.params.id).then(()=>
            res.status(200).json({message:"task deleted sucessfully"})
            )
        }
    } catch (error) {
        console.error(error);
    }
});

// get tasks
router.get('/getTasks/:id',async(req,res)=>{
    try {
        // const {email} = req.body;
        // const user = await User.findOne({email});
        // if(user)
        // {
            const list = await List.find({user:req.params.id}).sort({createdAt:-1});//sort is used to sort in decreasing order
            if(list.length!=0)
            {
            res.status(200).json({list});
            }
            else
            {
                res.status(200).json({message:"No Tasks"});
            }
        // }
    } catch (error) {
        console.error(error);
    }
});


module.exports=router;