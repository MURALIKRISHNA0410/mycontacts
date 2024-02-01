const asyncHandler=require("express-async-handler");
const User =require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

// @desc register a user
//@route GET /api/users/register
//@access public

const registerUser= asyncHandler(async (req,res)=>{
    //console.log("In register user");
    //const [username,email,password]=req.body;
    const{username,email,password}=req.body;
    //console.log("after assigning");
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Feilds are mandatory");
    }
    //console.log("after first if");
    const userAvailabe = await User.findOne({email});
    //console.log("after first one");
    if(userAvailabe){
        res.status(400);
        throw new Error("User already registered");
    }
    //Hash password
    //console.log("before hashing");
    const hashedPassword =await bcrypt.hash(password,10);
    //console.log.apply("after hashing");
    console.log("hashed password",hashedPassword);
    const user =await User.create({
        username,
        email,password:hashedPassword,
    });
    console.log("user created",user);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("user data is not valid");
    }

    res.json({message:"register the user"});
});

// @desc login a user
//@route GET /api/users/login
//@access public

const loginUser= asyncHandler(async (req,res)=>{
    //console.log("before assigning");
    const {email,password}=req.body;
    //console.log("after assign")
    if(!email || !password){
        res.status(400);
        throw new Error("All Feilds are mandatory");
    }
    //console.log("after if");
    const user =await User.findOne({email});
    //console.log("afetr find one");
    //compare passkey eith hashed passkey
    if(user && ( await bcrypt.compare(password,user.password))){
        const accessToken =jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}

        );
        res.status(200).json(accessToken);
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({message:"login user"});
});

// @desc current user
//@route GET /api/users/current
//@access private

const currentUser= asyncHandler(async (req,res)=>{
    res.json(req.user);
});
module.exports = {registerUser,loginUser, currentUser};