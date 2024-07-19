const mongoose=require('mongoose');

// lists is a schema
const listSchema=new mongoose.Schema({

    title:{type:String,required:true},
    body:{type:String,required:true},
    user:[{
        type:mongoose.Types.ObjectId,
        // here the above line type says that its type is an ObjectId which specifies the documents in another model ref:"list"
        ref:"User",
    }]
},{timestamps:true}
);


// creating a model->list, with the listSchema,model is displayed in db
const List=mongoose.model("List",listSchema);
module.exports = List;