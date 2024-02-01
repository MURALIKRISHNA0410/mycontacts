const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app=express();

connectDb()
const port=process.env.PORT || 5000;


app.use(express.json());
app.use("/api/contacts",require("./routes/contactsRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server running on port $(port)`+port);
    
})