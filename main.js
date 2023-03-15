const baseUrl = "https://api.jsonbin.io/v3";

const secretKey =
  "$2b$10$uM/miVxgt6UyLkG1pND34OOoWf6RgINgrp5th7HJHADqC3dA9uNHi";
const collectionID = "6411fb6debd26539d08f3024";
const accessKey =
  "$2b$10$f4XCTcxJ7k4G9W7O8MJCPubiKrn8e19p8hzgnR9HHawfSOTrmBJAS";

// Creates a new message and sends this to JSONBin
const createBin = () => {
  const username = usernameLabel.value;
  const message = messageLabel.value;

  const data = JSON.stringify({ username: username, message: message });
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
    }
  };

  const url = `${baseUrl}/b`;

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Master-Key", secretKey);
  xhr.setRequestHeader("X-Access-Key", accessKey);
  xhr.setRequestHeader("X-Collection-Id", collectionID);
  xhr.send(data);
};

//DOM elements
const btn = document.getElementById("submit-btn");
const usernameLabel = document.getElementById("username");
const messageLabel = document.getElementById("message");

//Click event trigger function
const submitTrigger = (event) => {
  event.preventDefault();
  createBin();
  usernameLabel.value = "";
  messageLabel.value = "";
};

//Event Listener
btn.addEventListener("click", submitTrigger);
