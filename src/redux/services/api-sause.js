import { create } from "apisauce";

const api = create({
  baseURL: "http://www.omdbapi.com",
  headers: {
    Accept: "application/vnd.github.v3+json"
  }
});

export const getApiResult = async () => {
  let response;
  await api
    .get("/?s=Iron%20man&apikey=de15b4c7")
    .then(apiResponse => {
      if (apiResponse.ok) {
        response = apiResponse.data;
      } else {
        response = "Unable to fetch data";
      }
    })
    .catch(error => {
      response.error = error;
    });
  return response;
};


