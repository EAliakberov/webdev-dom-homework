"use strict";
import { login } from "./modules/api.js";
import {
    renderCommentsPage,
    renderLoginPage,
} from "./modules/fetchAndRender.js";
import { initListeners, initLoginListeners } from "./modules/listeners.js";

renderCommentsPage();

console.log("It works!");
