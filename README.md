# Phoenix

## Maintainability and Test Coverage

### Code Climate Badges

[![Maintainability](https://api.codeclimate.com/v1/badges/6107c810fc83d93a2733/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/phoenix-be/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6107c810fc83d93a2733/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/phoenix-be/test_coverage)

## API Documentation

**Backend delpoyed at** [Phoenix Heroku App](https://phoenix-be-production.herokuapp.com/)

**Api Documentation:** [Postman Docs](https://documenter.getpostman.com/view/7041266/SzmmVv2b?version=latest)

## Getting started

To get the server running locally:

1. Clone this repo
2. ```npm i``` to install all required dependencies
3. ```npm start``` to start local server
4. ```npm server``` to start local server with nodemon 
5. ```npm test``` to start test environment -OR- ```npm run coverage``` to get tests with a coverage report

## Backend framework

- Node.js
- Postgres
- Heroku
- ElephantSQL

## Framework Advantages

- An open-source, cross-platform
- Easy to integrate SQL database

## Endpoints

### Auth Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `auth/register` | all users      | Creates a new user.                                     |
| POST    | `auth/login`    | all users      | Returns a JSON Web Token.                               |

### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `api/users`             | all users           | Returns all users.                                 |
| GET    | `api/users/key`         | admin               | Returns users by key.                              |
| GET    | `api/users/:user_id`   | admin               | Returns user by user id.                           |
| PUT    | `api/users/:user_id`   | admin               | Updates user account info by user id               |
| DELETE | `api/users/:user_id`   | admin               | Deletes a user by user id.                         |

### Calendar Routes

| Method | Endpoint                                    | Access Control  | Description                         |
| ------ | ------------------------------------------- | --------------- | ------------------------------------|
| GET    | `api/calendar`                              | admin           | Returns all Phoenix events.         |
| POST   | `api/calendar`                              | admin           | Add new Phoenix event.              |
| POST   | `api/calendar/user/:user_id/event/:event_id`| Registered user | Returns user by user id.            |
| DELETE | `api/calendar/:event_id`                    | admin           | Deletes a user by user id.          |

### Attendees Routes

| Method | Endpoint                                | Access Control  | Description                                   |
| ------ | --------------------------------------- | --------------- | ----------------------------------------------|
| GET    | `api/attendees`                         | admin           | Returns all event ids with registered user ids|
| POST   | `api/attendees`                         | admin           | Add new Phoenix event.                        |
| POST   | `api/attendees/spec2`                   | admin           | Returns user by user id.                      |

## Data Model

### USERS

---

```JavaScript
{
  id: INTEGER
  username: STRING
  password: STRING
  name: BOOLEAN
  email: STRING
  age: INTEGER
}
```

### EVENTS

---

```JavaScript
{
  event_id: INTEGER
  summary: STRING - NOT NULLABLE
  location: STRING - NOT NULLABLE
  description: STRING
  start_time: TIME
  start_date: DATE
  end_time: TIME
  end_date: DATE
}
```

### ATTENDEES

---

```JavaScript
{
  event_id: foreign key in PHOENIXEVENT table
  user_id: foreign key in USERS table
  attendees_id: COMPOSITE KEY FROM EVENT_ID AND USER_ID
}
```

## Actions

`getUsers()` -> Returns all users.

`getUserById(id)` -> Returns a single user by user id.

`getUserBy(key)` -> Returns all users that match a key word.

`addUser()` -> Creates a new user and returns that user with a JSON web token and a success message.

`updateUser(id, body)` -> Updates user info and returns updated user object

`deleteUser(id)` -> Deletes a user by id and returns all current users.

`getByUsername(username)` -> Returns a user by username.

`event()` -> Returns all events.

`register()` -> Registes a user for an event.

`addEvent()` -> Creates a new event.

`deleteEvent()` -> Deletes an event.

`attendee()` -> Return all users ids registered to an event with event ids.

`attendeeWithEvent` -> Returns event summaries from events with attendees.

`attendeeFull()` -> Returns all events with registered user ids.

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- DATABASE_URL - ElephantSQL postgres database url

- NODE_ENV - set to "development" until ready for "production"
- JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/phoenix-fe/blob/master/README.md) for details on the fronend of our project.
