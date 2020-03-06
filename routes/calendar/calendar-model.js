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
    .insert({ event_id }, { user_id })
    .into("attendees")
    .select("phoenixEvent.event_id", "users.id")
    .from(
      db("phoenixEvent")
        .select("phoenixEvent.event_id")
        .from("phoenixEvent")
        .where({ event_id }, "=", "attendees.event_id")
    )
    .as("e")
    .fullOuterJoin(
      db("users")
        .select("users.id")
        .from("users")
        .where({ user_id }, "=", "attendees.user_id")
    )
    .as("u");
}

// insert into table 1
// select data from table 2 union select data from table 3
// select event and users from attendees(or event and users) where event_id=attendees.event_id

// .join("phoenixEvent as e", "attendees.event_id", "e.event_id")

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
