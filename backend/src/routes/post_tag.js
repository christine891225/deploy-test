import PostTag from '../models/post_tag'

exports.GetPostTagsByPostId = async (req, res) => {
    const id = req.query.post_id;

    try {
        const info = await PostTag.applyFindByPostId(id);
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CreatePostTag = async (req, res) => {
    const body = req.body;

    const postTag = new PostTag({
        post_id: body.post_id,
        tag_id: body.tag_id
    });

    try {
        const resp = await postTag.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.DeletePostTag = async (req, res) => {
    const p_id = req.query.post_id;
    const t_id = req.query.tag_id;

    try {
        const resp = await PostTag
            .findOneAndDelete({
                post_id: p_id,
                tag_id: t_id
            });
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}


