module.exports=(err,req,res,next)=>{

    res.status(errorStatusCode=res.errorStatusCode).send({
        error:true,
        message:err.message,
        cause:err.cause,
        body:req.body,
        // stack:err.stack
    })
}