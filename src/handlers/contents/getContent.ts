import { contentService } from "./contentService";

const getContent = async ({ query }) => {
  const { search, apiKey, page } = query;
  const response = await contentService.list(apiKey, search, page);
  return response;
};

export { getContent };
