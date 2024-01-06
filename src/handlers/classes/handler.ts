import { auth } from "@/lib/auth";
import { buildRouter, buildHandler } from "@/lib/router";
import { createClass } from "./createClass";
// import { removeClient } from './deleteClient'
// import { getClient } from './getClient'
// import { listClients } from './listClients'
// import { updateClient } from './updateClient'

const router = buildRouter();

router.post("/classes", auth.verifyLogged(createClass));
// router.get('/clients/{clientId}', auth.verifyLogged(getClient))
// router.put('/clients', auth.verifyLogged(updateClient))
// router.get('/clients', auth.verifyLogged(listClients))
// router.delete('/clients/{clientId}', auth.verifyLogged(removeClient))

const main = buildHandler(router);

export { main };
