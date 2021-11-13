# Note Taking App

Note app is built in MERN stack

-   MongoDB, Express, React, Node.js

# Getting Started

Start API Node Server:

-   Run `yarn develop` or `yarn start`
-   Node server will always run on: `http://localhost:4000`

Start UI Server:

-   Run `cd client`
-   Run `yarn develop` or `yarn start`
-   UI server will always run on: `http://localhost:3000`

After running both servers: view app in browser on: `http://localhost:3000`

# Page Routing

UI page routing built using react-router-dom

Private routes that require user login Authorization token check to view:

-   `/` - home page that displays all notes for the user account in a collapsed card view
-   `/create` - view to create a new note
-   `/edit/:id` - view to edit an existing note
-   `/:id` - view to view one existing note

Public routes that are visible to anyone:

-   `/login` - view for user account login
-   `/register` - view to create/register a new user account

Authorization token is verified in both localStorage and in an API request to verify that it is valid on every page route.

Philosophy:

-   Because Authorization token is saved in localStorage, a user can bookmark certain routes and is able to see them without having to log in every time within a day as long as their browser's localStorage is not cleared.
-   Aurhtoization tokens do have a 24 hour expiration that is verified on page route via a back-end API so the user will have to log in after a day.

# Persistence

-   User accounts and notes data are persisted in a cloud deployed mongodb server
-   Authorization token after login is persisted in browser's localStorage and mongodb server

# APIs

Protected routes that require a valid Authorization token in the request header:

-   POST `/api/users/logout` - logs out the user account
-   GET `/api/users/isLoggedIn` - verifies if the user token is valid
-   GET `/api/notes` - fetches all notes for the user account
-   POST `/api/notes` - persist a new note for the user account
-   GET `/api/notes/:id` - fetches a specific note by note id
-   PUT `/api/notes/:id` - edits a specific note by note id
-   DELETE `/api/notes/:id` - deletes a specific note by note id

Public routes that are visible to anyone:

-   POST `/api/users/create` - creates a user account
-   POST `/api/users/login` - logs in the user account

TDB TODO:

-   Add unique API_KEY request header authentication for all requests both public and protected
-   Update GET `/api/notes` request to allow fetching notes by pagination for scalability, filtering notes by title names, and sorting by ascending/descending titles.
-   Add API to delete a user's account
-   Add API to reset password for a user's account

## Testing

Running cypress tests

-   Run `yarn test`

End-to-End Tests - Cypress

-   Tests would log into a test user account and run CRUD operations on tests

Roadblock:

-   Cypress by default blocks the required "Authorization" request header needed to make E2E requests so I will probably not have enough time to debug this and get it fully working.

Integration Tests - Cypress

-   Tests would log into the note app using JSON fixtures to stub api requests and test CRUD UX flows
-   TBD if I have enough time to get to this

Unit Tests - Jest

-   Test implementation functions using mocks if necssary
-   TBD if I have enough time to get to this
