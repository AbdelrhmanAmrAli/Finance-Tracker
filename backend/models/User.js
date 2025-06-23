const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

//hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bycrypt.genSalt(10);
            this.password = await bycrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});


//compare the passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bycrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};
 

const User = mongoose.model('User', userSchema);

module.exports = User;
