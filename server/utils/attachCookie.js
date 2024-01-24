const attachCookie = (res, token) => {
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httponly: true,
        expires: new Date(Date.now() + oneDay)
    })
}

export default attachCookie