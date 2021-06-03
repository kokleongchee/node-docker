const protect = (req, res, next) => {
    const {user} = req.session
    if (!user) {
        return res.status(401).json({status: "Fail", message: "Unauthorized"})
    }
    console.log(`current user : ${user}`)
    next()
}

module.exports = protect
