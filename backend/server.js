require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter=require('./routes/authRoutes')
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
        origin:'http://localhost:5173',
        credentials:true}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));

app.use('/',authRouter);


const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server has started on port ${port}`);
});