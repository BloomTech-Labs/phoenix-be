const express = require('express')

const User = require('./user-helpers.js')

const router = express.Router()

router.get('/', (req, res) => {
    User.getUsers()
        .then(users => {
            res.status(200).json(
                users.map(cv => {
                    return cv
                })
            )
        })
        .catch(err => {
            res.status(500).json({message: 'Error retrieving users', err})
        })
})

router.get('/key', (req, res) => {
    const key = req.body;

    User.getUserBy({key})
        .then(users => {
            res.status(200).json(
                users.map(cv => {
                    return cv
                })
            )
        })
        .catch(err => {

            res.status(500).json({message: 'Error retrieving users', err})
        })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    
    User.getUserById(id)
        .then(user => {
            tuser = user[0]
            res.status(200).json(tuser)
        })
        .catch(err => {
            res.status(500).json({message: 'Error retrieving users', err})
        })
})

router.post('/', (req, res) => {
    const body = req.body
    User.addUser(body)
        .then(user => {

            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'Error creating user', err})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    User.updateUser(id, body)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(err => {

            res.status(500).json({message: 'Error updating the user', err})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    User.deleteUser(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({message: 'Error deleting the user', err})
        })
})

module.exports = router