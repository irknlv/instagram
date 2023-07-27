const Comment = require('./Comment');
const CommentLike = require('./CommentLike');

const writeComment = async(req, res) => {
    if(req.body.content && req.body.content.length > 0){
        const refCom = await Comment.findByPk(req.body.refComId);
        if(refCom){
            await Comment.create({
                content: req.body.content,
                userId: req.user.id,
                postId: req.body.postId,
                refComId: refCom.id,
            })
            res.status(200).send({message: 'Комментарий создан'});
        } else{
            await Comment.create({
                content: req.body.content,
                userId: req.user.id,
                postId: req.body.postId,
            })
            res.status(200).send({message: 'Комментарий создан'});
        }
    } else {
        res.status(401).end()
    }
}

const deleteComment = async(req, res) => {
    const com = await Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    if(com){
        if(com.userId === req.user.id){
            const data = await Comment.destroy({
                where: {
                    id: req.params.id,
                }
            })
            res.status(200).send({message: 'Комментарий успешно удален!'})
        } else {
            res.status(401).send({message: 'Access forbidden!'})
        }
    } else {
        res.status(402).send({message: 'Комментарий не найден'})
    }
}

const getCommentsByPost = async(req, res) => {
    const comments = await Comment.findAll({
        where: {
            postId: req.params.id
        } 
    })
    if(comments){
        res.status(200).send(comments)
    } else {
        res.status(400).end()
    }
}

const likeComment = async(req, res) => {
    if(req.body.commentId){
        const comment = await Comment.findByPk(req.body.commentId)
        if(comment){
            const commentLike = await CommentLike.findOne({
                where: {
                    userId: req.user.id,
                    commentId: req.body.commentId,
                }
            })
            if(commentLike){
                res.status(401).send({message: 'Комментарий уже был лайкнут'})
            } else {
                await CommentLike.create({
                    userId: req.user.id,
                    commentId: comment.id,
                })
                res.status(200).send({message: 'Вы лайкнули комментарий'})
            }
        } else {
            res.status(402).send({message: 'Комментарий не найден'})
        }
    } else {
        res.status(403).send({message: 'Комментарий не найден'})
    }
}
const disLikeComment = async(req, res) => {
    if(req.body.commentId){
        const comment = await Comment.findByPk(req.body.commentId)
        if(comment){
            const commentLike = await CommentLike.findOne({
                where: {
                    userId: req.user.id,
                    commentId: req.body.commentId,
                }
            })
            if(commentLike){
                await CommentLike.destroy({
                    where: {
                        userId: req.user.id,
                        commentId: comment.id,
                    }
                })
                res.status(200).send({message: 'Вы убрали лайк'})
            } else {
                res.status(401).send({message: 'Комментарий и так не был лайкнут'})
            }
        } else {
            res.status(402).send({message: 'Комментарий не найден'})
        }
    } else {
        res.status(403).send({message: 'Комментарий не найден'})
    }
}
module.exports = {
    writeComment,
    deleteComment,
    getCommentsByPost,
    likeComment,
    disLikeComment,
}