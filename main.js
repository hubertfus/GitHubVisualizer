import { handleRoute } from "./js/router.js";

handleRoute();

window.addEventListener("popstate", handleRoute);
