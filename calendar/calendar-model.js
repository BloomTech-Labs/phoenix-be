const db = require("../database/config.js");

module.exports = {
  preview,
  event,
  searchForEvent,
  register,
  addEvent,
  editEvent,
  deleteEvent
};

//preview
function preview() {
  return db
    .select("e.summary", "s.timezone")
    .from("phoenixEvent as e")
    .join("startTime as s", "e.start", "=", "s.start_id")
    .join("endTime as n", "e.end", "=", "n.end_id");
}

//join
function event() {
  return db
    .select("*")
    .from("phoenixEvent as e")
    .join("startTime as s", "e.start", "=", "s.start_id")
    .join("endTime as n", "e.end", "=", "n.end_id")
    .join("attendees as a", "e.attendees", "=", "a.attendees_id");
}

//query - uber query that cannibalizes different parts - async/await to go through all
// search for friends on CR3 when that is implemented
function searchForEvent(filter) {
  return event()
    .where("e.summary", "like", filter)
    .where("e.description", "like", filter)
    .where("e.location", "like", filter)
    .where("s.start_dateTime", "like", filter)
    .where("s.start_timeZone", "like", filter)
    .where("n.end_dateTime", "like", filter)
    .where("n.end_timeZone", "like", filter);
}

//edit -register for- event

function register(event_id, user_id, email) {
  return db("events")
    .select("*")
    .from("phoenixEvent as e")
    .join("attendees as a", "e.attendees", "=", "a.attendees_id")
    .join("users as u", "a.user_id", "=", "u.user_id")
    .where({ event_id })
    .where({ user_id })
    .update(email);
}

//add event -ADMIN/HOST

function addEvent(newEvent) {
  return db("events").insert(newEvent);
}

//edit event -ADMIN/HOST

function editEvent(event_id, updatedEvent) {
  return db
    .select("*")
    .from("phoenixEvent as e")
    .join("startTime as s", "e.start", "=", "s.start_id")
    .join("endTime as n", "e.end", "=", "n.end_id")
    .where({ event_id })
    .update(updatedEvent);
}

//delete event -ADMIN/HOST

function deleteEvent(event_id) {
  db("events")
    .where({ event_id })
    .del();
  return event(event_id);
}
