const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const user = require('./routes/user');
const book = require('./routes/book');
const authMiddleware = require('./middleware/auth');

const app = express();

mongoose.connect('mongodb+srv://spook:spook@cluster0-7tykh.mongodb.net/spook?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors());

app.use(express.json());

app.use('/user', user);

app.use('/book', authMiddleware, book);
 
app.listen(process.env.PORT || 3001);