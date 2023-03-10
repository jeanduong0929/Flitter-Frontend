import axios from "axios";

const FLTTR = axios.create({
  baseURL: "http://localhost:8080/flitter",
  headers: {
    "Content-type": "application/json",
  },
});

export default FLTTR;
