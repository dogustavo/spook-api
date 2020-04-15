const { Schema, model } = require('mongoose');

const LocationSchema = new Schema({
    type: {
        type: String,
        defautl: "Point"
    },
    coordinates:{
        type: [Number],
        index: '2dsphere'
    }
});



module.exports = model('Location', LocationSchema);