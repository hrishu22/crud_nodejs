const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    fullname:{
        type:String,
        required:"Required field"
    },
    email:{
        type:String
    },
    city:{
        type:String
    },
    phone:{
        type:Number
    }
});

schema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
mongoose.model("User",schema);