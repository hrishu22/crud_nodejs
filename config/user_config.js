const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User= mongoose.model('User')
router.get('/',(req,res)=>{
    res.render("user/add",{
        tittle:"Insert",
        
    })
})
router.post('/',(req,res)=>{
    if (req.body._id == '')
        insert(req, res);
        else
        updateRecord(req, res);
})
function insert(req,res){
    var user= new User();
    user.fullname=req.body.fullname;
    user.email=req.body.email;
    user.city=req.body.city;
    user.phone=req.body.phone;
    user.save((err,doc)=>{
        if(!err)
            res.redirect('/list')
        else{
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/add", {
                    tittle: "Insert",
                    user: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        
        }
    });
}
function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/add", {
                    tittle: 'Update Employee',
                    user: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });

}

router.get('/list',(req,res)=>{
    
    User.find((err,doc)=>{
        if(!err){
            res.render("user/list",{
                list:doc
            })
        }
    }).lean();
})
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        
        if (!err) {
            res.render("user/add", {
                tittle: "Update Employee",
                list: doc
            });
          
           
        }
    }).lean();
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = router;