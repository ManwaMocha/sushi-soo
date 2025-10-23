const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const uploadMiddleware = require('./upload.js'); // Your custom upload logic

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public') // Serves images in /public/images
});

// Use default middlewares (logger, cors, static, etc.)
server.use(middlewares);

// Use your custom upload middleware before JSON routes
server.use(uploadMiddleware);

// Use json-server router (must be after custom middleware)
server.use(router);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
