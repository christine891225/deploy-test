import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const UserSchema = Schema({
    user_id: { type: Schema.ObjectId, auto: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true},
    user_password: { type: String, required: true },
    is_ntuim: { type: Boolean, required: true },
},{
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.user_password, (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
})

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('user_password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.user_password, salt, (err, hash) => {
            if (err) return next(err);
            user.user_password = hash;
            next();
        });
    });
});

const exportSchema = mongoose.model('Users', UserSchema)

export default exportSchema