const { Sequelize } = require('sequelize');
const Role = require('../app/auth/Role');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Role.bulkCreate([
            {name: 'user'},
            {name: 'moderator'},
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Role', null, {});
    }
};