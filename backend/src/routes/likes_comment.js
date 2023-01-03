import LikesComment from '../models/likes_comment.js'

exports.LikeComment = async (req, res) => {
    const body = req.body;

    const like = new LikesComment({
        comment_id: body.comment_id,
        user_id: body.user_id
    });

    try {
        const resp = await like.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.UnlikeComment = async (req, res) => {
    const body = req.body;

    try {
        const resp = await LikesComment
            .findOneAndDelete({ comment_id: body.comment_id, user_id: body.user_id });
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.GetLikesByCommentId = async (req, res) => {
    const id = req.query.comment_id;
    
    try {
        const info = await LikesComment
            .applyFindByCommentId(id);
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }   
}

exports.CountLikesByCommentId = async (req, res) => {
    const id = req.query.comment_id;

    try {
        const info = await LikesComment.count({ comment_id: id });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}