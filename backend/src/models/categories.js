import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CategorySchema = Schema({
    category_id: { type: String, required: true },
    category_name: { type: String, required: true }
},{
    collection: 'category',
})

const exportSchema = mongoose.model('Categories', CategorySchema)

export default exportSchema