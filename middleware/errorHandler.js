const {constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
    const statusCode =res.statusCode ?res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
        res.json({ title:"validation Error", message:err.message,stackTrace:err.stack});
        break;
        case constants.NOT_FOUND:
        res.json({ title:"Not Found", message:err.message,stackTrace:err.stack});
        break;
        case constants.FORBIDDEN:
        res.json({ title:"Forbidden", message:err.message,stackTrace:err.stack});
        break;
        case constants.UNAUTHROIZED:
        res.json({ title:"Unauthroized", message:err.message,stackTrace:err.stack});
        break;
        case constants.SERVER_ERROR:
        res.json({ title:"Servr Error", message:err.message,stackTrace:err.stack});
        break;
        default:
            //console.log("No Error ,All good!");
            break;
    }
};

module.exports=errorHandler;