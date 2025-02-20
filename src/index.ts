import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./utils/errorHandler.util";
import { WebSocket } from "ws";
import path from "path";

dotenv.config()


const portEnv = process.env.PORT;

new WebSocket('ws://localhost:8000');

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

app.use("/", express.static(path.resolve(__dirname, "./client")))

const ws = new WebSocket.Server({
    port: 8000
})

ws.on("connection", (ws: WebSocket) => {
    console.log('New client connected');
    ws.on("message", (message: string) => {
        ws.send(`Welcome to the Chat Room. ${message} `)
    })
})
ws.on('close', () => {
    console.log('Client disconnected');
  });

const wss = new WebSocket('ws://localhost:8000');

wss.on("open", () => {
    console.log("Connected to Server")
})

wss.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
})

wss.on("close", () => {
    console.log('Disconnected from Server');
})


app.use(cors(corsOptions))
app.use(express.json())

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})