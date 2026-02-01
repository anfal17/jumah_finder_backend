# Jummah Finder Backend

REST API backend for the Jummah Finder application - a platform to help users find nearby mosques and their Jummah prayer timings.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Features

- 🕌 **Masjid Management** - CRUD operations for mosques
- 📩 **Request System** - Users can submit new masjid requests for admin approval
- ⚠️ **Reports** - Users can report incorrect timings
- 💬 **Feedback** - General user feedback collection
- 🔐 **Admin Auth** - JWT-based admin authentication

## API Endpoints

### Masjids
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/masjids` | Get all masjids |
| GET | `/api/masjids/:id` | Get single masjid |
| POST | `/api/masjids` | Create masjid (Admin) |
| PUT | `/api/masjids/:id` | Update masjid (Admin) |
| DELETE | `/api/masjids/:id` | Delete masjid (Admin) |

### Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/requests` | Get all requests (Admin) |
| POST | `/api/requests` | Submit new masjid request |
| PUT | `/api/requests/:id` | Update request (Admin) |
| POST | `/api/requests/:id/approve` | Approve request (Admin) |
| POST | `/api/requests/:id/reject` | Reject request (Admin) |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | Get all reports (Admin) |
| POST | `/api/reports` | Submit new report |
| PUT | `/api/reports/:id` | Update report status (Admin) |

### Feedbacks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedbacks` | Get all feedbacks (Admin) |
| POST | `/api/feedbacks` | Submit feedback |
| PUT | `/api/feedbacks/:id` | Update feedback status (Admin) |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jummah_finder
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Seed Database (Optional)
```bash
node src/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Run Production
```bash
npm start
```

## Project Structure
```
src/
├── config/         # Database configuration
├── controllers/    # Route handlers
├── middleware/     # Auth middleware
├── models/         # Mongoose schemas
├── routes/         # API routes
├── utils/          # Helper functions
├── index.js        # Entry point
└── seed.js         # Database seeder
```

## Default Admin Credentials
After seeding:
- **Email**: admin@jummahfinder.com
- **Password**: admin123

## License
MIT
