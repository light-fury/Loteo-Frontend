#!/usr/bin/env node

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require("./db.json"));
const middlewares = jsonServer.defaults();

if (process.argv.indexOf("--no-write") !== -1) {
    router.db._.prototype.write = function() {
    };
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Custom route processing


// Custom routes
server.use(jsonServer.rewriter({
    // add your custom routes here e.g.:
    // "/app/:id/logs": "/app_logs",
}));
// Use default router
server.use(router);
server.listen(8081, () => {
    console.log('JSON Server is running')
});
