// Information for API
// Each record is stored in 1 bin. These bins can be created, deleted, updated and read.
// Collections are a collections of bins. Collections can be created and updated. Bins can be added into collections if the collection ID is specified.
const urlBin = 'https://api.jsonbin.io/b';
const secretKey = '$2b$10$BG0q8F1R5D9576dtgAzj6enqRuL4QSoARrs37U7Xjf2fCA9Y3TUGu';
const collectionID = '5fdc479edcfb842f3409c535';

// AJAX Functions 

// Creates a new message and sends this to JSONBin
const createBin = () => {
  const username = usernameLabel.value;
  const message = messageLabel.value;
  
  const data = JSON.stringify({'username': username, 'message': message});
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
    }
  };

  xhr.open('POST', urlBin);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('secret-key', secretKey);
  xhr.setRequestHeader("collection-id", collectionID);
  xhr.send(data); 
}


//DOM elements
const btn = document.getElementById('mySubmit');
const usernameLabel = document.getElementById('username');
const messageLabel = document.getElementById('message');

//Click event trigger function
const submitTrigger = (event) => {
  event.preventDefault();
  createBin();
  usernameLabel.value = '';
  messageLabel.value = '';
}

//Event Listener
btn.addEventListener('click',submitTrigger);




