# EventHub API

RESTful backend for a community events platform: registration/login, events, attendance, reviews.

## Stack

Node.js, Express, MongoDB (Mongoose), Redis (refresh-token cache), JWT (access) + random tokens (refresh), bcrypt, Zod.

## Setup

```bash
npm install
cp .env.example .env   # fill in secrets
npm run dev
```

Requires a local MongoDB (`mongod`) and Redis (`redis-server` or `docker run -p 6379:6379 redis`).

## Architecture

```
routes → controllers → services → models
```

- **routes** — only URL + method + middleware wiring.
- **controllers** — parse `req`, call a service, shape `res`. No business logic.
- **services** — all business logic. Never see `req`/`res`/HTTP.
- **models** — data shape and DB-level invariants (indexes, `pre('save')` hooks).

Errors are a class hierarchy in `src/errors/` (`BadRequestError`, `NotFoundError`, `ConflictError`, etc.), each carrying a stable `code` from `src/constants/errorCodes.js`. Single error response shape:
```json
{ "error": { "code": "EVENT_FULL", "message": "...", "details": null } }
```
The frontend should branch on `code`, not on `message`.

## Data model — rationale

| Relationship | Decision | Why |
|---|---|---|
| organizer → events | Reference (`Event.organizer: ObjectId`) | An organizer owns an unbounded number of events; events are queried independently of the user (by category, by date) |
| User ↔ Event (attendance) | Separate `Attendance` collection + partial unique index `(user, event, status: 'joined')` | Many-to-many and unbounded; the unique index prevents double-joining **at the database level**, not just in application code |
| User, Event → reviews | Separate `Review` collection + unique index `(user, event)` | One review per user per event — a DB-level guarantee, safe under races |
| agenda inside Event | Embedded array | Small, bounded, always read together with the event — embedding gives a single read with no join |

`Event.attendeeCount` is a denormalized counter, updated atomically on join/leave (`$inc` combined with an `attendeeCount < capacity` condition via `$expr` in a single query) — this rules out overbooking under a race without needing multi-document transactions.

## Refresh-token flow

- Access token — JWT, 15 min TTL, verified without touching the database.
- Refresh token — a random string (not a JWT); only its SHA-256 hash is stored in the DB.
- Rotation: on every `/auth/refresh` the old token is marked `revokedAt` and a new one is issued. Logout does the same.
- Redis is a cache-aside layer in front of the `RefreshToken` collection in MongoDB: check the cache first, fall back to Mongo (source of truth) on a miss, then populate the cache. Writes always go to Mongo first, then the cache.
- Reuse of an already-revoked token is treated as a likely theft signal — all of that user's active sessions are revoked.

## Access control

- `member` / `organizer` role lives on `User`, checked by the `requireRole` middleware.
- Ownership of a specific resource (my event / my review) is checked in the service layer (`assertIsOwner`), not in middleware — it requires loading the actual document.
- Login/register never reveal which part was wrong (email vs. password) — protects against user enumeration.

## Validation

Zod schemas validate every route's input (`validate` middleware), covering `body`/`query`/`params` in one schema. Validation failures return `400 VALIDATION_ERROR` with a list of issues.

## Testing

`requests.http` contains example requests covering all endpoints (register → login → create event → join → review). Data was also verified through `mongosh` (indexes, collection contents).