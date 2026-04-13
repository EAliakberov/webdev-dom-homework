"use strict";
import { firstLoading } from "./modules/fetchAndRender.js";
import { initListeners } from "./modules/listeners.js";

initListeners();
firstLoading();

console.log("It works!");
