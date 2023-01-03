import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LikesPostSchema = Schema({
    post_id: { type: String, required: true },
    user_id: { type: String, required: true }
},{
    collection: 'like_post'
})

const exportSchema = mongoose.model('LikesPost', LikesPostSchema)

export default exportSchema