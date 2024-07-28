// get prev conversations
socket.on("ask conversations", async (msg) => {
  console.log("got the message", msg);
  const response = await Message.find({
    $or: [{ senderId: msg }],
  });

  const conversationsList = [
    ...new Set(response.map((msg) => msg.conversationId)),
  ];
  console.log("get list", conversationsList);
  socket.emit("get conversations", conversationsList);
});

// create conversations
socket.on("create conversation", async (data) => {
  const { users, conversationId } = data;
  const participantsList = users.trim().split(" ");
  const response = await Conversations.create({
    participants: participantsList,
    conversationId: conversationId,
  });

  //on created conversations
  console.log("conversation created", response);
  io.emit("conversation created", response);
});
// get the messages , conversations wise
socket.on("give messages from conversationId", async (msg) => {
  const response = await Message.find({ conversationId: msg });
  io.emit("get the messages by conversationsId", response);
  console.log("get the messages by conversationsId", response);
});

// get previous messages
const prevMessages = await Message.find();
io.emit("previous messages", prevMessages);

// on getting new message
socket.on("new message", async (messageData) => {
  const response = await Message.create({ ...messageData });
  console.log(response);
  io.emit("saved message", response);
});
