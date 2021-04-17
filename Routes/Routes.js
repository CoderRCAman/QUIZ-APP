const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const querystring = require('querystring');
//login page or default page
Router.get('/', (req, res, next) => {
    return res.render('login', {error: ''});
    next();
})
//sign in
Router.post('/', (req, res) => {
     //if user  leaves empty body 
     if ( req.body.email === '' || req.body.pass === '') {
        return res.render('login', {error :  "Missing Details"});
         console.log("Executed");
    }
    const { email, pass } = req.body; 
    User.findOne({ email: email }, (err,user) => {
        if (err||!user) {
            res.render('login', { error: "Credentials Didnt Match" });
        }
        else {
            if (pass === user.password) {
               //take to the main page
               const query = querystring.stringify({
                "name": user.name,
                "email": user.email,
                "score": user.score,
            })
             res.redirect('/home/?' + query);
            }
            else {
                res.render('login', { error: "Credentials Didnt Match" });  
            }
        }
    })
    console.log(req.body);  
})
//render signup page
Router.get('/signup', (req, res) => {
   return res.render('signup', { error: '' });
})
//signup route
Router.post('/signup', (req, res) => {
    console.log(req.body);
    //if user  leaves empty body 
    if (req.body.name === '' || req.body.email === '' || req.body.pass === '') {
       return res.render('signup', {error :  "Missing Details"});
        console.log("Executed");
    }
    const userbody = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
        score : 0
    }
    var user = new User(userbody);  
    User.findOne({ email: req.body.email }, (err, response) => {
        if (response) {
            return res.render('signup', { error: "Email already Exist" });
        }
        else {
            user.save((err, response) => {
                if (err || !response) {
                    return res.redirect('signup');
                }
                else {
                    const query = querystring.stringify({
                        "name": response.name,
                        "email": response.email,
                        "score": response.score
                    })
                    return res.redirect('/home/?' + query);
                }
            })
        }
    })
})
//Log Out Route
Router.get('/logout', (req, res) => {
    return res.redirect('/');
})
//Route to visit profile
Router.get('/profile', (req, res) => {
    console.log(req.query);
    User.findOne({email:req.query.email}, (err,user) => {
        if (err) {
            return res.status(400).json({
                Err: "Server is Down"
            })
        }
        else {
            console.log(user);
                const profile = {
                    name: user.name,
                    email: user.email,
                    score:user.score
                }
               
                 return res.render('profile',{profile : profile});
            }
    })
   
})
//Home route or main quiz page route
Router.get('/home', async(req, res) => {
    console.log(req.query);
   

    try {
        const quizTook = User.findOne({ 'email': req.query.email });
        const profile = {
            name: req.query.name,
            email: req.query.email,
            score: req.query.score,
            quizTook : quizTook
        }
        console.log(profile)
        return  res.render('index' ,{profile:profile});
    } catch (error) {
        console.log("error");
    }
 
})

//update score 
Router.post('/updatescore', (req,res) => {
    console.log(req.body);
    const { email, score } = req.body; 
    User.findOne({ email: email }, (err,user) => {
        if (err || !user) {
            console.log("ERRRRR");
            return res.status(400).json({
                err : "SERVER DOWN"
            })
        }
        else {
            console.log("popo")
            const points = parseInt(score) + parseInt(user.score)
            user.score = points;
            user.save();
        }
    })
})

// Take to qit 
Router.get('/qit', (req,res) =>{
   // console.log(req.query);
    const profile = {
        name: req.query.name,
        email: req.query.email,
        score: req.query.score,
    }
    res.render('ITquiz', { profile: profile });
})
// Take to qih 

Router.get('/qih', (req,res) => {
    const profile = {
        name: req.query.name,
        email: req.query.email,
        score: req.query.score,
    }
    res.render('IHquiz', { profile: profile });
})

// take to qwg 
Router.get('/qgw', (req,res) => {
    const profile = {
        name: req.query.name,
        email: req.query.email,
        score: req.query.score,
    }
    res.render('GWquiz', { profile: profile });
})

module.exports = Router;