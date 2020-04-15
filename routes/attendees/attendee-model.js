const db = require("../../database/config.js")

module.exports = {
    attendeeWithEvent,
    attendee,
    attendeeFull
}

function attendee() {
    return db
    .select("*")
    .from("attendees")
}

function attendeeWithEvent() {
    return db
    .select("e.summary")
    .from("phoenixEvent as e")
    .innerJoin("attendees", 'e.event_id', 'attendees.event_id')
}

function attendeeFull() {
    return db
    .select('*')
    .from('phoenixEvent')
    .crossJoin('attendees')

}

