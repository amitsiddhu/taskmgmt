# Task Management App
## Requirements
### frontend (React)
* Node - 12.22.12
### Backend (Rails)
* Ruby - 3.3.0
* Postgres - 15.6
## Features (Frontend)
* Authentication (Login, Signup, Logout)
* Profile (Update, Delete)
* Task (List, Search, Create, Update, Delete)
## Features (Backend)
* Authentication
* Authorization (User can only access own tasks and profile)
* Task due dates and reminders (Auto reminders for tasks due today)
* Task sorting and searching capabilities.
* User profiles with avatars


# Backend APIs

### Authentication

1. User registration:
```
API: http://127.0.0.1:3000/signup
Request Method: Post

Request Body:

{
    "user": {
        "name": "Jon Doe", // Optional
        "email": "jon@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
}

Request Headers:

{
  "Content-Type": "application/json"
}

Response Body:

{
    "message": "User created successfully"
}

Response status code: 201
```
2. User login:
```
API: http://127.0.0.1:3000/authenticate
Request Method: Post

Request Body:

{
    "user": {
        "email": "jon@example.com",
        "password": "password123"
    }
}

Request Headers:

{
  "Content-Type": "application/json"
}

Response Body:

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4" // This is JWT authentication token
}

Response status code: 200
```
3. User logout:
```
API: http://127.0.0.1:3000/logout
Request Method: Delete

Response Body:

{
    "message": "Logged out successfully" // Client has to delete the JWT authenticate token
}

Response status code: 200
```
4. List all Users:
```
API: http://127.0.0.1:3000/users
Request Method: Get

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Response Body:

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4" // This is JWT authentication token
}

Response status code: 200
```
# Task management

5. Create Task:
```
API: http://127.0.0.1:3000/tasks
Request Method: Post

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Request Body:

{
  "task": {
    "title": "My First Task",
    "description": "Task description",
    "status": "To Do",
    "due_date" : "Thu, 25 Apr 2024"
  }
}

Response Body:

{
    "id": 1,
    "title": "My First Task",
    "description": "Task description",
    "status": "To Do",
    "created_at": "2024-04-22T11:21:18.061Z",
    "updated_at": "2024-04-22T11:21:18.061Z",
    "user_id": 1,
    "due_date": "2024-04-25T00:00:00.000Z"
}

Response status code: 201
```
6. Update Task
```
API: http://127.0.0.1:3000/tasks/<task_id>
Request Method: Patch

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Request Body:

{
  "task": {
    "status": "In Progress"
  }
}

Response Body:

{
  "status": "In Progress",
  "user_id": 1,
  "id": 1,
  "title": "My First Task",
  "description": "Task description",
  "created_at": "2024-04-22T11:21:18.061Z",
  "updated_at": "2024-04-22T11:29:29.616Z",
  "due_date": "2024-04-25T00:00:00.000Z"
}

Response status code: 200
```
7. Delete Task
```
API: http://127.0.0.1:3000/tasks/<task_id>
Request Method: Delete

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Response status code: 204
```
8. Task Sorting
```
API: http://127.0.0.1:3000/tasks
Request Method: Get

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Request Body: 

{
  "sort_direction": "asc" // Will sort tasks based on due date asc
}

Response Body:

[
    {
        "id": 3,
        "title": "My Second Task",
        "description": "Task description",
        "status": "To Do",
        "created_at": "2024-04-22T11:56:29.090Z",
        "updated_at": "2024-04-22T11:56:29.090Z",
        "user_id": 1,
        "due_date": "2024-04-23T00:00:00.000Z"
    },
    {
        "id": 1,
        "title": "My First Task",
        "description": "Task description",
        "status": "In Progress",
        "created_at": "2024-04-22T11:21:18.061Z",
        "updated_at": "2024-04-22T11:29:29.616Z",
        "user_id": 1,
        "due_date": "2024-04-25T00:00:00.000Z"
    }
]

Response status code: 200
```
9. Task searching
```
API: http://127.0.0.1:3000/tasks
Request Method: Get

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Request Body: 

{
  "search": "To Do" // Will search tasks titles
}

Response Body:

[
    {
        "id": 3,
        "title": "My Second Task",
        "description": "Task description",
        "status": "To Do",
        "created_at": "2024-04-22T11:56:29.090Z",
        "updated_at": "2024-04-22T11:56:29.090Z",
        "user_id": 1,
        "due_date": "2024-04-23T00:00:00.000Z"
    }
]

Response status code: 200
```
# User Profile

10. Get user details:
```
API: http://127.0.0.1:3000/users/<user_id>
Request Method: Get

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}


Response Body:

{
    "id": 1,
    "email": "jon@example.com",
    "password_digest": "$2a$12$NYpKN5CzBt7Jng6fiB0Wku89UG6eD.gsIlDPYNzsz58kamZzmlV6S",
    "created_at": "2024-04-21T18:21:28.378Z",
    "updated_at": "2024-04-21T18:21:28.378Z",
    "name": "Jon Doe"
}
```
11. Update user details:
```
API: http://127.0.0.1:3000/users/<user_id>
Request Method: Patch

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}


Request Body:

{
  "user": {
    "name": "Jon Liz Doe"
  }
}

Response Body:

{
    "name": "Jon Liz Doe",
    "email": "jon@example.com",
    "id": 1,
    "password_digest": "$2a$12$NYpKN5CzBt7Jng6fiB0Wku89UG6eD.gsIlDPYNzsz58kamZzmlV6S",
    "created_at": "2024-04-21T18:21:28.378Z",
    "updated_at": "2024-04-22T12:09:27.716Z"
}

Response status code: 200
```
12. Delete User:
```
API: http://127.0.0.1:3000/users/<user_id>
Request Method: Delete

Request Headers:

{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2iZ4z58FVsU7046PHnu6_Qzy68yS_uU_vuGz-MVMwG4"
}

Response status code: 204
```
