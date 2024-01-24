import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import morgan from "morgan"

import "express-async-errors"

// Connect DB
import connectDB from "./db/connectDB.js"

// Authentication Route
import authRouter from "./routes/authRoute.js"

// Job Route
import jobRoute from "./routes/jobRoute.js"

// Middleware

import { NotFoundMiddleware } from "./middleware/not-found.js"
import errorHandlingMiddleware from "./middleware/error-handler.js"
import authenticateUser from "./middleware/auth.js"


if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}
app.use(express.json())
app.use(cors())

// Routes

// User Auth API
app.use("/api/v1/auth", authRouter)

// Job API
app.use("/api/v1/jobs", authenticateUser, jobRoute)




app.use(NotFoundMiddleware)
app.use(errorHandlingMiddleware)

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB(process.env.MONGOOSE_URL)
        console.log("Database connected")
        app.listen(port, () => {
            console.log(`app is listening at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()
