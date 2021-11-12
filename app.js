const dotenv =  require('dotenv');
dotenv.config({path:'./config.env'});

const express = require('express');
const morgon = require('morgan')
const mongoose = require('mongoose');
const blogRoutes  = require('./routes/blogRoutes'); 

//Express app
const app = express();

//Connect to MongoDb
const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));


//Register view Engine
app.set('view engine','ejs');


//-------------------------------------listen for requests------------
//app.listen(3000);

//--------------------------Middleware and static files------------

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgon('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.get('/',(req,res) =>{
    res.redirect('/blogs');
});



app.get('/about',(req,res)=>
{
    res.render('about',{title:'About'});
});

// ---------------------------------Blog routes
app.use('/blogs',blogRoutes);

//--------------------------------------------404 page

// It must be present at the bottom as it does not check url it automatically displays 404.html

app.use((req,res)=>
{
    res.status(404).render('404',{title:'404'});
});