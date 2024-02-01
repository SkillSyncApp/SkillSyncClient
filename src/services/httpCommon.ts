import axios from "axios";

export default axios.create({
  // TODO: use env
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-type": "application/json",
  },
});
