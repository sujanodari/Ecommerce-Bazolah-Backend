const mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'] },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Vendor', 'Customer', 'Bazolah', 'SuperAdmin'] },
    contactNo: { type: Number, required: true },
    image: { type: String, required: false },
    password:{type:String,required:true},
    dokanName: { type: String, required: false },
    verified: { type: Boolean, required: true, default: false },
    joinedAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model("users", userSchema);
