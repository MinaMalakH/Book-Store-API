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
app.js
package.json
middlewares/
  ErrorHandler.js
  logger.js
  NotFoundHandler.js
  VerifyToken.js
models/
  Author.js
  Books.js
  User.js
routes/
  auth.js
  authors.js
  books.js
  users.js
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance

### Installation

```powershell
# Clone the repository
git clone <your-repo-url>
cd "Book Store API"

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URL=<your-mongodb-uri>
JWT_SECRET_KEY=<your-secret-key>
```

### Running the Server

```powershell
npm start
```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user (public)
- `POST /api/auth/login` — Login and receive a JWT token (public)

### Books

- `GET /api/books` — Get all books (public)
- `GET /api/books/:id` — Get book by ID (public)
- `POST /api/books` — Add new book (admin only)
- `PUT /api/books/:id` — Update book by ID (admin only)
- `DELETE /api/books/:id` — Delete book by ID (admin only)

### Authors

- `GET /api/authors` — Get all authors (public)
- `GET /api/authors/:id` — Get author by ID (public)
- `POST /api/authors` — Add new author (admin only)
- `PUT /api/authors/:id` — Update author by ID (admin only)
- `DELETE /api/authors/:id` — Delete author by ID (admin only)

### Users

- `GET /api/users` — Get all users (admin only)
- `GET /api/users/:id` — Get user by ID (admin or user himself)
- `PUT /api/users/:id` — Update user by ID (admin or user himself)
- `DELETE /api/users/:id` — Delete user by ID (admin or user himself)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
