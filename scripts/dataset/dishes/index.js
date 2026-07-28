const { filipinoDishes } = require('./filipino.data');
const { italianDishes } = require('./italian.data');
const { americanDishes } = require('./american.data');
const { asianDishes } = require('./asian.data');

const allDishes = [
  ...filipinoDishes,
  ...italianDishes,
  ...americanDishes,
  ...asianDishes
];

module.exports = { allDishes };
