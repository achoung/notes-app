const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const noteRoute = require('./routes/noteRoute');
const userRoute = require('./routes/userRoute');
const config = require('./config').get(process.env.NODE_ENV);

// setup express
const app = express();
app.use(express.json()); // parse json body

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    maxAge: 86400, // 24 hours
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions)); // enable CORS
app.use(morgan('tiny')); // enhance api request logging

// routes
app.use('/api/notes', noteRoute);
app.use('/api/users', userRoute);

// connect to MongoDB
mongoose.connect(config.MONGO_DB_URL, {}, (err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MongoDB');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// listen to port connection
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port', port);
});
