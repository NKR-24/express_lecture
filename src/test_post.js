const axios = require("axios");

const url = "http://127.0.0.1:3000/status";

const jsonData = {
  value: 100,
};

axios
  .post(url, jsonData)
  .then((response) => {
    console.log("Response:", response.status);
  })
  .catch((error) => {
    console.error("Error:", error.response.status);
  });
