const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://hrishu:anand@cluster0.jyxv2.mongodb.net/Project_Node?retryWrites=true&w=majority'
,(err)=>{
    if(!err){
        console.log("Connection Successfull....")
    }
    else{
        console.log("Error........"+ err);
    }
});
require('./user')