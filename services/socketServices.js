const { Server } = require("socket.io");
const Message = require("../models/Messages");

const socketService = (server) => {
    const io = new Server(server); // Initialize Socket.IO with the HTTP server

io.on("connection", async (socket) => {
  console.log("A client is active");

  // fetch previous messages
  const prevMessages = await Message.find({}, { __v: 0 });
  io.emit("previous messages", prevMessages);
  // filter based on conversations
const getConversationByConversationId = async(req,res)=>{
   return await Message.find({ ConversationId: "conversation1" });
}
  // on getting new message
  socket.on("new message", async (messageData) => {
    const response = await Message.create({ ...messageData });
    io.emit("saved message", response);
  });
  //disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected...");
  });
});
};

module.exports = socketService;
