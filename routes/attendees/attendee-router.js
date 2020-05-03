const router = require('express').Router()

const Attend = require("./attendee-model.js")

router.get('/', (req, res) => {
    Attend.attendee()
        .then(obj =>{
            res.status(200).json(obj)
        })
        .catch(error => {

            res.status(500).json({message: "Unable to get joined table", err})
        })
})

router.get("/spec", (req, res) => {
    Attend.attendeeWithEvent()
        .then(aeS => {
            res.status(200).json(aeS)
        })
        .catch(error => {

            res.status(500).json({ message: "Unable to fetch events", error });
        })
})

router.get("/spec2", (req, res) => {
    Attend.attendeeFull()
        .then(aeS => {
            res.status(200).json(aeS)
        })
        .catch(error => {

            res.status(500).json({ message: "Unable to fetch events", error });
        })
})
module.exports = router;