const db = require("../models/index");
const register = db.register
const sendVerificationEmail = require('./sendmail');
const forgetpassword = require('./foretpasswordmail')
const authMiddleware = require('./middleware');
const authentication = require("./authenticate")
const randtoken = require("rand-token");
const jwtSec = 'cfcffgcgvgvgvgcgrddfcfgmnjnhjhjrdrcfdcfdddfdferwewefcfcfggfcgfcfcffcfcf'

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const product = require("../models/product");

const menu = db.MenuItem ;
const Product = db.product;
// const e = require("express");

function otp() {
  const characters = '0123456789';
  const codeLength = 6;
  let emailVerificationToken = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    emailVerificationToken += characters[randomIndex];
  }

  return emailVerificationToken;
}

// function genratetoken(n) {
//   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   var token = '';
//   for(var i = 0; i < n; i++) {
//       token += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return token;
// }

// function genratetoken(length = 20){
//   const tokens = crypto.randomBytes(length).toString('hex');
//   return tokens;
//   console.log(tokens);
// }
exports.register = async (req, res) => {

  try {
    const { email, password } = req.body;

    // const  {user_img} = req.file.filename;


    const hashedPassword = await bcrypt.hash(password, 10);

    const emailVerificationToken = otp();
    console.log(emailVerificationToken);


    const newUser = await register.create({
      email: email,
      password: hashedPassword,
      // user_img: req.file.filename,
      emailVerificationToken: emailVerificationToken,
      

    })

    sendVerificationEmail(email, emailVerificationToken);
    //   console.log(sendVerificationEmail)

    res.json({ message: 'Registration successful. Please check your email for verification.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }



}

// exports.verifyuser= async(req,res) =>{

//     try{
//         console.log("hcxkgjc")

//         const { emailVerificationToken} = req.params;
//         console.log(emailVerificationToken);
//         const user = await register.findOne({ where: {  emailVerificationToken: emailVerificationToken} });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid verification code.' , user:user  });



//        register.emailVerified = true;
//        console.log(emailVerified);
//       register.emailVerificationToken = null;
//       await register.save();
//           }


//        return  res.json({ message: 'Email verification successful.' });

//     }catch{
//         console.error(error);
//       res.status(500).json({ error: 'An error occurred during email verification.' });

//     }
// }

exports.verifyusers = async (req, res) => {
  try {

    const { emailVerificationToken } = req.params;
    console.log(emailVerificationToken);
    const user = await register.findOne({ where: { emailVerificationToken: emailVerificationToken } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification code.', user: user });
    }

    else {
      await register.update(
        {
          emailVerified: true,
          emailVerificationToken: null
        },

        {
          where: {
            emailVerificationToken
          }
        }
      )
    }

    return res.json({ message: 'Email verification successful.' });
  } catch (e) {
    return res.json({ message: 'Email verification successful.' + e.message });

  }
}

exports.login = async (req, res) => {
  try {
    //console.log("bhjvmh")
    const { email, password } = req.body;
    console.log(email, password)
    const user = await register.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    //console.log(passwordMatch)


    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const tokens = jwt.sign({ user: user }, jwtSec, { expiresIn: '1h' });
    await register.update(
      {

        tokens: tokens
      },

      {
        where: {
          email: email
        }
      }
    )


    // await user.save();
    //console.log(user);

    res.json({ tokens });
    //console.log(token)



  } catch (error) {

    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
}




exports.getUserInfo = async (req, res) => {

  try {

    const { userdata } = req.body;
    console.log(userdata)

    const user = await register.findByPk(userdata.user.user_id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

     return res.json({ user });


  } catch {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the user.' });
  }

}








exports.products  = async (req , res) => {
  try{
    console.log("vsdbcvbds  sdvcbd")

// const{product} = req.body;

// const products = await product.findByPk(productdata.product.id, { attributes: { exclude: ['password'] } });
// if(!product){
//   return res.json({msg:"product not found"})
// }

// return res.status(200).send({Data:product})

const {product_id}  = req.params;
const products = await Product.findByPk(product_id);
    res.json(products);

 }catch{

    ({error:"there are some error"})
  }
}




exports.addproduct = async (req, res) => {
  try {
    console.log("hngcfjg")
  


    const { name, price, description } = req.body;
    //const user = await register.findOne({ where: { email: email } });



    // console.log(name,price,description)
    const product = await Product.create({
      name: name,
      price: price,
      description: description,
      product_img: req.file.filename,
      
    });
    console.log(product)
    const tokens = jwt.sign({ product: product }, jwtSec);

    await product.update(
      {

        tokens: tokens
      },

      {
        where: {
         name : name
        }
      }
    )
    console.log(tokens);








    //  const product = await products.create({ 
    //   name:name,
    //    price:price,
    //     description:description });
    //     console.log(product)
    return res.json({ product });

  } catch {

    console.error('Error ', error);
    res.status(500).json({ error: 'an error' });
  }
}

exports.forget_password = async (req, res) => {
  try {

    const { email } = req.body
    console.log(email)
    const user = await register.findOne({
      where: {
        email: email
      }
    })
    // console.log(user)
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const token = randtoken.generate(20);
    console.log(token)
    await register.update(
      {

        token: token
      },

      {
        where: {
          email: email
        }
      }
    )

    forgetpassword(email, token);

    res.json({ message: ' mail send succesufully' });

  } catch {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
}
exports.resetpassword = async (req, res) => {
  try {

    const token = req.query.token;
    console.log(token)
    const password = req.body.password;

    console.log(password)
    

    const user = await register.findOne({
      where: {
        token: token
      }
    })
    console.log(user)

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    await register.update(
      {

        token: null,
        password: hashedPassword
      },

      {
        where: {
          token: token
        }
      }
    )

    return res.json({ message: 'password reset successful.' ,});


  } catch {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during reset password.' });

  }
}


exports.refresh_token = async (req, res) => {
  try {
    console.log("vnc")
    const tokens = req.body.tokens;
   // console.log(tokens)
   // const user = await register.findOne({
     // where: {
     //   tokens: tokens
    //  }
    //})
    /*
    const user = await register.findOne({where:{
      tokens:tokens,
      
    }})
    console.log(user)
    */


    const user = await register.findOne({ where: { tokens: tokens } });
    console.log(user);

    
    console.log(user)
    if (!user) {
      return res.json({ meassage: "invalid user" });
    }

    const new_token = jwt.sign({ user: user }, jwtSec, { expiresIn: "1h" })
    console.log(new_token)
    await register.update(
      {

        tokens: new_token,

      },

      {
        where: {
          tokens: tokens
        }
      }
    )
    

    return res.json({ msg: "refreshtoken succesfully" })

  } catch {

    console.error(error);
    res.status(500).json({ error: 'An error occurred during reset password.' });
  }
}
exports.resend_otp = async (req, res) => {
  try {
    const email = req.body.email

    const user = await register.findOne({ where: { email } });
    if (!user) {
      return res.json({ msg: "user not found" })
    }
    const new_otp = otp();
    await register.update(
      {

        emailVerificationToken: new_otp,

      },

      {
        where: {
          email: email
        }
      }
    )
    return res.json({ msg: "send otp succesfully" });


  } catch {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during reset password.' });

  }
}

exports.update_profile = async (req, res) => {

  try {
  //  const user_id = req.params;
    //console.log(user_id)
    
    const { userdata } = req.body;
    console.log(userdata)
    const { email } = req.body;
    //console.log(email);

    const user = await register.findByPk(userdata.user.user_id);
    console.log("bhcfxhg")
    //console.log(user)
    if (!user) {
      return res.json({ msg: "user not found" })

    }

    await register.update(
      {
        email : email,
        user_img: req.file.filename
      },
      {
        where: {
          user_id: userdata.user.user_id
        }
      }
    )


    return res.json({ msg: "image updated succesfully" })


  } catch {

    console.error(error);
    res.status(500).json({ error: 'An error occurred during reset password.' });
  }
}
exports.all_product = async(req,res) =>{
  try{

   // const products = await Product.findAll();

    const {  price,   page , limit  } = req.query;
    console.log(price);
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (price) {
      whereClause.price  = price;
    }
    
    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.json(products);


  }catch{
    res.status(500).json({ error: 'An error ' });


  }
}

exports.update_password = async(req,res)=>{
  try{
    const {  currentPassword, newPassword } = req.body;
    const { userdata } = req.body;
   // console.log(userdata.user.user_id)
    

    const user = await register.findByPk(userdata.user.user_id);
    //console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Generate a hash for the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword)

    await register.update(
      {
        password : hashedPassword
      },
      {
        where: {
          user_id: userdata.user.user_id
        }
      }
    )

    
    
    return res.json({msg:"updated sucessfully"})

  }catch{

  }
}

exports.registers = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user is already registered
    const existingUser = await register.findOne({ where: { email: email } });

    if (existingUser) {
      // Render the "Already Registered" page
      res.render('alreadyRegistered', { email: email });
    } else {
      const user = await register.create({
        email: email,
        password: password,
      });

      // Render the registration success page
      res.render('registrationSuccess', { email: email });
    }
  } catch (error) {
    console.error('Failed to save registration:', error);
    // Render an error page or redirect to an error route
    res.render('registrationError');
  }
};

// exports.logins = async(req,res)=>
// {
//   const email = req.body.email;
//   const password = req.body.password;


//   try{
//     const user = await register.findOne({ where: { email: email, password: password } });

//     console.log(user)
//     if (user) {
//       // Render the login success page
//       res.render('loginsuccess', { email });
//     } else {
//       // Render the login failure page
//       res.render('loginfailure');
//     }

//   }catch(error){

//     console.error('Failed to save registration:', error);
//     // Render an error page or redirect to an error route
//     res.render('registrationError');

//   }
// }
exports.add_menu = async(req,res)=>{
  const { cardNumber, author, title, description, tag } = req.body;

  // Validate required fields
  if (!cardNumber || !title) {
    return res.status(400).json({ error: 'Card number and title are required' });
  }

  const newItem = new menu(cardNumber, author, title, description, tag);
  menu.push(newItem);

  res.status(201).json(newItem)
}