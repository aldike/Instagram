'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', [
      { name: 'Россия' },
      { name: 'Украина' },
      { name: 'Беларусь' },
      { name: 'Казахстан' },
      { name: 'Узбекистан' },
      { name: 'Грузия' },
      { name: 'Туркменистан' },
      { name: 'Таджикистан' },
      { name: 'Кыргызстан' },
      { name: 'Молдова' },
      { name: 'Армения' },
      { name: 'Азербайджан' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};