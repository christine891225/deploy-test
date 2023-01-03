import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StatusSchema = Schema({
    status_id: { type: String, required: true },
    status_name: { type: String, required: true }
},{
    collection: 'status'
})

const exportSchema = mongoose.model('Status', StatusSchema)

export default exportSchema