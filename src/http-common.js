import axios from "axios";

export default axios.create({
  baseURL: "https://adaorachi.github.io/esetech-assessment-api/game-data.json",
  headers: {
    "Content-type": "application/json"
  }
});