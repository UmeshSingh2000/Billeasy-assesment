const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const config = require('./DBConfig/config');
const accountRoutes = require('./Routes/accountRoutes');
const bookRoutes = require('./Routes/bookRoutes');

//database connection
config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/',(req,res)=>{
    res.json({message:'Server is running!'});
})
app.use('/api',accountRoutes) // Account routes
app.use('/api',bookRoutes) // Book routes

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})