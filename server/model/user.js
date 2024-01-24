import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide your name."],
        minlength: 4,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 20,
        minlength: 3,
        default: "Last Name",
        trim: true
    },
    email: {
        type: String,
        require: [true, "Please provide your email."],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please provide your password."],
        minlength: 6,
        select: false
    },
    location: {
        type: String,
        minlength: 3,
        maxlength: 20,
        default: "My city"
    }
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME })
}

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

const User = mongoose.model("user", userSchema)

export default User 