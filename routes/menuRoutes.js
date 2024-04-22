const express=require('express');
const router=express.Router();


const MenuItem=require('./../models/Menu.js');
const { findByIdAndUpdate } = require('../models/Person.js');


router.post('/',async(req,res)=>{
  try{
    const data=req.body //Assuming the request body conatins the person data

    //create a new Person document using the Mongoose model
    const newMenu=new MenuItem(data);
  
    //save the new person to the database 
    
    const response=await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }

})

router.get('/',async(req,res)=>{
  try{
   const data =await  MenuItem.find();
   console.log('data fetched sucessfully');
   res.status(200).json(data);

  }catch(err){
     console.log('error in data fecthing');
     res.status(500).json(err);
  }
})

router.get('/:tasteType',async(req,res)=>{
  try{
     const tasteType=req.params.tasteType; //extract the work type from the URL parameter

   if(tasteType=='sweet' || tasteType=='sour'){
    const response=await MenuItem.find({taste:tasteType});
    console.log('response fetched');
    res.status(200).json(response);
   }else{
    res.status(404).json({error:'Invalid work type'});
   }
  }catch(err){
    console.log('error in data fecthing');
    res.status(500).json(err);
  }
})

//comment for testing purpose
module.exports=router;