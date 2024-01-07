import { auth } from "@/lib/auth";
import { buildRouter, buildHandler } from "@/lib/router";
import { getContent } from "./getContent";
const router = buildRouter();

router.get("/contents/photo", auth.verifyLogged(getContent));

const main = buildHandler(router);

export { main };
