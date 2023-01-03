import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = Schema({
    post_id: { type: Schema.ObjectId, auto: true },
    post_name: { type: String, required: true },
    post_date: { type: Date, required: true },
    post_intro: { type: String, required: true },
    post_content: { type: String, required: true },
    author_id: { type: Schema.ObjectId, required: true },
    semester: { type: Number, required: true },
    category_id: { type: Number, required: true },
    status_id: { type: Number, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
    bookmarks: { type: Number, required: true },
    comments: { type: Number, required: true },
    tags: { type: Array, required: false },
    contact: { type: String, required: false },
},{
    collection: 'posts',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Posts', PostSchema)

export default exportSchema