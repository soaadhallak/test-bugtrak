# test-bugtrak

Simple Node.js + Express CRUD API. Data is stored in JSON files under `data/`.

## Setup

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`.

## Structure

```
src/
  routes/        HTTP routes
  controllers/   request/response handling
  services/      business logic
  utils/         JSON file helpers
data/
  users.json
  posts.json
```

## Users

| Method | Path | Body |
| --- | --- | --- |
| GET | `/api/users` | |
| GET | `/api/users/:id` | |
| POST | `/api/users` | `{ "name": "Sara", "email": "sara@test.com" }` |
| PUT | `/api/users/:id` | `{ "name": "Sara Ali" }` |
| DELETE | `/api/users/:id` | |

Deleting a user also deletes that user's posts.

## Posts

| Method | Path | Body |
| --- | --- | --- |
| GET | `/api/posts` | |
| GET | `/api/posts?userId=:id` | |
| GET | `/api/posts/:id` | |
| POST | `/api/posts` | `{ "title": "Hello", "content": "World", "userId": "<user-id>" }` |
| PUT | `/api/posts/:id` | `{ "title": "Updated" }` |
| DELETE | `/api/posts/:id` | |
