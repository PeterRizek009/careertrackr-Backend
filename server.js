require('dotenv').config()


const http = require('http')
const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const jobsRoutes = require('./routes/Jobs')

//express app
const app = express();



app.use(express.json())


app.use((req, res, next) => {
    next()
})

app.use('/api', jobsRoutes)



// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts("html")) {
//         res.sendFile(path.join(__dirname, "views", "404.html"))
//     } else if (req.accepts("json")) {
//         res.json({ message: "404 not found" })
//     } else {
//         res.type('txt').send("404 not found")
//     }
// })


mongoose.connect(process.env.MONG_URI)
    //coonect to DB
    .then(() => {

        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT);
        });
    })
    .catch((error) => { console.log(error); })





