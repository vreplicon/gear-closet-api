# Gear Closet API

## Summary
Simplify planning your next adventure by using Gear Closet. With this app you can store the information 
for all of your gear in one place and easily put together a list of all of the things you want to bring
on your next big trip.

## Live Demo

https://gear-closet.vreplicon.now.sh/

## Front End Repo

https://github.com/vreplicon/gear-closet

## API Endpoints

### /api/users/sign-up

A POST request to this endpoint will create a new user and return the credentials for that user

### /api/users/sign-in

A POST request to this endpoint will get the user id for the given email

### /api/gear

This endpoint handles the gear database

Use a POST request to add a new piece of gear with the new gear in the body of the request

#### /api/gear/gearId

Use a DELETE request to remove a piece of gear with the specified id from the database

#### /api/gear/user/userId

Use a GET request to get all of the pieces of gear belonging to the user with the given user id

### /api/lists

This endpoint handles the list database

Use a POST request to add a new list with the new list in the body of the request

#### /api/lists/listId

Use a DELETE request to remove a list with the specified id from the database

#### /api/lists/user/userId

Use a GET request to get all of lists belonging to the user with the given user id

## Technologies Used

### Front End

React  

### Backend

Node.js, Express

### Testing

Chai, Supertest, Mocha