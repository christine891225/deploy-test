import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostTagSchema = Schema({
    post_id: { type: String, required: true },
    tag_id: { type: String, required: true }
},{
    collection: 'post_tag'
})

const exportSchema = mongoose.model('PostTag', PostTagSchema)

export default exportSchema