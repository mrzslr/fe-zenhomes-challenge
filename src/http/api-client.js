var config = require("../config.json");

export const ApiClient = {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    config.todos = data.results;
    return data;
  }
};
