const jwt = require('jsonwebtoken')



module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
            if(err){
                res.status(401).json({ message: 'Failed to verify authorization one' })
            } else {
                req.user = {
                    username: decodedJwt.username
                };
                next();
            }
        });
    } else {
        res.status(401).json({message: 'Failed to verify authorizaton two'})
    }
}