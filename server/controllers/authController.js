import bcrypt from "bcrypt"
import dotenv from "dotenv"
import Jwt from "jsonwebtoken"
dotenv.config()
import BadRequestError from "../errors/badRequest.js"
import User from "../model/user.js"
import UnAuthenticatedError from "../errors/unAuthenticated.js"



const resgister = async (req, res) => {

    const { name, email, password } = req.body

    if (!name) {
        throw new BadRequestError("Please provide Name")
    } else {
        if (name.length <= 4 || name.length > 20) {
            throw new BadRequestError("Name should be between 4 to 20 characters")
        }
    }

    if (!email) {
        throw new BadRequestError("Please provide email")
    }

    if (password.length < 6) {
        throw new BadRequestError("Password should contains more than 6 characters")
    }

    const userAlreadyExist = await User.findOne({ email })

    if (userAlreadyExist) {
        throw new BadRequestError("User already registered")
    }

    const saltRounds = 10;

    const hashed = await bcrypt.hash(password, saltRounds)

    await User.create({ name, email, password: hashed })
    res.status(201).json({ msg: "User created!!...Redirecting" })


}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new UnAuthenticatedError("Please Enter your Credentials")
    }

    const isUserExist = await User.findOne({ email }).select("+password")

    if (!isUserExist) {
        throw new UnAuthenticatedError("Email is not registered")
    }

    const isPasswordCorrect = await isUserExist.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials")
    } else {
        const token = isUserExist.createJWT()


        res.status(200).json({
            user: {
                name: isUserExist.name,
                lastName: isUserExist.lastName,
                email: isUserExist.email,
            },
            location: isUserExist.location,
            token
        })
    }

    res.send(isUserExist)

}

const update = async (req, res) => {
    const { name, lastName, location } = req.body

    if (!name) {
        throw new BadRequestError("Please provide Name")
    } else {
        if (name.length <= 4 || name.length > 20) {
            throw new BadRequestError("Name should be between 4 to 20 characters")
        }
    }

    if (!lastName) {
        throw new BadRequestError("Please provide Last Name")
    } else {
        if (lastName.length <= 3 || lastName.length > 20) {
            throw new BadRequestError("Last Name should be between 3 to 20 characters")
        }
    }

    if (!location) {
        throw new BadRequestError("Please provide Location")
    } else {
        if (location.length <= 3 || location.length > 20) {
            throw new BadRequestError("location should be between 3 to 20 characters")
        }
    }

    const user = await User.findOne({ _id: req.user.userId })

    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()

    res.status(200).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        },
        token,
        location: user.location

    })
}


const logout = (req, res) => {
    res.status(200).json({ msg: 'user logged out!' });
};

const getCurrentUser = async (req, res) => {
    const { token } = req.body
    const payload = Jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({ _id: payload.userId });
    res.status(200).json({ user, location: user.location, token });
}

export { resgister, login, update, logout, getCurrentUser }