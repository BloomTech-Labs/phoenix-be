const router = require('express').Router();
const Calendar = require('./calendar-model.js');

// get event - works
router.get('/', (req, res) => {
  Calendar.event()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {

      res.status(500).json({ message: 'Unable to fetch events', error });
    });
});

// add event - ADMIN/HOST
router.post('/', (req, res) => {
  const {
    summary,
    location,
    description,
    start_time,
    start_date,
    end_time,
    end_date,
  } = req.body;
  const newEvent = {
    summary,
    location,
    description,
    start_time,
    start_date,
    end_time,
    end_date,
  };

  if (!summary || !location || !description) {
    res.status(400).json({ message: 'add required fields' });
  } else {
    Calendar.addEvent(newEvent)
      .then((newEvent) => {
        res.status(200).json({ message: 'Event created!', newEvent });
      })
      .catch((error) => {

        res.status(500).json({ message: 'Could not create event', error });
      });
  }
});

// register for event / post to attendees table
router.post('/user/:user_id/event/:event_id', (req, res) => {
  const user_id = req.params.user_id;
  const event_id = req.params.event_id;

  Calendar.register(event_id, user_id)
    .then((registered) => {
      res.status(200).json({ message: 'Registered for event!', registered });
    })
    .catch((error) => {

      res.status(500).json({ message: 'Could not register for event', error });
    });
});

// get attendees table
router.get('/user/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  // const event_id = req.params.event_id;

  Calendar.getAttn(user_id)
    .then((events) => {
      res.status(200).json({ events });
    })
    .catch((error) => {

      res.status(500).json({ message: 'Could not get events', error });
    });
});

// delete event - ADMIN/HOST
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Calendar.deleteEvent(id)
    .then((deleted) => {
      if (id) {
        res.status(200).json({ message: 'Event has been deleted', deleted });
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    })
    .catch((error) => {

      res.status(500).json({ message: 'Failed to delete event', error });
    });
});

module.exports = router;
