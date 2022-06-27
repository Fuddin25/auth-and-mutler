// const socketIo = (io) => {
//   io.on("connection", (socket) => {
//     console.log("client connect:", socket.id);
//   });
// };
const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect", socket.id);

    socket.on("disconnect", () => {
      console.log("client disconnect", socket.id);
    });

  });
};

module.exports = socketIo 