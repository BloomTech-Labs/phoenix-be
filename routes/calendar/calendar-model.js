const db = require('../../database/config.js');

module.exports = {
  event,
  register,
  getAttn,
  addEvent,
  deleteEvent,
};

//get event
function event() {
  return db.select('*').from('phoenixEvent as e');
}

//register for event
function register(event_id, user_id) {
  return db('attendees')
    .insert({ event_id, user_id })
    .then(() => db('phoenixEvent').where({ event_id: event_id }));
}

//return attendees table by user id
function getAttn(user_id) {
  return db('attendees as a')
    .join('phoenixEvent as p', 'p.event_id', '=', 'a.event_id')
    .select('*')
    .where({ 'a.user_id': user_id });
}

//add event -ADMIN/HOST
function addEvent(newEvent) {
  return db
    .insert(newEvent)
    .into('phoenixEvent')
    .then((result) => {
      return db('phoenixEvent');
    });
}

//delete event -ADMIN/HOST
function deleteEvent(event_id) {
  return db('phoenixEvent').where({ event_id }).delete();
}
