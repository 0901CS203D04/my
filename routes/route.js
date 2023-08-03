const controller = require("../controller/usercontroller")
const multer = require('multer');
const path= require('path');

const authMiddleware = require("../controller/middleware");
const authentication = require("../controller/authenticate")
// const { syncBuiltinESMExports } = require("module");

var liverurlnew = './src/image';
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        if(file.fieldname == 'user_img'){
            cb(null,liverurlnew+"/user_img")
        }
        if(file.fieldname == 'product_img'){
            cb(null,liverurlnew+"/product_img")
        }  
    },
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})
module.exports = function(app){
    app.post('/registration', controller.register);
    // app.get('/verifyuser/:emailVerificationToken',controller.verifyuser);
    app.post('/verifyusers/:emailVerificationToken',controller.verifyusers);
   app.post('/login',controller.login);
   app.post('/getuser', authMiddleware, controller.getUserInfo);
app.post('/add_product',upload.single('product_img'),controller.addproduct)
app.post('/forgetpassword',controller.forget_password);
app.post('/resetpassword',controller.resetpassword);
app.post('/refresh_token',controller.refresh_token);
app.post('/resendotp',controller.resend_otp);
app.post('/update_profile',upload.single('user_img'),authMiddleware,controller.update_profile);
app.get('/get_product/:product_id',authentication,controller.products);
app.get('/get_all',controller.all_product);
app.post('/register',controller.registers)
// app.post('/Logins',controller.logins)
app.post('/update_password',authMiddleware,controller.update_password);
    
app.post('/menu',controller.add_menu)
}