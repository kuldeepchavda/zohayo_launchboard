const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
 if (this.password){
   if (this.isModified("password") || this.isNew) {
     const salt = await bcrypt.genSalt(10); // Generate salt
     this.password = await bcrypt.hash(this.password, salt); // Hash password using generated salt
   }
   next();
 }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users-launchboard2", userSchema);
// const User = mongoose.model("Users-launchboard", userSchema);

module.exports = User;