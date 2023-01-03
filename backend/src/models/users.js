import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
    user_id: { type: Schema.ObjectId, auto: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true},
    user_password: { type: String, required: true },
    is_ntuim: { type: Boolean, required: true },
},{
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Users', UserSchema)

export default exportSchema