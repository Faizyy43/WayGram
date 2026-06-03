# Social Media API

Backend API for the MERN social media app.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in `server/`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

The API listens on `http://localhost:8080` by default.
