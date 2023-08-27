const path = require('path');
const fs = require('fs')
module.exports = {
    development: {
        username: 'instagram',
        password: 'root',
        database: 'instagram',
        host: 'localhost',
        port: '5431',
        dialect: 'postgres',
    },
    production: {
        username: 'doadmin',
        password: 'AVNS_S_rrptiYWztutn7TRtg',
        database: 'defaultdb',
        host: 'db-postgresql-sgp1-16869-do-user-14561627-0.b.db.ondigitalocean.com',
        port: '25060',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              ca: fs.readFileSync(path.resolve("config","ca-certificate.crt")),
            },
          }
    },
};
