require('dotenv').config()




const http = require('http')
const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const cors = require('cors');


const jobsRoutes = require('./routes/Jobs')
const authRoutes = require('./routes/auth');

//express app
const app = express();



app.use(express.json())


app.use((req, res, next) => {
    next()
})


app.use(cors());

app.use('/api', jobsRoutes)
app.use('/auth', authRoutes);




mongoose.connect(process.env.MONG_URI)
    //coonect to DB
    .then(() => {

        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT);
        });
    })
    .catch((error) => { console.log(error); })





