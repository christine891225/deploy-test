import LikesPost from '../models/likes_post.js'
import Posts from '../models/posts.js'

exports.LikePost = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;
    const like = new LikesPost({
        post_id: p_id,
        user_id: u_id
    });
    const add_like = await Posts.findOneAndUpdate({ post_id: p_id }, { $inc: { likes: 1 } });
    try {
        const resp = await like.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.UnlikePost = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;
    const remove_like = await Posts.findOneAndUpdate({ post_id: p_id }, { $inc: { likes: -1 } });
    try {
        const resp = await LikesPost
            .findOneAndDelete({
                post_id: p_id,
                user_id: u_id
            });
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.GetLikesByPostId = async (req, res) => {
    const id = req.query.post_id;

    try {
        const info = await LikesPost
            .count({
                post_id: id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}


exports.CountLikesByUserId = async (req, res) => {
    const id = req.query.user_id;

    try {
        const info = await LikesPost
            .count({
                user_id: id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.GetLikesPostsByUserIdPostId = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;

    try {
        const info = await LikesPost
            .findOne({
                post_id: p_id,
                user_id: u_id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}