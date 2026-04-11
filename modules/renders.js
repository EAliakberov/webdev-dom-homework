"use strict";

import { comments } from "./comments.js";
import { initListeners } from "./listeners.js";

const formatted = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
});

export const commentsEl = document.querySelector("ul.comments");

//Рендер только лайка и счетчика для экономии ресурсов
export const renderLike = (commentEl, index) => {
    const likeBtn = commentEl.querySelector(".like-button");
    const likeCntr = commentEl.querySelector(".likes-counter");

    comments[index].isliked
        ? likeBtn.classList.add("-active-like")
        : likeBtn.classList.remove("-active-like");
    likeCntr.textContent = comments[index].likes;
};

//Рендер всех комментариев сразу
export const renderComments = () => {
    commentsEl.innerHTML = comments
        .map((comment, index) => {
            return `<li class="comment" data-id="${comment.id}" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${formatted.format(new Date(comment.date)).replace(",", "")}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isliked ? "-active-like" : ""} data-id="${comment.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
        })
        .join("");

    initListeners();
};
