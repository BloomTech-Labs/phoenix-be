const jwt = require('jsonwebtoken')



module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(req.decodedJwt) {
        next()
    } else if(token){
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => { //Fix this line so we can somehow use the process.env.JWT_SECRET 
            if(err){
                res.status(401).json({ message: 'Failed to verify authorization one' })
            } else {
                req.decodedJwt = decodedJwt
                next()
            }
        })
    } else {
        res.status(401).json({message: 'Failed to verify authorizaton two'})
    }
}