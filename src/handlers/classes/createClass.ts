import { classService } from "./classService";

const createClass = async ({ body, user }) => {
  const newClass = await classService.create(body, user);

  return { newClass };
};

export { createClass };
