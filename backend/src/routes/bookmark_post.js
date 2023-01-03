import BookmarkPost from "../models/bookmark_post.js";
import Post from "../models/posts.js";

exports.GetBookmarkPostByUserIdPostId = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;

    try {
        const info = await BookmarkPost
            .findOne({
                post_id: p_id,
                user_id: u_id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CreateBookmarkPost = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;

    const bookmark = new BookmarkPost({
        post_id: p_id,
        user_id: u_id
    });

    const add_bookmark = await Post.findOneAndUpdate({ post_id: p_id }, { $inc: { bookmarks: 1 } });

    try {
        const resp = await bookmark.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.DeleteBookmarkPost = async (req, res) => {
    const p_id = req.query.post_id;
    const u_id = req.query.user_id;

    const remove_bookmark = await Post
        .findOneAndUpdate({ post_id: p_id }, { $inc: { bookmarks: -1 } });

    try {
        const resp = await BookmarkPost
            .findOneAndDelete({
                post_id: p_id,
                user_id: u_id
            });
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CountBookmarkPostByUserId = async (req, res) => {
    const id = req.query.user;

    try {
        const info = await BookmarkPost
            .count({
                user_id: id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CountBookmarkByPostId = async (req, res) => {
    const id = req.query.post_id;

    try {
        const info = await BookmarkPost
            .count({
                post_id: id
            });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.GetBookmarkPostByUserId = async (req, res) => {
    const id = req.query.user_id;

    try {
        const info = await BookmarkPost
            .find({
                user_id: id
            });
        const postIds = info.map((item) => item.post_id);
        let posts = [];
        for (let i = 0; i < postIds.length; i++) {
            console.log("hi");
            let tmp = await Post.findOne({
                post_id: postIds[i]
            });
            posts.push(tmp);
        }
        res.status(200).send({ message: 'success', contents: posts });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

