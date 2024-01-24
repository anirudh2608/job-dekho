const errorHandlingMiddleware = (error, req, res, next) => {

    const defaultError = {
        msg: error.message,
        statusCode: error.statusCode || 500
    }

    res.status(defaultError.statusCode).json({
        msg: defaultError.msg
    })
}

export default errorHandlingMiddleware