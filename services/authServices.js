const User = require("../model/User");
const bcryptjs = require("bcryptjs")
const { HttpError } = require("../utils/HttpError");
const assignToken = require("../utils/assignTokens");


const registerService = async(body) => {
    const user = await User.findOne({
        email: body.email
    })
    if (user) {
        throw new HttpError(409, "email should be unique")
    }

    const hashpassword = await bcryptjs.hash(body.password, 12);
    const newUser = await User.create({
        ...body,
        password: hashpassword
    });
    return newUser
}

const loginService = async(body) => {
    const user = await User.findOne({
        email: body.email
    })
    if (!user) {
        throw new HttpError(401, "email or password aren't correct")
    }
    const isPasswordCorrect = await bcryptjs.compare(body.password, user.password) 
    if (!isPasswordCorrect) {
        throw new HttpError(401, "email or password aren't correct")
    }
    const {accessToken, refreshToken} = assignToken(user)

    await User.findByIdAndUpdate(user._id, {refreshToken})
    return accessToken
    
}

module.exports = {
    registerService,
}