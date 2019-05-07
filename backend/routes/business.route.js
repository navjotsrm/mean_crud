const express= require('express');
const app = express();
const businessRoutes= express.Router();

let Business= require('../model/business');

businessRoutes.route('/add').post((req,res)=>{
        let business=  new Business(req.body);
        business.save()
        .then(business=>{
            res.status(200).json({'business':'business is added successfully'});
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