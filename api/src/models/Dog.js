const { text } = require('body-parser');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,// no este vacio
      primaryKey: true
        },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   height: {
    type: DataTypes.STRING,
    allowNull: false,
   },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://cdn.britannica.com/60/8160-050-08CCEABC/German-shepherd.jpg",
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    createdInBd:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }

  });

  
};