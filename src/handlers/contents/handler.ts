import { auth } from "@/lib/auth";
import { buildRouter, buildHandler } from "@/lib/router";

const router = buildRouter();

router.get(
  "/contents/photo",
  auth.verifyLogged(() => {})
);

const main = buildHandler(router);

export { main };
