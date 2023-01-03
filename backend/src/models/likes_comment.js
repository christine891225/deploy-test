import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LikesCommentSchema = Schema({
    comment_id: { type: String, required: true },
    user_id: { type: String, required: true }
},{
    collection: 'like_comment'
})

const exportSchema = mongoose.model('LikesComment', LikesCommentSchema)

export default exportSchema