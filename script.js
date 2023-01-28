import { Socket } from "socket.io";

let information_box = document.getElementsByClassName("chemical");
var socket = io();
socket.on("data", function (data) {
  let recieved_data = data.toString().split(",");
  for (let i = 0; i < information_box.length; i++) {
    let width = parseInt(recieved_data[i]) / 1000;
    if (width > 1) {
      width = 1;
    }
    information_box[i].style.width = width * 500 + "px";
    information_box[i].innerHTML = `<p>${recieved_data[i]}</p>`;

    if (width > 0.4 && width <= 0.6) {
      information_box[i].style.backgroundColor = "yellow";
      console.log("Yellow");
    } else if (width > 0.6) {
      information_box[i].style.backgroundColor = "red";
    }
  }
});
