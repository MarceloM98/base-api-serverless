import { classService } from "./classService";

const updateProgress = async ({ params, body, user }) => {
  const { classId } = params;
  
  const updatedClass = await classService.updateProgress(classId, body, user);

  return { updatedClass };
};

export { updateProgress };
