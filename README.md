## Introduction

A simple To Do List web application, it allows users to create, update and delete tasks, also allows users to put tasks as complete or incomplete. It has an auth system that allows users to register and login to the application.

## Features

- Create a task
- Update a task
- Delete a task
- Mark a task as complete
- Mark a task as incomplete
- View all tasks
- Login
- Register

## Tech Stack

- Typescript
- React
- Chakra UI
- Redux Toolkit
- NestJS
- PostgreSQL
- Docker
- Prisma
- Swagger
- Passport
- Docker

## Login Flow Chart, ER Diagram

- `https://www.figma.com/file/t1iOhdImWYMsOAvONOIdEf/Todos-app?type=design&node-id=2103-34&mode=design`

## How to run

### Requirements

- Docker
- Docker Compose

### Steps

1. Clone the repo
2. Run `docker compose up --build` in the root folder to build and run the containers, to stop the containers run `docker compose down`
3. Navigate to `http://localhost:8080` to view the application UI (Note: You may change the frontend port in the `frontend/.env` file, if you do so, make sure to change the FRONTEND_PORT env as well in the `backend/.env` file for the CORS to work, as as well as the port mapping in the `docker-compose.yml` )
4. Navigate to `http://localhost:3000/api/routes` to view the Swagger UI doc
5. Navigate to `http://localhost:5555` to view the Prisma Studio

## Author

- Anas Douib
