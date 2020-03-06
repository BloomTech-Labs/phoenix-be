const db = require("../../database/config.js");

module.exports = {
  event,
  searchForEvent,
  register,
  addEvent,
  addAttendees,
  editEvent,
  deleteEvent
};

//get event
function event() {
  return db.select("*").from("phoenixEvent as e");
}

// search for friends on CR3 when that is implemented
function searchForEvent(filter) {
  return phoenixEvent()
    .where("e.summary", "like", filter)
    .where("e.description", "like", filter)
    .where("e.location", "like", filter)
    .where("s.start_dateTime", "like", filter)
    .where("s.start_timeZone", "like", filter)
    .where("n.end_dateTime", "like", filter)
    .where("n.end_timeZone", "like", filter);
}

//register for event
//rewrite
function register(event_id, user_id) {
  return db("attendees")
    .select("*")
    .from("attendees")
    .join("phoenixEvent as e", "attendees.event_id", "e.event_id")
    .join("users as u", "attendees.user_id", "u.id")
    .where(event_id)
    .in("phoenixEvent")
    .where(user_id)
    .in("users");
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

function addAttendees(newAttendee) {
  return db("attendees").insert(newAttendee);
}

//edit event -ADMIN/HOST
//rewrite
function editEvent(event_id, updatedEvent) {
  return db
    .select("*")
    .from("phoenixEvent as e")
    .where({ event_id })
    .update(updatedEvent);
}

//delete event -ADMIN/HOST
//rewrite
function deleteEvent(event_id) {
  return db("phoenixEvent")
    .where({ event_id })
    .delete();
}
