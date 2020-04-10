const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const BookSchema = require('./Book').schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true  
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    avatar: String,
    book: BookSchema

}, {
    timestamps: true,
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = model('User', UserSchema);