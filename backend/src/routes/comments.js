import Comment from "../models/comment.js";

exports.GetCommentsByPostId = async (req, res) => {
  const id = req.query.post_id;

  try {
    console.log(id);
    const info = await Comment.find({ post_id: id });
    res.status(200).send({ message: "success", contents: info });
  } catch (error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};


exports.CreateComment = async (req, res) => {
  const body = req.body;

  console.log(body);
  const comment = new Comment({
    comment_id : body.comment_id,
    post_id : body.post_id,
    commentor_id : body.commentor_id,
    comment_content : body.comment_content,
    comment_time : body.comment_time,
    likes : body.likes
  });
  try {
    const resp = await comment.save();
    res.status(200).send({ message: "success", contents: resp });
  } catch(error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};


exports.UpdateComment = async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const resp = await Comment.findOneAndUpdate({ comment_id: body.comment_id }, 
      { comment_content: body.comment_content, comment_time: body.comment_time, likes: body.likes },
      { new: true });
    console.log(resp);
    res.status(200).send({ message: "success", contents: resp });
  } catch(error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};

exports.DeleteComment = async (req, res) => {
  const id = req.query.comment_id;
  try {
    const resp = await Comment.findOne({ comment_id: id }).remove();
    res.status(200).send({ message: "success", contents: resp });
  } catch(error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};
