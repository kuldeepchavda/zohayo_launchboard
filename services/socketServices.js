const Message = require("../models/Messages");
const Conversations = require("../models/Conversations");
const Users = require("../models/Users");
const { Server } = require("socket.io");
const Messages = require("../models/Messages");
const socketService = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"], // Allow specific methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    },
  });

  io.setMaxListeners(30);

  io.on("connection", async (socket) => {
    console.log("A client is active");
    //create a conversation
    socket.on("create conversation", async (data) => {
      console.log("creating con", data);
      const { conversationId } = data;
      const exists = await Conversations.findOne({
        conversationId: conversationId,
      });
      if (!exists) {
        const response = await Conversations.create({ ...data });
        console.log(response);
      } else {
        console.log("this conversation already exists");
      }
    });


    // previous messages by conversation Id
    socket.on("give previous messages",async (conversationId)=>{
      console.log(conversationId)
      const prevmessages = await Messages.find({conversationId:conversationId})
      socket.emit("get previous messages",prevmessages)
    });
    //new message

    socket.on("new message",async (msg) => {
      console.log("we got a new message", msg);
      const newMessage = await Messages.create({...msg})
      socket.emit("get new message",newMessage)
    });

// the delete function is not testes , others are
    socket.on("delete message",async(msg)=>{
      const deletedMessage = await Messages.findOneAndDelete(msg)
      socket.emit("msg deleted", deletedMessage)
    });
    socket.on("disconnect", () => {
      console.log("A client disconnected...");
    });
  });
};

module.exports = socketService;
