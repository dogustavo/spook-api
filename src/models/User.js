const { Schema, model } = require('mongoose');
var crypto = require('crypto'); 

const BookSchema = require('./Book').schema;
const LocationSchema = require('./Location').schema;

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
    },
    salt: String,
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
    }],
    geometry: LocationSchema

}, {
    timestamps: true,
});

UserSchema.methods.setPassword = function(pass) { 
       this.salt = crypto.randomBytes(16).toString('hex');   
       this.password = crypto.pbkdf2Sync(pass, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
};

UserSchema.methods.validPassword = function(password) { 
    var variavel = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.password === variavel; 
}; 


module.exports = model('User', UserSchema);