const jwt = require('jsonwebtoken');
require('dotenv').config();
const SSKEY = process.env.SSKEY;

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SSKEY, { expiresIn: '1d' });
    return token;
};
