const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function handleRefreshToken(req, res) {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken }); 

    if (!foundUser) return res.sendStatus(403); //forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decodedInfo) => {
            if (err || foundUser.email !== decodedInfo.email) return res.sendStatus(403)
            const email = foundUser.email
            const accessToken = jwt.sign(
                {
                    userID: foundUser._id,
                    email: decodedInfo.email
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json({ accessToken, email })
        } 
    )
}

module.exports = { handleRefreshToken }