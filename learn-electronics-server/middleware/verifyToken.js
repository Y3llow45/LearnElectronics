require('dotenv').config();
const jwt = require('jsonwebtoken');
const SSKEY = process.env.SSKEY;
console.log('hi from middleware')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log('no access boi')
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const payload = jwt.verify(token, SSKEY);
        console.log(payload.username, payload.role)
        req.username = payload.username;                                 // test this thing
        next();
        
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;