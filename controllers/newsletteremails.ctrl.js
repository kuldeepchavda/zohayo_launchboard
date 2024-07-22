const NewsletterEmails = require("../models/NewslettersEmail");
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email); 
}
exports.saveEmail = async (req, res) => {
  const { email } = req.body; 

  const emailExists = await NewsletterEmails.findOne({ email: email });
  if (emailExists) {
    res.status(400).send("The provided email address already exists.");
  }
  {
    if (validateEmail(email)){
      const response = await NewsletterEmails.create({ email });
      res.status(200).send(response);
    }else{
      res.send("invalid email address")
    }
  }
};

exports.getEmails =async (req,res)=>{
    response = await NewsletterEmails.find()
    res.status(200).send(response)
}

exports.deleteEmail = async(req,res)=>{
    const response = await NewsletterEmails.deleteOne({email:req.params.email})
    res.send(response)
} 