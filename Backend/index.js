import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const port = 4600;

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});


const ROOM = "group";

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinRoom", async (userName) => {
        console.log(`${userName} joined to group!`);

        await socket.join(ROOM);

        // send to all users
        // io.to(ROOM).emit("roomNotice", userName);

        // broadcast to all users
        socket.to(ROOM).emit("roomNotice", userName);
    });
});

app.get("/", (req, res) => {
    res.send("HEllo world");
});

server.listen(port, ()=>{
    console.log("Server listening on port", port);
});