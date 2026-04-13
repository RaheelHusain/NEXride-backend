// const userModel = require('../models/user.models')
// const captainModel = require('../models/captain.models')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const blacklistTokenModel = require('../models/blacklistToken.models')


// module.exports.authUser = async (req, res , next ) =>{
//     const token = req.cookies?.token || req.headers.authorization?.split(' ').pop();

//     if(!token){
//         return res.status(401).json({message : "Unauthorization"});
//     }

//     const isBlackListed = await blacklistTokenModel.findOne({token : token});

//     if(isBlackListed){
//         return res.status(401).json({ message : "Unauthorized"})
//     }

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);
        
//         req.user = user
//         return next();
//     } catch (error) {
//         console.log('Auth error:', error.message);
//         return res.status(401).json({ message : "Unauthorized" })
//     }
// }


// module.exports.authCaptain = async (req, res, next) => {
//     const token = req.cookies?.token || req.headers.authorization?.split(' ').pop();

//     if(!token){
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const isBlackListed = await blacklistTokenModel.findOne({ token: token });

//     if(isBlackListed){
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const captain = await captainModel.findById(decoded._id);

//         req.captain = captain;
//         return next();
//     } catch (error) {
//         console.log('Auth error:', error.message);
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// }

// ye chatgpt ka code hai

const userModel = require('../models/user.models')
const captainModel = require('../models/captain.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.models')


module.exports.authUser = async (req, res, next) => {
    const token =
        req.cookies?.token ||
        (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
            ? req.headers.authorization.split(' ')[1]
            : null);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('Auth error:', error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};


module.exports.authCaptain = async (req, res, next) => {
    const token =
        req.cookies?.token ||
        (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
            ? req.headers.authorization.split(' ')[1]
            : null);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.captain = captain;
        next();

    } catch (error) {
        console.log('Auth error:', error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
