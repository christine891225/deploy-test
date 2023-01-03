import Posts from "../models/posts.js";

exports.GetPosts = async (req, res) => {
  try {
    const info = await Posts.find();
    res.status(200).send({ message: "success", contents: info });
  } catch (error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};  

exports.SearchPosts = async (req, res) => {
  const search = req.query.search;
  const regex = new RegExp(search, "i");

  try {
    const info = await Posts.find({ $or: [ { post_name: regex }, { post_content: regex }, { post_intro: regex }, { tags: regex } ] });
    res.status(200).send({ message: "success", contents: info });
  } catch (error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};

exports.GetPostById = async (req, res) => {
    const id = req.query.post_id;
  
    try {
      console.log(id);
      const info = await Posts.find({ post_id: id }); 
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsByName = async (req, res) => {
  const name = req.query.post_name;

  try {
    console.log(name);
    const info = await Posts.find({ post_name: name });  //change to in
    res.status(200).send({ message: "success", contents: info });
  } catch (error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};

exports.GetPostsByContent = async (req, res) => {
    const content = req.query.post_content;
  
    try {
      console.log(content);
      const info = await Posts.find({ post_content: content });  //change to in
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsByCategoryId = async (req, res) => {
    const category = req.query.category_id;

    try {
      console.log(category);
      const info = await Posts.find({ category_id: category });  //change to in
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.CountPostsByAuthorId = async (req, res) => {
    const author = req.query.author_id;

    try {
      const info = await Posts.count({ author_id: author });
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsByAuthorId = async (req, res) => {
    const author = req.query.author_id;

    try {
      console.log(author);
      const info = await Posts.find({ author_id: author }); 
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsBySemester = async (req, res) => {
    const semester = req.query.semester;
    
    try {
      console.log(semester);
      const info = await Posts.find({ semester: semester });  //change to in
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsByStatus = async (req, res) => {
    const status = req.query.status_id;

    try {
      console.log(status);
      const info = await Posts.find({ status_id: status });  //change to in
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };

exports.GetPostsByTagId = async (req, res) => {
    const tag = req.query.tag_id;

    try {
      console.log(tag);
      const info = await Posts.find({ tag_id: tag });  //change to in
      res.status(200).send({ message: "success", contents: info });
    } catch (error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  };


exports.CreatePost = async (req, res) => {
  const body = req.body;

  console.log(body);
  if (body.post_name === '' || body.post_intro === '' || body.post_content === '' || body.semester === -1) {
      res.status(200).send({ message: "內容未填寫完整", contents: [] });
  }
  else{
    const post = new Posts({
      post_name : body.post_name,
      post_date : body.post_date,
      post_intro : body.post_intro,
      post_content : body.post_content,
      author_id : body.author_id,
      semester : body.semester,
      category_id : body.category_id,
      status_id : body.status_id,
      views : body.views,
      bookmarks : body.bookmarks,
      likes : body.likes,
      comments : body.comments,
      tags : body.tags,
      contact : body.contact
    });
    try {
      const resp = await post.save();
      res.status(200).send({ message: "success", contents: resp });
    } catch(error) {
      res.status(403).send({ message: "error", contents: [] });
    }
  }
};


exports.UpdatePost = async (req, res) => {
  const body = req.body;

  try {
    const resp = await Posts.updateOne({ post_id: body.post_id }, {
      post_name : body.post_name,
      post_intro : body.post_intro,
      post_content : body.post_content,
      semester : body.semester,
      category_id : body.category_id,
      status_id : body.status_id,
      tags : body.tags,
      contact : body.contact
    });
    res.status(200).send({ message: "success", contents: resp });
  } catch(error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};

exports.DeletePost = async (req, res) => {
  const id = req.query.post_id;

  try {
    const resp = await Posts.deleteOne({ post_id: id });
    res.status(200).send({ message: "success", contents: resp });
  } catch(error) {
    res.status(403).send({ message: "error", contents: [] });
  }
};
