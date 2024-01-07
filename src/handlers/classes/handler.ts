import { auth } from "@/lib/auth";
import { buildRouter, buildHandler } from "@/lib/router";
import { createClass } from "./createClass";
import { getClasses } from "./getClasses";
import { removeClass } from "./deleteClass";
import { updateClass } from "./updateClass";
import { updateProgress } from "./updateProgress";

const router = buildRouter();

router.post("/classes", auth.verifyLogged(createClass));
router.get("/classes", auth.verifyLogged(getClasses));
router.delete("/classes/{classId}", auth.verifyLogged(removeClass));
router.put("/classes", auth.verifyLogged(updateClass));
router.post("/classes/{classId}/mine", auth.verifyLogged(updateProgress));

const main = buildHandler(router);

export { main };
