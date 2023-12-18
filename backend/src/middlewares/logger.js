const morgan= require("morgan")

const fs=require("node:fs")

//create today log file
const today = new Date().toISOString().split("T")[0]

//add the logs to the file
module.exports=morgan("combined",{
    stream: fs.createWriteStream(`./logs/${today}.log`)
},{flags:"a+"});
