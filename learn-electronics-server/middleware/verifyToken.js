require('dotenv').config();
const jwt = require('jsonwebtoken');
const SSKEY = process.env.SSKEY;

const verifyToken = (req, res, next) => {
    console.log('verifing');
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const verified = jwt.verify(token, SSKEY, (err, user) => {
            if(err){
                console.log("Here",err);
            }
            else{
                console.log('YES!');
                next()
            }

        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;