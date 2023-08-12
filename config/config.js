module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'admin',
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        username: 'doadmin',
        password: 'AVNS_C6DNB8pUJZQj97hnRfI',
        database: 'defaultdb',
        host: 'db-postgresql-fra1-68266-do-user-14504070-0.b.db.ondigitalocean.com',
        dialect: 'postgres',
        port: 25060,
        dialectOptions: {
            ssl: {
              ca: fs.readFileSync('config/ca-certificate.crt')
            },
        },
    },
};