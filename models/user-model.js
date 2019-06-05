const db = require('../data/dbConfig');

module.exports = {
  insert,
  get,
  findUser
};

function get() {
  return db('users');
}

async function insert(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findUser(user) {
  return db('users')
    .where(user)
    .first();
}
