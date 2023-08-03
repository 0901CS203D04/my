module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('menuitem', {
      cardNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      tag: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    });
  
    return MenuItem;
  };
  