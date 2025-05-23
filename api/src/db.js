require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
    logging: false, // set to console.log to see the raw SQL queries
    //native: true, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, User, Order, Review } = sequelize.models;

const ProductCategory = sequelize.define('product_category', {}, { timestamps: false });
//OrderLine es la tabla que relaciona las ordenes con los productos;
// Sus FK estan dadas en las relaciones que se explicitan en dichas tablas
const OrderLine = sequelize.define('order_product', {
    //esta tabla de relación tiene los siguientes atributos ademas de las FK de producto y orden
    quantity: { //cantidad de productos
        type: DataTypes.INTEGER,
    },
    sub_price: { //precio
        type: DataTypes.DECIMAL,
    },
    dispatch_date: { //fecha de salida de la orden
        type: DataTypes.DATE,
    }
}, { timestamps: false });

// Aca vendrian las relaciones
// Product N - M Category
Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderLine });
Product.belongsToMany(Order, { through: OrderLine });

Review.belongsTo(Product);
Review.belongsTo(User)

module.exports = {
    ProductCategory,
    OrderLine,
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};