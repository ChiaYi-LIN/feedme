// server
// Import required modules
import { pool } from "../Clients/pool";
import https from "https";
import { Server } from "socket.io";

// Create a PostgreSQL pool
// const pool = new Pool({
//   user: 'your_username',
//   password: 'your_password',
//   host: 'your_host',
//   database: 'your_database',
//   port: 5432, // Change the port if necessary
// });

const commentSocket = () => {
  // Create an HTTP server
  const port = 443;
  const httpc = https.createServer().listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  // Create a Socket.IO instance and attach it to the server
  const io = new Server (httpc);
  // var io = require('socket.io').listen(http);
  
  io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () =>
      console.log(`Disconnected: ${socket.id}`));

    socket.on('join', (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
    });

    socket.on('chat', (data) => {
      const { message, room } = data;
      console.log(`msg: ${message}, room: ${room}`);
      io.to(room).emit('chat', message);
    });

  });

  // Listen for incoming socket connections
  // io.on("connection", (socket) => {
  //   console.log("A user connected");

  //   // Listen for changes in the "comment" table
  //   const query = "LISTEN comment_changes";
  //   pool.query(query);

  //   // Handle PostgreSQL notifications
  //   const handleNotification = (notification) => {
  //     console.log(notification);
  //     const payload = notification.payload;
  //     const comment = JSON.parse(payload);
  //     console.log(comment);

  //     // Emit the comment change event to the connected client(s)
  //     socket.emit("commentChange", comment);
  //   };

  //   // Subscribe to PostgreSQL notifications
  //   pool.on("notification", handleNotification);

  //   // Handle socket disconnection
  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected");
  //     // Unsubscribe from PostgreSQL notifications
  //     pool.off("notification", handleNotification);
  //   });
  // });
};

export default commentSocket;
