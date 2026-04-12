// require('dotenv').config();


// const express = require('express');
// const cors = require('cors')
// const connectToDb = require('./db/database');
// const userRoutes = require('./routes/user.routes');
// const cookieparser = require('cookie-parser')
// const captainRoutes = require("./routes/captain.routes")

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));
// app.use(cookieparser());

// connectToDb();


// app.get('/', (req,res) => {
//     res.send('Hello World')
// })
// app.use('/users', userRoutes);
// app.use('/captain', captainRoutes);


// module.exports = app;


require('dotenv').config();

const express = require('express');
const cors = require('cors'); // CORS package include kiya
const connectToDb = require('./db/database');
const userRoutes = require('./routes/user.routes');
const cookieparser = require('cookie-parser');
const captainRoutes = require("./routes/captain.routes");

const app = express();

// Database connection
connectToDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// CORS Setup: Is se aapka frontend backend se connect ho payega
app.use(cors({
    origin: 'https://nexride-backend-production-0d4e.up.railway.app', // '*' ka matlab hai ke abhi kisi bhi URL se request accept hogi (deployment ke liye best hai)
    credentials: true
}));

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello World - NEXride Backend is Live!');
});

// API Routes
app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

module.exports = app;
