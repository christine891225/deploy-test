import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookmarkPostSchema = Schema({
    post_id: { type: String, required: true },
    user_id: { type: String, required: true }
}, {
    collection: "bookmark_post"
});

const exportSchema = mongoose.model("BookmarkPost", BookmarkPostSchema);

export default exportSchema;