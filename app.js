// Task1: initiate app and run server at 3000
const express=require('express')
const mongoose=require('mongoose')
const employeeData=require('./models/employee')

const path=require('path');

const app=new express()

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Task2: create mongoDB connection 

mongoose.connect('mongodb+srv://Nufeejasameer:Ikkakku123@cluster0.d2fsqtu.mongodb.net/dataDB?retryWrites=true&w=majority')
.then((res,req)=>{
    console.log("Mongodb successfully connected")
})
.catch((req,res)=>{
    console.log("Mongodb not connected")
})
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.post('/api/employeelist',async(req,res)=>{
    try{
        let item=req.body
        console.log(item)
    const user= new employeeData(item)
    const savedUser=await user.save()
    res.send(savedUser)
    }
    catch(error){
        console.log(error)
    }
})





//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
    employeeData.find().then(function(data){
        res.send(data)
    })
})


//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id',(req,res)=>{
    employeeData.findOne({"_id":req.params.id}).then(function(data){
        res.send(data)
    })
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
        let item=req.body
        console.log(item)
    const user= new employeeData(item)
    const savedUser=await user.save()
    res.send(savedUser)
    }
    catch(error){
        console.log(error)
    }
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
    
    employeeData.deleteOne({"_id":req.params.id}).then(function(data){
        res.send(data)
    })
})
//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
    let id =req.body._id
 employeeData.findByIdAndUpdate({"_id":id},{name:req.body.name,location:req.body.location,position:req.body.position,salary:req.body.salary}).then(function(data){
    res.send(data)
 })

   })
   
       




//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
const PORT=3000
app.listen(PORT,(res,req)=>{
    console.log(`Server connected to port ${PORT}`)
})


