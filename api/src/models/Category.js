const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // Definir modelo Categoría

    sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}

// Puede pertenecer a muchos productos
// Usar .belongsToMany('product', { through: style })