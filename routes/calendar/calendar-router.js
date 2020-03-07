const router = require("express").Router();
const Calendar = require("./calendar-model.js");

// get event - works
router.get("/", (req, res) => {
  Calendar.event()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to fetch events", error });
    });
});

// search for event
router.get("/:filter", (req, res) => {
  const filter = req.params.filter;

  Calendar.searchForEvent(filter)
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not find such an event", error });
    });
});

// add event - ADMIN/HOST - works
router.post("/", (req, res) => {
  const {
    summary,
    location,
    description,
    start_time,
    start_date,
    end_time,
    end_date
  } = req.body;
  const newEvent = {
    summary,
    location,
    description,
    start_time,
    start_date,
    end_time,
    end_date
  };

  if (!summary || !location || !description) {
    res.status(400).json({ message: "add required fields" });
  } else {
    Calendar.addEvent(newEvent)
      .then(newEvent => {
        res.status(200).json({ message: "Event created!", newEvent });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Could not create event", error });
      });
  }
});

// register for event / post to attendees table - works
router.post("/user/:user_id/event/:event_id", (req, res) => {
  const user_id = req.params.user_id;
  const event_id = req.params.event_id;

  Calendar.register(event_id, user_id)
    .then(registered => {
      res.status(200).json({ message: "Registered for event!", registered });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not register for event", error });
    });
});

// edit event - ADMIN/HOST
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Calendar.editEvent(body, id)
    .then(updatedEvent => {
      if (updatedEvent) {
        res.status(200).json({ message: "Event updated" });
      } else {
        res.status(404).json({ message: "Could not find event" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to update event", error });
    });
});

// delete event - ADMIN/HOST
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Calendar.deleteEvent(id)
    .then(deleted => {
      if (id) {
        res.status(200).json({ message: "Event has been deleted", deleted });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to delete event", error });
    });
});

module.exports = router;

// add start next
// add end next
// add event have gone through both while creating the event first

// add event next
// add start next
// add end next
// combine into one post
