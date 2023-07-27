
const isAuthor = async(req, res, next) => {
    const id = req.body.id || req.params.id
    const post = await Post.findByPk(id);
    if(!post){
        res.status(400).send({message: 'Post does not exist'})
    } else if(req.user.id === post.userId){
        next();
    } else {
        res.status(403).send({message: 'Access forbidden'})
    }
}

module.exports = {isAuthor};