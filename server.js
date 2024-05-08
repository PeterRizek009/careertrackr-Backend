require('dotenv').config()



const express = require('express');
const mongoose = require('mongoose');

const jobsRoutes = require('./routes/Jobs')

//express app
const app = express();



app.use(express.json())


app.use((req, res, next) => {
    next()
})

app.use('/api', jobsRoutes)






mongoose.connect(process.env.MONG_URL)
    //coonect to DB
    .then(() => {

        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT);
        });
    })
    .catch((error) => { console.log(error); })





