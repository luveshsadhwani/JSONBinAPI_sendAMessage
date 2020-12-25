//API Information
const secretKey = '$2b$10$BG0q8F1R5D9576dtgAzj6enqRuL4QSoARrs37U7Xjf2fCA9Y3TUGu';
const collectionId = '5fdc479edcfb842f3409c535';
const binId = '5fdc63a5dcfb842f3409cb74';
const urlCollection = `https://api.jsonbin.io/e/collection/${collectionId}/all-bins`;
const urlBin = `https://api.jsonbin.io/b/`;


//AJAX functions
const getCollection = async() => {
    try {
        const response = await fetch(urlCollection, {
            headers: {
                'secret-key': secretKey
            }});
        if (response.ok) {
            const jsonResponse = await response.json();
            const iDs = generateBinId(jsonResponse);
            console.log(iDs);
            // apiLoop(iDs);
            forEachBin(iDs)
        }
    }
    catch (error) {console.log(error)}    
}

// Returns an array of bin Ids from a collection. Each bin will then need to create its own request via two methods shown below.
const generateBinId = (res) => {
    let binIds = [];
    for (i = 0; i < res.records.length; i++) {
        binIds.push(res.records[i].id);
    }
    return binIds;
}

// Method 1: Creates an array of promises and then uses Promise all to render the response - 13 lines of code.
const apiLoop = (array) => {
    let promiseArray = [];
    for (i = 0; i < array.length; i++) {
        let urlLoop = `${urlBin}${array[i]}`;
        promiseArray.push(fetch(urlLoop, {
            headers: {
                'secret-key': secretKey
            }
        }).then (response => response.json())
        .then (res => renderResponse(res)))
    }
    const resp = Promise.all(promiseArray);
    console.log(resp);
}

// Method 2a: Function to loop through each binID and perform a get request
const forEachBin = (array) => {
    for (i = 0; i < array.length; i++) {
        getMessage(array[i]);
        console.log('hello');
    }
}



// Method 2b: GET request for each bin based on ID
const getMessage = async(bin) => {
    try {
        const url = `${urlBin}${bin}`
        const response = await fetch(url, {
            headers: {
                'secret-key': secretKey
            }});
        if (response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
        }
    }
    catch (error) {console.log(error)}

};


// Method 2c: Format Json response to display in screen - 26 lines of code (Method 2)
const renderResponse = (res) => {
    const message = document.createElement('h5');
    message.innerHTML = `${res.username}: ${res.message}`;
    messageBox.appendChild(message)
    console.log('message rendered')
}


// DOM elements
const messageBox = document.querySelector('.message-container');
// window.addEventListener('load', getCollection);

