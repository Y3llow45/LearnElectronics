require('dotenv').config();
const jwt = require('jsonwebtoken');
const SSKEY = process.env.SSKEY;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const payload = jwt.verify(token, SSKEY, (err) => {
            if(err){
                console.log("Error verifing token",err);
            }
        });
        if (payload && payload.username) {
            req.username = payload.username;                                 // test this thing
        }
        next();
        
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;