require('./models/db');
const controller = require('./config/user_config');
const express=require('express');
const path = require('path');
const hb = require('express-handlebars');
const parser= require('body-parser');
const { parse } = require('path');
var app = express();
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',hb.engine({extname:'hbs',defaultLayout:'mainLayout', layoutDir:__dirname+'/views/layouts/'}))
app.set('view engine','hbs');
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.listen(5000,()=>{
    console.log("Server started at 5000");
});

app.use('/', controller);