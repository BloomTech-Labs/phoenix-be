const db = require("../../database/config.js");

module.exports = {
  preview,
  event,
  searchForEvent,
  register,
  addEvent,
  addStart,
  addEnd,
  addAttendees,
  editEvent,
  deleteEvent
};

//preview
function preview() {
  return db
    .select("e.summary", "s.timezone")
    .from("phoenixEvent as e")
    .join("start as s", "e.event_id", "s.start_id")
    .join("end as n", "e.event_id", "n.end_id");
}

//join
function event() {
  return db.select("*").from("phoenixEvent as e");
  // .join("start as s", "e.event_id", "s.start_id");
  // .join("end as n", "e.event_id", "n.end_id")
  // .join("attendees as a", "e.event_id", "a.attendees_id");
}

//query - uber query that cannibalizes different parts - async/await to go through all
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

//edit -register for- event
//rewrite
function register(event_id, user_id, email) {
  return db("phoenixEvent")
    .select("*")
    .from("phoenixEvent as e")
    .join("attendees as a", "e.event_id", "a.attendees_id")
    .join("users as u", "a.user_id", "u.user_id")
    .where({ event_id })
    .where({ user_id })
    .update(email);
}

//add event -ADMIN/HOST

function addEvent(newEvent) {
  return db("phoenixEvent")
    .insert(newEvent, "id")
    .then(result => {
      return db("phoenixEvent as e").join("");
    });
}

function addStart(newStart) {
  return db("start").insert(newStart);
}

function addEnd(newEnd) {
  return db("end").insert(newEnd);
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
    .join("start as s", "e.event_id", "s.start_id")
    .join("end as n", "e.event_id", "n.end_id")
    .where({ event_id })
    .update(updatedEvent);
}

//delete event -ADMIN/HOST
//rewrite
function deleteEvent(event_id) {
  db("phoenixEvent")
    .where({ event_id })
    .del();
  return event(event_id);
}
