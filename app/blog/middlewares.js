// const Post = require('./models/Post')
// const validateResume = (req, res, next) => {
//     let errors = {};

//     if(!req.body.first_name || req.body.first_name.length === 0)
//         errors.first_name = "Поле Имя не заполнено"
//     if(!req.body.last_name || req.body.last_name.length === 0)
//         errors.last_name = "Поле Фамилия не заполнено"
//     if(!req.body.phone || req.body.phone.length === 0)
//         errors.phone = "Поле Телефон не заполнено"
//     if(!req.body.position || req.body.position.length === 0)
//         errors.position = "Поле Желаемая должность не заполнено"
//     if(!req.body.about || req.body.about.length === 0)
//         errors.about = "Поле О себе не заполнено"

//     if(JSON.stringify(errors) !== JSON.stringify({}))
//         res.status(400).send(errors)
//     else next()
// }

// const isResumeAuthor = async (req, res, next) =>{
//     const id = req.params.id || req.body.id

//     const resume = await Resume.findByPk(id)
//     if(!resume) res.status(400).send({message: "Resume with that id is not exist"})
//     else if(req.user.id === resume.userId) next();
//     else res.status(403).send({message: "Access forbidden"})
// }

// module.exports = {
//     validateResume,
//     isResumeAuthor
// }