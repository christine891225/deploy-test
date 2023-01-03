import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TagSchema = Schema({
    tag_id: { type: String, required: true },
    tag_name: { type: String, required: true }
},{
    collection: 'tag'
})

const exportSchema = mongoose.model('Tags', TagSchema)

export default exportSchema