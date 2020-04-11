const db = require("../../database/config.js")

module.exports = {
    attendeeByEvent,
    attendeeByUser,
    attendeeFull
}

function attendeeByEvent(event_id) {
    return db
    //mzybee phoenx
    .select("e.summary")
    .from("phoenixEvent as e")
    .fullOuterJoin("attendees", {event_id}, attendees.event_id)
}


//select  sumary from  phxevent join attendees where event_id = id 

function attendeeByUser(user_id) {
    return db
    //maybe user
    .select(u.username)
    .from("users as u")
    .fullOuterJoin("attendees", {user_id}, attendees.user_id)
}

//select username from userd join attendees where user_id = id

async function attendeeFull(event_id, user_id) {
    try {
        await attendeeByEvent({ event_id})
        await attendeeByUser({user_id})
        return db('attendees')
    }catch(err) {console.log('something went wrong with the user request || the event is not valid', err)}
}

//return attendee by id functions