const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        description: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.ENUM,
            values: ['1', '2', '3', '4', '5'],
            defaultValue: '1'
        }
    }, { timestamps: false })
};

// La entidad reviews se relaciona con productos 1: N,
// // Products.hasMany(Reviews)
//     Reviews.belongsTo(Product)
// la identidad reviews se relaciona con el usuario 1:N, ya que el user puede dejar muchos reviews
// pero cada review pertenecerá a un usuario
//     Reviews.belongsTo(User)