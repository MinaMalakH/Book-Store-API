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

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token
- `GET /api/books` — List all books
- `POST /api/books` — Add a new book (admin only)
- `GET /api/authors` — List all authors
- `POST /api/authors` — Add a new author (admin only)
- `GET /api/users` — List all users (admin only)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
