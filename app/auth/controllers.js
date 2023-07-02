const sendEmail = require('../utils/sendMail')
const AuthCode = require('./AuthCode')
const User = require('./User')
const sendVerificationEmail = (req, res) =>{

    const code = "INST"+Date.now()

    AuthCode.create({
        email: req.body.email,
        code: code,
        valid_till: Date.now() + 120000
    })
    sendEmail(req.body.email, "Код авторизации instagram", code)

    res.status(200).end();
}
const verifyCode = async(req, res) => {
    const authCode = await AuthCode.findOne({where: {email: req.body.email}, order: [['valid_till', 'DESC']]})
    if(!authCode){
        res.status(401).send({error: "Invalid code"});
    }else if(new Date(authCode.valid_till).getTime() < Date.now()){
        console.log(new Date(authCode.valid_till).getTime() , Date.now());
        res.status(401).send({error: "Code expired"});
    }else if(authCode.code !== req.body.code){
        res.status(401).send({error: "Invalid code"});
    }else{
        const user = await User.create({
            email: req.body.email
        })
        res.status(200).send(user);
    }
    
}

module.exports = {
    sendVerificationEmail,
    verifyCode
}