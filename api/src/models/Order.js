const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        address: { //direccion de entrega de la orden
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: { //estado de la orden
            type: DataTypes.ENUM,
            values: ['carrito', 'creada', 'procesando', 'completada', 'cancelada'],
            defaultValue: 'carrito',
            allowNull: true,
        },
        total_price: { //precio total de la orden, a corroborar(pendiente)
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.0
        },
        details: {
            allowNull: true,
            type: DataTypes.STRING //=> en este campo se puede poner información adiciona de la
        } // entrega, como detalles de la casa, hora ideal de entrega, etc
    }, { timestamps: true })
};

//Una orden pertenece a un usuario;
//Una orden puede tener muchos productos;
//Order.belongsToMany('Products', {through: 'OrderLine'})
// Order.hasOne('User');