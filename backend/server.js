require("dotenv").config();
const connectDB = require("./src/configs/db.js");
const { bookTicketHandler } = require("./src/sockets/book-ticket-socket.js");
const app = require("./src/app.js");
const { Server } = require("socket.io");
const http = require("http");
connectDB();
const port = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  bookTicketHandler(io, socket);
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
