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

- `https://www.figma.com/file/4ixfEB23mat36sDraEENbo/Todos-App?type=design`

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

## Images

![Todos App Screenshot](https://ucarecdn.com/00c243dd-cfd2-4d63-8131-7ef71af24c51/todosapp.webp)

![Todos App Screenshot2](https://ucarecdn.com/09360013-5e90-434f-a89a-f2659e92c28a/todosapp.webp)

![Todos App Screenshot3](https://ucarecdn.com/3514ea28-7c49-4133-a7df-d2928c597ff9/todosapp.webp)
