const mongoose=require('mongoose');


// lists is a schema
const userSchema=new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    list:[{
        type:mongoose.Types.ObjectId,
        // here the above line type says that its type is an ObjectId which specifies the documents in another model ref:"list"
        ref:"List",
    }]
},{timestamps:true}
);





// creating a model->list, with the listSchema,model is displayed in db
const User=mongoose.model("User",userSchema);
module.exports = User;