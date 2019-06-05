const db = require('../data/dbConfig');

module.exports = {
  add
};

function add(user) {
  return db('users').insert(user);
}
