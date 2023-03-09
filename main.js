const urlBin = "https://api.jsonbin.io/b";
const secretKey = "";
const collectionID = "";

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

  xhr.open("POST", urlBin);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("secret-key", secretKey);
  xhr.setRequestHeader("collection-id", collectionID);
  xhr.send(data);
};

//DOM elements
const btn = document.getElementById("mySubmit");
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
