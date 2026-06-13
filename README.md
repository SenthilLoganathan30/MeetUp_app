# Meeting App (demo)

Quick scaffold for a WebRTC meeting demo using Express + Socket.IO.

Getting started:

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open http://localhost:3000 in multiple browser tabs and join the same room.

Notes:
- This demo serves the static client in `client/public` and includes a minimal signaling server in `server/server.js`.
- The `client/src` React files are placeholders if you later scaffold a React app.
Client (development):

1. Open a new terminal in `client/` and install client deps:

```bash
cd client
npm install
```

2. Run the React dev server:

```bash
npm run dev
```

When using the React dev server, the Express server can run concurrently to provide signaling at the same origin `http://localhost:3000` (in production you can build the client and serve from `client/public`).

The React and static demo clients now include mute/unmute and camera on/off controls after joining a room.
