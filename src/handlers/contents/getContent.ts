import { contentService } from "./contentService";

const getClasses = async ({ query, user }) => {
  const search = query;
  const classes = await contentService.list(search, user);
  return { classes };
};

export { getClasses };
