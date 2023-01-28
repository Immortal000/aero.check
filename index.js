const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const { Server } = require("socket.io");
const io = new Server(server);

const parser = new ReadlineParser({ delimiter: "\r\n" });

let port = new SerialPort({
  path: "COM6",
  baudRate: 9600,
});

port.pipe(parser);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

parser.on("data", (data) => {
  io.emit("data", data);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
