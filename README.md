# Application Title: Jotit Task Tracker

Have a task you need to complete? Jotit down! This application allows the user to 1) create an account and 2) sign in to 3) keep track of all one's important tasks, with the ability to create, view, update, cross off, and delete one's own tasks.

## Important Links

- [Deployed Client]()
- [Deployed API]()
- [API Repository](https://github.com/house-slytherin/express-api)

### User Stories

#### MVP

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a task item with title, description, and date.
- As a signed in user, I would like to update my task item's title, description, and date.
- As a signed in user, I would like to see all my task items but not other users' tasks.
- As a signed in user, I would like to cross off items to complete them.
- As a signed in user, I would like to delete my task item.

#### Reach Goals

- As a signed in user, I would like to search for a location to add to a task.
- As a signed in user, I would like to record an audio message for a task.

### Technologies Used

- JavaScript
- jQuery
- HTML/CSS
- Bootstrap
- MongoDB
- Mongoose
- Express
- React

### Planning Strategy

After deciding on an app idea and title, we developed a team scrum plan and created a development planning board. We knew we wanted Jotit to have a simple layout with a side navigation bar and a main area for viewing content. After developing our user stories and drawing up our wireframes and ERD, we started with the backend API and created and tested our user auth (sign-up, sign-in, change password, sign-out) and task (create, show all, show one, update, delete) routes. We then moved to the front end and created and tested corresponding React components for the user auth and task CRUD actions. From there we just needed to style our app and add the ability for an authenticated user to cross off completed tasks.

### Unsolved Problems / Future Updates

- Add the ability for a user to search for a location to add to a task
- Add the ability for a user to record an audio message to add to a task

### Wireframes 

![Wireframes](./public/images/Jotit_wireframes.png)