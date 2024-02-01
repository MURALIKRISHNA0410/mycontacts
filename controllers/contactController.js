const asyncHandler=require("express-async-handler");
const Contact =require("../models/contactModel");
// @desc get all contacts
//@route GET /api/contacts
//@access private

const getContacts= asyncHandler(async (req,res)=>{
    const contact= await Contact.find({user_id:req.user.id});
    res.status(200).json(Contact);
    
});

// @desc create new contact 
//@route post /api/contacts
//@access private

const createContact= asyncHandler(async(req,res)=>{
    console.log("the request body is" ,req.body);
    const{name,email,phone}=req.body;
    if(!name || !email ||! phone){
        res.status(400);
        throw new Error("all field are mandatory");
    }
    //console.log("after");
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });

    res.status(201).json(contact);
    
});


// @desc Get contact 
//@route Get /api/contacts/:id
//@accessprivate

const getContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
    
});


// @desc Update contact 
//@route Put /api/contacts/:id
//@access private

const updateContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.to_string()!=req.user.id){
        res.status(403);
        throw new Error("User dont have the permission to updatge other user contacts");
    }
    const updatedContact=await  Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updatedContact);
    
});

// @desc Delete contact 
//@route DELTE /api/contacts/:id
//@access private

const deleteContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //console.log("before");
    if (contact.user_id.to_string()!=req.user.id){
        res.status(403);
        throw new Error("User dont have the permission to updatge other user contacts");
    }
   const  deleted=await Contact.findByIdAndDelete({_id:req.params.id});
    //console.log("after");
    res.status(200).json(contact);
    
});
module.exports={getContacts,createContact,updateContact,deleteContact,getContact};