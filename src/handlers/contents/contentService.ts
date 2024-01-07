import axios from "axios";
import { config } from "../../config";
import { error } from "@/lib/error";

const pixabayApiKey = config.PIXABAYAPIKEY;
const pexelsApiKey = config.PEXELSAPIKEY;
const unsplashApiKey = config.UNSPLASHAPIKEY;

const list = async (apiKey = null, query = "", page = "1") => {
  let response;
  try {
    response = await pixabayApiCall(apiKey ?? pixabayApiKey, query, page);
  } catch {
    try {
      response = await pexelsApiCall(apiKey ?? pexelsApiKey, query, page);
    } catch {
      try {
        response = await unsplashApiCall(apiKey ?? unsplashApiKey, query, page);
      } catch {
        throw error.build({
          message: "Apikey inválida",
          type: "client error",
          statusCode: 400,
        });
      }
    }
  } finally {
    if (response?.status == 200) {
      return response.data;
    }
  }
};

async function pixabayApiCall(apiKey, query, page) {
  const search = encodeURI(query);
  const response = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${search}&pretty=true&page=${page}`
  );
  return response;
}

async function pexelsApiCall(apiKey, query, page) {
  const search = encodeURI(query);
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${search}&page=${page}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  return response;
}
async function unsplashApiCall(apiKey, query, page) {
  const search = encodeURI(query);
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${page}&query=${search}`
  );
  return response;
}

const contentService = {
  list,
};

export { contentService };
