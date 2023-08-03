module.exports =(sequelize,DataTypes)=>{
    const products = sequelize.define('product',{

        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
          },
        
          
          product_img :{
            type:DataTypes.STRING

          },
          tokens:{
            type:DataTypes.STRING,
            allowNull:true
          }
    })
    

return products;
}
