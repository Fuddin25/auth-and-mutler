// import models here
const { user } = require("../../models");

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id)

    // code here
    // define listener on event "load admin contact"
    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findAll({
          where: {
            status: "admin"
          },
          attributes: {
            exclude: [ "createdAt", "updatedAt", "password" ],
          },
        });

      // emit event to send admin data on event "admin contact"
      socket.emit("admin contact", adminContact);  
      } catch (err) {
        console.log(err);
      }
    });
    
    socket.on("load customer contact", async () => {
      try {
        const customerContact = await user.findAll({
          where: {
            status: "customer"
          },
          attributes: {
            exclude: [ "createdAt", "updatedAt", "password" ],
          },
        });
      
      // emit event to send customer data on event "customer contact"
      socket.emit("customer contact", customerContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })
}

module.exports = socketIo