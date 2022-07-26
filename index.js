require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const PORT = process.env.PORT || 5000; 

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const noteRoute = require('./routes/note')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);

app.listen(PORT, console.log(`Listening on port ${PORT}`));