const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongobd
const dbURI = 'mongodb+srv://timotech:692591408022006@cluster0.xkmyrxc.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err))
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }); (to remove deprecation warnings)

// register view engine (view engines let us write html templates in html syntax that allows us to input dynamic data which includes express handlebars, pug, ejs(embedded javascript templating))
app.set('view engine', 'ejs');
app.set('views', 'pages');

// app.use((req, res, next) => {
//     console.log('New request made');
//     console.log(`host: ${req.hostname}`);
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('In the next middleware');
//     next();
// });
// after running this middleware, express doesn't know how to automatically move on to the next function until it is explicitly stated with the next function

// 3rd party middleware - morgan
// middleware & static files
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')); // specifying files that should be accessible on the browser

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save() // saves the blog in the collection
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find() // gets all the documents inside the collection
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('64ce2ea5b5861cffea3305a5') // gets a single document inside the collection
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// });

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About</p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});

// Middleware is a code that runs on the server (i.e. a code that runs between getting a request and sending a response).


// Mongoose - it is an ODM (Object Document Mapping) library. It wraps the standard mongodb api and it provides us with a much easier way to connect to the database
// Schemas define the structure of a type of data/document
// Models allow us to communicate with database collection. It is created based on the schema

// Request types - get (request to get data), post (request to create new data), delete (request to delete data), put (request to update data)

// MVC - Model, View, Controller - it is a way of structuring our code and files
// Controller is a middleman that passes data from models into views