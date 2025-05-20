
const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // definir el modelo
    sequelize.define(
        "user", {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                isEmail: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            googleId: {
                type: DataTypes.STRING,
                allowNull: true
            },   
            githubId: {
                type: DataTypes.STRING,
                allowNull: true
            }         
        }, { timestamps: false });
};

// Pertenecer a uno o mas ordenes
// User.HasToMany('orders', { through: 'user_order' })