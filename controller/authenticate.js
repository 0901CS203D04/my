const jwt = require('jsonwebtoken');
const jwtSec = 'cfcffgcgvgvgvgcgrddfcfgmnjnhjhjrdrcfdcfdddfdferwewefcfcfggfcgfcfcffcfcf'
const authentication = (req, res, next) => {
    try {

        let tokens = req.header('Authorization')

        jwt.verify(tokens, jwtSec, function (err, decoded) {
            if (err) return res.status(401).send({ message: "insert token" })
            //req.product = decoded;
            console.log(decoded)
            next();            
        })

        

    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(401).json({ error: 'Unauthorized access.' });
    }
};

module.exports = authentication;