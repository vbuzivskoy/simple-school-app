# Simple School Schedule Application

## Reqirements

- Node.js
- NPM
- Postgresql

## Database setup

Use db.sql file to create SQL schema.
Use mock_data.sql file to fill database with mock data.

## App setup

- npm install
- Create env variables DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, APP_PORT or save them to .env file

## App start

- npm start

## Usage

For now it is implemented CRUD methods for Teachers entity.

### Teacher CRUD

- Get all the teachers - GET on /teachers
- Get a teacher - GET on /teachers/id
- Create a teacher - POST to /teachers
- Delete a teacher - DELETE on /teachers/id
- Update a teacher - PUT to /teachers/id

### Target Math Teachers

- Get all math teachers with more than 10 years of expirience with lectures in room 100 on thursday between 8:30 and 14:30 - GET on /targetmathteachers
