const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5005;

app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Adjust this to your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    console.log('GET request to /'); 
    res.send('Server is up and running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
