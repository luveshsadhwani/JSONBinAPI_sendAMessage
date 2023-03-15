//API Information
const secretKey =
  "$2b$10$uM/miVxgt6UyLkG1pND34OOoWf6RgINgrp5th7HJHADqC3dA9uNHi";
const collectionId = "6411fb6debd26539d08f3024";
const binId = "5fdc63a5dcfb842f3409cb74";
const urlCollection = `https://api.jsonbin.io/e/collection/${collectionId}/all-bins`;
const rootUrl = `https://api.jsonbin.io/v3`;
const accessKey =
  "$2b$10$f4XCTcxJ7k4G9W7O8MJCPubiKrn8e19p8hzgnR9HHawfSOTrmBJAS";

//AJAX functions
const getBinsOfACollection = async () => {
  try {
    const url = `${rootUrl}/c/${collectionId}/bins`;

    const response = await fetch(url, {
      headers: {
        "X-Master-Key": secretKey,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const binIds = getBinIds(jsonResponse);
      const arrayOfBinObjects = await fetchBins(binIds);
      const arrayOfBinRecords = arrayOfBinObjects.map((obj) => obj.record);
      arrayOfBinRecords.forEach((bin) => renderMessage(bin));
    }
  } catch (error) {
    console.log(error);
  }
};

// Returns an array of bin Ids from a collection. Each bin will then need to create its own request via two methods shown below.
const getBinIds = (arrayOfObjects) => {
  return arrayOfObjects.map((obj) => obj.record);
};

// Bins must be fetched individually via their ID https://jsonbin.io/api-reference/bins/read
const fetchBins = async (arrayOfBinIds) => {
  const fetchBinUrl = `${rootUrl}/b/`;
  let promiseArray = [];

  arrayOfBinIds.forEach((binId) => {
    const url = `${fetchBinUrl}${binId}`;
    promiseArray.push(
      fetch(url, {
        headers: {
          "X-Master-Key": secretKey,
          "X-Access-Key": accessKey,
        },
      }).then((response) => response.json())
    );
  });

  return await Promise.all(promiseArray);
};

const renderMessage = ({ username, message }) => {
  const messageEl = document.createElement("h5");
  messageEl.innerHTML = `${username}: ${message}`;
  messageBox.appendChild(messageEl);
};

// DOM elements
const messageBox = document.querySelector(".message-container");
window.addEventListener("load", getBinsOfACollection);
