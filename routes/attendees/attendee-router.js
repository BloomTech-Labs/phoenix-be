const router = require('express').Router()

const Attend = require("./attendee-model.js")

router.get("/", (req, res) => {
    Attend.attendeeByEvent()
        .then(aeS => {
            res.status(200).json(aeS)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Unable to fetch events", error });
        })
})

router.get("/user/:id", (req, res) => {
    const id = req.params.id

    Attend.attendeeByUser(id)

    .then(userA => {
        res.status(200).json(userA)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Unable to fetch users", error });
    })
})

router.get("/user/:id", async, (req, res, next) => {
    const id = req.params.id
    Attend.attendeeFull(id)

    try {
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Unable to fetch events", error });
    }

})