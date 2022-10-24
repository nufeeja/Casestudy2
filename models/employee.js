const mongoose=require('mongoose')

const Schema=mongoose.Schema


const employee_Detail=new Schema({
    name:String,
    position:String,
     location:String,
     salary:Number
    
})

const employeeData=mongoose.model('employee',employee_Detail)  

module.exports=employeeData