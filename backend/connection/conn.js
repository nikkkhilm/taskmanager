const mongoose=require("mongoose");

const conn = async ()=>{
    try {
        
        await mongoose.connect("mongodb+srv://nikhil:nikhil@cluster0.txssocb.mongodb.net/");
        console.log("database connected");

    } catch (error) {
        
      console.error("database not connected",error)
    }
};

module.exports = conn;