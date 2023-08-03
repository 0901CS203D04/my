
const jwt = require('jsonwebtoken');
const jwtSec = 'cfcffgcgvgvgvgcgrddfcfgmnjnhjhjrdrcfdcfdddfdferwewefcfcfggfcgfcfcffcfcf'
const authMiddleware = (req, res, next) => {
    try {

        let tokens = req.header('Authorization')

        jwt.verify(tokens, jwtSec, function (err, decoded) {
            if (err) return res.status(401).send({ message: "session is expired please login again" })
           // console.log(decoded)
            req.body.userdata = decoded;
            //console.log(req.body.userdata)
            next();

        })


    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(401).json({ error: 'Unauthorized access.' });
    }
};

module.exports = authMiddleware;
