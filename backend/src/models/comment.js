import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = Schema({
    comment_id: { type: String, required: true },
    post_id: { type: String, required: true },
    commentor_id: { type: String, required: true },
    comment_content: { type: String, required: true },
    comment_time: { type: Date, required: true }, 
    likes: { type: Number, required: true }
},{
    collection: 'comments',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Comments', CommentSchema)

export default exportSchema