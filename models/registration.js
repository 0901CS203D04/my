

module.exports =(sequelize,DataTypes)=>{
    const register = sequelize.define('registration',{

        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          user_img :{
            type:DataTypes.STRING

          },
          token: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          tokens:{
            type:DataTypes.STRING,
            allowNull:true
          }
    })

return register;
}


