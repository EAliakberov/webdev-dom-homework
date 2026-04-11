"use strict";
import { renderComments } from "./modules/renders.js";
import { comments, updateComments } from "./modules/comments.js";

fetch("https://wedev-api.sky.pro/api/v1/:ealiakberov/comments", {
    method: "GET",
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        updateComments(data.comments);
    })
    .then(() => {
        renderComments();
    });

console.log("It works!");
