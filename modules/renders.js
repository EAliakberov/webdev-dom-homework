"use strict"

import { comments } from "./comments.js"
import { initListeners } from "./listeners.js"

export const commentsEl = document.querySelector("ul.comments")

//Рендер только лайка и счетчика для экономии ресурсов
export const renderLike = (commentEl, id) => {
    const likeBtn = commentEl.querySelector(".like-button")
    const likeCntr = commentEl.querySelector(".likes-counter")

    comments[id].liked
        ? likeBtn.classList.add("-active-like")
        : likeBtn.classList.remove("-active-like")
    likeCntr.textContent = comments[id].likesCount
}

//Рендер всех комментариев сразу
export const renderComments = () => {
    commentsEl.innerHTML = comments
        .map((comment, id) => {
            return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="like-button ${comment.liked ? "-active-like" : ""}" data-id="${id}"></button>
          </div>
        </div>
      </li>`
        })
        .join("")

    initListeners()
}
