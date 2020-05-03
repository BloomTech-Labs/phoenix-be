const db = require('../../database/config.js');

function getUsers() {
  return db('users');
}

function getUserBy({ key }) {

  return db('users').where(key);
}

function getUserById(id) {
  return db('users').where({ id });
}

function addUser(user) {
  return db
    .insert(user)
    .into('users')
    .then(_ => {
      return db('users').where({ username: user.username });
    });
}

function updateUser(id, body) {
  return db('users')
    .where({ id })
    .update(body)
    .then(res => {
      return db('users').where({ id });
    });
}

async function deleteUser(id) {
  await db('users')
    .where({ id })
    .del();
  return db('users');
}

function getByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

module.exports = {
  getUsers,
  getUserBy,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getByUsername
};
