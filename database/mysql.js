const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize({
    username: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    dialect: process.env.DIALECT,
    port: process.env.PORT
});


async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connection()

module.exports = {
    sequelize,
}