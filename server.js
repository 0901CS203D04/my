const express = require('express');
 const cors =  require('cors')
const app = express();
const bodyParser= require('body-parser');
const { swaggerServe, swaggerSetup } = require('./config');  
const { register } = require('./models');
app.set('view engine', 'ejs');
//  app.set('views', __dirname + '/views');
const { Product } = require('./models');

require('./models')


var corOption = {
    orgin:"http://localhost:3003/"
}
 app.use(cors(corOption));
 //middleware
 
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 app.get('/register', (req, res) => {
    res.render('registration');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/logins', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      // Find the user in the database based on the provided email and password
      const user = await register.findOne({ where: { email: email, password: password } });
  
      if (user) {
        // Render the login success page
        res.render('loginsuccess', { email });
      } else {
        // Render the login failure page
        res.render('loginfailure');
      }
    } catch (error) {
      console.error('Failed to perform login:', error);
      // Render an error page or redirect to an error route
      res.render('loginError');
    }
  });

  
  app.get('/home', (req, res) => {
    res.render('home');
  });

  
   // Define your allowed domain
const allowedDomain = 'example.com';

// Middleware function to validate the domain
function validateDomain(req, res, next) {
  const requestDomain = req.headers.host;

  // Check if the request is coming from the allowed domain
  if (requestDomain === allowedDomain) {
    // If the domain is valid, proceed to the next middleware or API route
    next();
  } else {
    // If the domain is not allowed, return an error response
    res.status(403).json({ error: 'Unauthorized domain' });
  }
}

// Use the validateDomain middleware for all API routes
app.use(validateDomain);

app.get('/api/check-domain', (req, res) => {
  res.json({ message: 'Domain is working' });
});

 
 app.use("/api-docs", swaggerServe, swaggerSetup); 

require("./routes/route")(app)
app.listen(3003,()=>{
    console.log('  hello manisha port is running on 3003')
})