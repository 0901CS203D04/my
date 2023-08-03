const{Sequelize,Datatype,model} = require("sequelize")
const sequelize = new Sequelize('common_db','root','',{
    host:'localhost',
    dialect:"mysql"
})
try{
    sequelize.authenticate();
    console.log('connection succesfully')
}
catch(error){console.error("unable to connect")
return res.status(400).send({msg:"unable to connect",err:error})
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize=sequelize;
db.register = require("./registration")(sequelize,Sequelize)
db.product = require("./product")(sequelize,Sequelize)

db.MenuItem = require("./menu")(sequelize,Sequelize)

db.sequelize.sync({force:false}).
then(()=>{
    console.log("yes re-sync")
})
module.exports = db;

