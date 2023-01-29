const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const path = require("path");

const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const parser = new ReadlineParser({ delimiter: "\r\n" });

let port = new SerialPort({
  path: "COM6",
  baudRate: 9600,
});

port.pipe(parser);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
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
