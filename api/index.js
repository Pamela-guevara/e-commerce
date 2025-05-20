//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const PORT = 8080;
const { conn } = require("./src/db.js");

// Syncing all the models at once.
//cambiar force:true para que se sincronicen las bases de datos cuando modificamos los modelos;
//esto vaciará todo lo que tengamos almacenado como usuarios o productos pero no hay otra forma,
//sino no se actualizan las tablas. Luego volverlo a false.
conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log("%s listening at " + PORT); // eslint-disable-line no-console
    });
});