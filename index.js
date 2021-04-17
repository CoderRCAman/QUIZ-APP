const express = require('express');
const port = 8000;
const app = express();
const path = require('path') //inbuilt node path used 
//set static folder ... is set so that we can execute those folder as soon as server
//is up   
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const Routes = require('./Routes/Routes');
app.use(body_parser());
app.use( body_parser.urlencoded({ extended: false }))
// parse application/json
app.use(body_parser.json())
app.use('/', Routes);
app.set('view engine', 'ejs'); 
app.use(express.static('Public'));
app.use('/css', express.static(__dirname + 'Public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.listen(port, () => {
    console.log("Server is up and running");
})
const DBUrl = 'mongodb+srv://Server:1234@cluster0.0ychj.mongodb.net/Server?retryWrites=true&w=majority'
//set up database
mongoose.connect(DBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database up and running');;
    }).catch(() => {
        console.log('Something went wrong');
    });

