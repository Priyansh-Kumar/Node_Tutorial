const express=require('express');
const router=express.Router();
const Person=require('../models/Person.js');
//const { message } = require('prompt');

router.post('/',async(req,res)=>{
  try{
    const data=req.body //Assuming the request body conatins the person data

    //create a new Person document using the Mongoose model
    const newPerson=new Person(data);
  
    //save the new person to the database 
    
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }

})

//get method for retrieving the data


router.get('/',async(req,res)=>{
   try{
    const data =await Person.find();
    console.log('data fetched sucessfully');
    res.status(200).json(data);

   }catch(err){
      console.log('error in data fecthing');
      res.status(500).json(err);
   }
})


router.get('/:workType',async(req,res)=>{
  try{
   const workType=req.params.workType; //extract the work type from the URL parameter

   if(workType=='chef' || workType=='manager' || workType=='waiter'){
    const response=await Person.find({work:workType});
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
router.put('/:id',async(req,res)=>{
  try{
     const personId=req.params.id; 
     const updatedPersonData=req.body;

     const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true,
      runValidators:true,
     })

     if(!response){
      return res.status(404).json({error:'Person not found'});
     }

     console.log("data updated");
     res.status(200).json(response);
  }catch(err){
    console.log('error in data fecthing');
    res.status(500).json(err);
  }
})

router.delete('/:id',async(req,res)=>{
  try{
     const personId=req.params.id; 
     const updatedPersonData=req.body;

     const response=await Person.findByIdAndDelete(personId)

     if(!response){
      return res.status(404).json({error:'Person not found'});
     }

     console.log("data deleted");
     res.status(200).json({message:"data deleted successfully"});
  }catch(err){
    console.log('error in data fecthing');
    res.status(500).json(err);
  }
})
module.exports=router;