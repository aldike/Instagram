const Post = require('./models/Post')
const validatePost = (req, res, next) => {
    let errors = {};

    if(!req.body.description || req.body.description.length === 0)
        errors.description = "Описание не заполнено"
    if(!req.body.media || req.body.media.length === 0)
        errors.media = "Ссылка не заполнена"

    if(JSON.stringify(errors) !== JSON.stringify({}))
        res.status(400).send(errors)
    else next()
}

const isPostAuthor = async (req, res, next) =>{
    const id = req.params.id || req.body.id

    const post = await Post.findByPk(id)
    if(!post) res.status(400).send({message: "Post with that id is not exist"})
    else if(req.user.id === post.creatorId) next();
    else res.status(403).send({message: "Access forbidden"})
}

module.exports = {
    validatePost,
    isPostAuthor
}