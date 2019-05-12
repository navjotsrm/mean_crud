const express= require('express');
const app = express();
const businessRoutes= express.Router();
var multer = require('multer');
var DIR = './uploads';
const path = require('path');

let Business= require('../model/business');



let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

businessRoutes.get('/images', function (req, res) {
  // res.end('file catcher example');
  // Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
  //   res.render('index', {photolist : Image});
  
  });

businessRoutes.route('/image',upload.single('image')).post((req, res) =>{
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false,
        image:'',
      });
  
    } else {
      console.log('file received');
      console.log(req.file.filename)
      return res.send({
        success: true,
        image:req.file.filename
      })
    }

});

businessRoutes.route('/add',upload.single('image')).post((req,res)=>{

  const url= req.protocol + '://' + req.get("host");
        let business=  new Business({
            person_name: req.body.person_name,
            business_name:req.body.business_name,
            business_gst_number:req.body.business_gst_number,
            image:url + "/uploads/" + req.body.image
        });
       
        business.save()
        .then(business=>{
            res.status(200).json({'business':'business is added successfully',business});
            console.log(business);
        })
        .catch(err=>{
            res.status(400).send("unable to save to database");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log(err)
        });
});

businessRoutes.route('/').get((req,res)=>{
    Business.find((err,businesses)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(businesses);
                
            }
    })
})

businessRoutes.route('/edit/:id').get((req,res)=>{
        let id= req.params.id;
        Business.findById(id,(err,business)=>{

            if(err){
                    console.log(err)
            }else{
                res.json(business);
            }
                    
        })
})

businessRoutes.route('/update/:id').post( (req,res,next)=> {
    Business.findById(req.params.id,(err, business)=> {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;
        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

businessRoutes.route('/delete/:id').delete((req,res)=>{
        Business.findOneAndDelete({_id:req.params.id},(err,business)=>{
            if(err){
                res.json(err);
                console.log("***********************",err)
            }else{
                res.json("successfully removed");
            }
        })
})


module.exports=businessRoutes;