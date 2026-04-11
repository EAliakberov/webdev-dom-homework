import { comments, updateComments } from "./comments.js";
import { renderLike, renderComments } from "./renders.js";
import { commentsEl } from "./renders.js";

export const initListeners = () => {
    const commentEls = commentsEl.querySelectorAll(".comment");
    const nameEl = document.querySelector(".add-form-name");
    const textEl = document.querySelector(".add-form-text");
    const addBtnEl = document.querySelector("button.add-form-button");

    for (let commentEl of commentEls) {
        const likeBtn = commentEl.querySelector(".like-button");
        let index = +likeBtn.dataset.index;

        //Клик по самому комменту
        commentEl.addEventListener("click", () => {
            textEl.value =
                `>${comments[index].name}\n"${comments[index].text}"\n`
                    .replaceAll("&gt;", ">")
                    .replaceAll("&lt;", "<");
        });

        //Клик по лайку внутри коммента и вызов перерисовки только лайков
        likeBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            if (comments[index].isliked) {
                comments[index].isliked = false;
                comments[index].likes--;
            } else {
                comments[index].isliked = true;
                comments[index].likes++;
            }
            renderLike(commentEl, index);
        });
    }

    //Нажатие на кнопку
    addBtnEl.addEventListener("click", () => {
        if (nameEl.value.trim() === "" || textEl.value.trim() === "") {
            return;
        }

        let newComment = {
            text: textEl.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .trim(),
            name: nameEl.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .trim(),
        };

        fetch("https://wedev-api.sky.pro/api/v1/:ealiakberov/comments", {
            method: "POST",
            body: JSON.stringify(newComment),
        }).then(() => {
            return fetch(
                "https://wedev-api.sky.pro/api/v1/:ealiakberov/comments",
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    updateComments(data.comments);
                    renderComments();
                });
        });
    });
};
