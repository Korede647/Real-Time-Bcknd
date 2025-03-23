import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./utils/errorHandler.util";
import { WebSocket } from "ws";
import path from "path";
import http from "http"

dotenv.config()


const portEnv = process.env.PORT;

if(!portEnv){
    console.error("Error: PORT is not defined in .env file.")
    process.exit(1)
}

const PORT:number = parseInt(portEnv, 10)
if(isNaN(PORT)){
    console.error("Error: PORT is not defined in .env file.")
}

const app = express();
const corsOptions = {
    origin: 
    "*",
    credentials: true,
    allowedHeaders: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}

const server = http.createServer(app)
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("message", (message: any) => {
    // Convert the message to a string if necessary
    const msgStr = message.toString();
    ws.send(`Welcome to the Chat Room.`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});


app.use(cors(corsOptions))
app.use(express.json())
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})