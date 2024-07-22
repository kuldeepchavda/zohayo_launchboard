const ContactData = require("../models/ContactUs")

exports.createContact = async(req,res)=>{
    const response= await ContactData.create(req.body)

    res.send(response)
}

exports.getAllContacts = async(req,res)=>{
    const response = await ContactData.find()
    res.send(response)
}    
exports.getByEmail = async(req,res)=>{
const {email} = req.params
const response = await ContactData.find({email:email})
if (response){
    res.status(200).json(response)
}else{
    res.status(400).send("The required email id doesn't exist.")
}
}