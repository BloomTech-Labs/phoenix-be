const db = require("../../database/config.js");

module.exports = {
  event,
  register,
  addEvent,
  deleteEvent
};

//get event
function event() {
  return db.select("*").from("phoenixEvent as e");
}

//register for event
function register(event_id, user_id) {
  return db("attendees")
    .insert({ event_id, user_id })
    .then(() => db("phoenixEvent").where({ event_id: event_id }));
}

//add event -ADMIN/HOST
function addEvent(newEvent) {
  return db
    .insert(newEvent)
    .into("phoenixEvent")
    .then(result => {
      return db("phoenixEvent");
    });
}

//delete event -ADMIN/HOST
function deleteEvent(event_id) {
  return db("phoenixEvent")
    .where({ event_id })
    .delete();
}
