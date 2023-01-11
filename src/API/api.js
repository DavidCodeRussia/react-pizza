import * as axios from "axios";

const instance = axios.default.create({
  withCredentials: true,
  baseURL: "https://63bbd74a32d17a509099ef50.mockapi.io/",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "",
  },
});

export const PizzaAPI = {
  getPizza(category, sortApi) {
    return instance.get(
      `items?${category ? `category=${category}` : ``}&sortBy=${sortApi}&order=desc`,
    );
  },
};
