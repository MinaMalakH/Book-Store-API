# Book Store API

A Node.js RESTful API for managing books, authors, and users. Built with Express, MongoDB, and JWT authentication.

## Features

- User registration and login (JWT authentication)
- CRUD operations for books and authors
- Admin and user authorization
- Error handling middleware
- Logging middleware

## Project Structure

```

# Book Store API



## Key Features

- **Authentication:** User registration and login with JWT tokens.
- **Authorization:** Admin-only routes and user-level access control.
- **CRUD:** Create, read, update, delete for Books, Authors, and Users.
- **Validation:** Request validation with Joi.
- **Error Handling:** Centralized error and not-found middlewares.

## Tech Stack

- **Runtime:** Node.js
- **Web framework:** Express
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (JWT)
- **Validation:** Joi

## Repository Structure

```

app.js
package.json
controllers/ # Route handlers (controllers)
middlewares/ # Logger, error handlers, token verification
models/ # Mongoose models and Joi validators
routes/ # Route definitions
data.js # Sample data used by seeder
seeder.js # Import / remove seed data
README.md

````

## Quick Start

Prerequisites:

- Node.js (v14+ recommended)
- A running MongoDB instance (local or hosted)

Installation and run:

```powershell
# clone
git clone <your-repo-url>
cd "Book Store API"

# install
npm install

# create a .env with required variables (see below)
npm start
````

Environment variables required (create a `.env` file at project root):

```
MONGO_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bookstore
JWT_SECRET_KEY=your-strong-secret
PORT=5000
NODE_ENV=development
```

## Seed Data

This project includes a `seeder.js` helper to populate `Books` and `Authors` from `data.js`.

Usage:

```powershell
# import sample data
node seeder -import

# remove all seeded data
node seeder -remove
```

## API Reference

Authentication headers: all protected endpoints expect the JWT in the `Authorization` header using the `Bearer` scheme:

```http
Authorization: Bearer <token>
```

### Auth

- `POST /api/auth/register` — Register a new user (public)
- `POST /api/auth/login` — Login and receive a JWT token (public)

### Books

- `GET /api/books` — Get all books (public)
- `GET /api/books/:id` — Get book by ID (public)
- `POST /api/books` — Add new book (admin only)
- `PUT /api/books/:id` — Update book by ID (admin only)
- `DELETE /api/books/:id` — Delete book by ID (admin only)

Book model notes:

- `cover` accepts exactly `"Soft Cover"` or `"Hard Cover"`.

### Authors

- `GET /api/authors` — Get all authors (public)
- `GET /api/authors/:id` — Get author by ID (public)
- `POST /api/authors` — Add new author (admin only)
- `PUT /api/authors/:id` — Update author by ID (admin only)
- `DELETE /api/authors/:id` — Delete author by ID (admin only)

### Users

- `GET /api/users` — Get all users (admin only)
- `GET /api/users/:id` — Get user by ID (admin or the user themselves)
- `PUT /api/users/:id` — Update user by ID (admin or the user themselves)
- `DELETE /api/users/:id` — Delete user by ID (admin or the user themselves)

## Development Tips

- Use Postman or HTTPie for manual endpoint testing.
- Keep your `JWT_SECRET_KEY` private and strong.
- If a seeder import fails due to validation, inspect `data.js` values (e.g. `cover` string must match the Book schema enum).

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes and push: `git push origin feat/your-feature`
4. Open a pull request describing your changes

Please run linters and ensure tests (if any) pass before submitting a PR.

## License

This project is provided under the MIT License.

---

If you'd like, I can also:

- Add badges (build, coverage, npm version) to the top of this README.
- Generate a smaller `README-short.md` for GitHub's description and keep this as full docs.
- Create a `docs/` folder with API examples and sample curl/Postman collections.

Tell me which of those you'd like next and I'll implement it.
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
