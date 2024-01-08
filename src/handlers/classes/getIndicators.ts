import { classService } from "./classService";

const getIndicators = async ({ query }) => {
  const indicators = await classService.listIndicator(query);
  return { indicators };
};

export { getIndicators };
