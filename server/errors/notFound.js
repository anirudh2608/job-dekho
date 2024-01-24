class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 402
    }
}

export default NotFoundError
