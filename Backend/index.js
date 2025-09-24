import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const port = 3000;

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
});

app.get("/", (req, res) => {
    res.send("HEllo world");
});

app.listen(port, ()=>{
    console.log("Server listening on port", port);
});