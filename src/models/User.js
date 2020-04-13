const { Schema, model } = require('mongoose');
const crypto = require('crypto')

const BookSchema = require('./Book').schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
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
    book: BookSchema,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]

}, {
    timestamps: true,
});

module.exports = model('User', UserSchema);