import axios from "axios";

export const locationUrl = () => {
  return axios.create({ baseURL: "https://api.opencagedata.com" });
};

export const weatherUrl = () => {
  return axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
  });
};
