const auth = {
    secret: String(process.env.TOKEN_SECRET_KEY),
    expires: String(process.env.TOKEN_EXPIRES_IN)
}

export default auth;