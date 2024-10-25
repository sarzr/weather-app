import axios from "axios";

export const locationUrl = () => {
  return axios.create({ baseURL: "https://api.opencagedata.com" });
};
