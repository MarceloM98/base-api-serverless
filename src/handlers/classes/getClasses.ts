import { classService } from "./classService";

const getClasses = async ({ query, user }) => {
  const classes = await classService.list(query, user);
  return { classes };
};

export { getClasses };
