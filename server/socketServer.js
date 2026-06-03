const users = [];
const admins = [];

const emitToClients = (clients, event, payload, socket) => {
  clients.forEach((client) => {
    if (client?.socketId) {
      socket.to(client.socketId).emit(event, payload);
    }
  });
};

const SocketServer = (socket) => {
  const updateList = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    if (index >= 0) list.splice(index, 1);
    list.push({ id, socketId: socket.id });
  };

  const getClients = (ids) => users.filter((item) => ids.includes(item.id));

  socket.on("joinUser", (id) => updateList(users, id));

  socket.on("joinAdmin", (id) => {
    updateList(admins, id);
    const admin = admins.find((item) => item.id === id);
    if (admin) {
      socket.to(admin.socketId).emit("activeUsers", users.length);
    }
  });

  socket.on("disconnect", () => {
    const removeBySocket = (list) => {
      const index = list.findIndex((item) => item.socketId === socket.id);
      if (index >= 0) list.splice(index, 1);
    };

    removeBySocket(users);
    removeBySocket(admins);
  });

  const routeToFollowers = (event, newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    emitToClients(getClients(ids), event, newPost, socket);
  };

  socket.on("likePost", (newPost) => routeToFollowers("likeToClient", newPost));
  socket.on("unLikePost", (newPost) => routeToFollowers("unLikeToClient", newPost));
  socket.on("createComment", (newPost) => routeToFollowers("createCommentToClient", newPost));
  socket.on("deleteComment", (newPost) => routeToFollowers("deleteCommentToClient", newPost));

  socket.on("follow", (newUser) => {
    const user = users.find((item) => item.id === newUser._id);
    if (user) socket.to(user.socketId).emit("followToClient", newUser);
  });

  socket.on("unFollow", (newUser) => {
    const user = users.find((item) => item.id === newUser._id);
    if (user) socket.to(user.socketId).emit("unFollowToClient", newUser);
  });

  socket.on("createNotify", (msg) => emitToClients(users.filter((item) => msg.recipients.includes(item.id)), "createNotifyToClient", msg, socket));
  socket.on("removeNotify", (msg) => emitToClients(users.filter((item) => msg.recipients.includes(item.id)), "removeNotifyToClient", msg, socket));

  socket.on("getActiveUsers", (id) => {
    const admin = admins.find((item) => item.id === id);
    if (admin) socket.to(admin.socketId).emit("getActiveUsersToClient", users.length);
  });

  socket.on("addMessage", (msg) => {
    const user = users.find((item) => item.id === msg.recipient);
    if (user) socket.to(user.socketId).emit("addMessageToClient", msg);
  });
};

export default SocketServer;