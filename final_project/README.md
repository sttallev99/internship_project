# Real Estate Listings

A full-stack app where users can rent out a property or post what they are searching for, browse and filter
listings, and send rent requests that the owner accepts or rejects.

| Part | Stack |
|---|---|
| `backend/` | Node.js, Express, TypeScript, MongoDB (Mongoose), JWT auth (http-only cookie), AWS S3 image uploads |
| `frontend/` | React 18, React Router, Redux Toolkit + redux-persist, Axios, SCSS |

## Getting started

Requirements: Node.js 20+, a MongoDB connection string and (for image uploads) an S3 bucket.

```bash
# API: http://localhost:5000
cd backend
cp .env.example .env   # then fill in the values
npm install
npm run dev

# Web app: http://localhost:3000
cd frontend
npm install
npm start
```

The frontend talks to `http://localhost:5000` by default; override it with `REACT_APP_API_URL`.

### Backend scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the API with hot reload (`tsx watch`) and the debugger on port 9229 |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |
| `npm run typecheck` | Type-check without emitting |

## Backend structure

```
src/
├── app.ts            Express app: middleware, routers, error handling
├── index.ts          Entry point: connects to MongoDB and starts the server
├── config/env.ts     Typed, validated environment variables
├── constants/        Shared enums (property types, statuses, sort options)
├── routes/           URL → controller wiring
├── controllers/      HTTP layer: parse the request, call services, shape the response
├── services/         Data access and business queries (Mongoose / S3)
├── models/           Mongoose schemas; TypeScript types are inferred from them
├── middlewares/      Authentication and the global error handler
└── utils/            AppError, async handler, pagination and query parsing helpers
```

## API overview

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/sign-up` · `/sign-in` | – | Register / log in (sets the `access_token` cookie) |
| GET | `/sign-out` | – | Clear the session cookie |
| GET | `/listing` | – | Search all listings: `page`, `limit`, `searchTerm`, `listingType`, `propertyType`, `minPrice`, `maxPrice`, `sortBy` |
| GET, POST | `/listing/rent-out` | POST | List active rent-out listings / create one |
| GET, PUT, DELETE | `/listing/rent-out/:id` | PUT, DELETE (owner) | Read / update / delete a rent-out listing |
| PUT | `/listing/rent-out/:id/request-rent` | ✓ | Ask to rent a listing (status → `pending`) |
| GET, POST | `/listing/search-for` | POST | List / create searched-for listings |
| GET, PUT, DELETE | `/listing/search-for/:id` | PUT, DELETE (owner) | Read / update / delete a searched-for listing |
| GET | `/user/own-listings` | ✓ | The current user's listings (paginated) |
| GET | `/user/my-rents` | ✓ | Listings the current user requested to rent or is renting (paginated) |
| PUT | `/user/change-status/:id` | ✓ (owner) | Accept or reject a pending rent request |
| POST | `/images` | ✓ | Upload a listing image (JPG/PNG, max 5 MB) to S3 |

Errors share one shape: `{ "success": false, "status": "fail" | "error", "message": "..." }`.
