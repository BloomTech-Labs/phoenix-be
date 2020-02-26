const router = require("express").Router();
const Calendar = require("./calendar-model.js");

//get preview event
router.get("/", (req, res) => {
  Calendar.preview()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to fetch preview", error });
    });
});

// get event
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

router.get("/", (req, res) => {
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

// add event - ADMIN/HOST

router.post("/", (req, res) => {});

// edit event - REGISTER
router.put("/user/:id/event/:id", (req, res) => {
  const user_id = req.params.user.id;
  const event_id = req.params.event.id;
  const email = req.params.user.email;

  Calendar.register(event_id, user_id, email)
    .then(registered => {
      res.status(200).json({ message: "Registered for event!" });
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
      if (deleted) {
        res.status(200).json({ message: "Event has been deleted" });
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
