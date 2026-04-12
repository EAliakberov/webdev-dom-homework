import { comments, updateComments } from "./comments.js";
import { renderLike, fetchAndRenderComments } from "./fetchAndRender.js";
import { commentsEl } from "./fetchAndRender.js";

function delay(interval = 900) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const initListeners = () => {
    const commentEls = commentsEl.querySelectorAll(".comment");

    const textEl = document.querySelector(".add-form-text");

    for (let commentEl of commentEls) {
        const likeBtn = commentEl.querySelector(".like-button");
        let index = +likeBtn.dataset.index;

        //Клик по самому комменту
        commentEl.addEventListener("click", () => {
            textEl.value =
                `>${comments[index].author.name}\n"${comments[index].text}"\n`
                    .replaceAll("&gt;", ">")
                    .replaceAll("&lt;", "<");
        });

        //Клик по лайку внутри коммента и вызов перерисовки только лайков
        likeBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            likeBtn.classList.add("-loading-like");
            delay()
                .then(() => {
                    if (comments[index].isliked) {
                        comments[index].isliked = false;
                        comments[index].likes--;
                    } else {
                        comments[index].isliked = true;
                        comments[index].likes++;
                    }
                    renderLike(commentEl, index);
                })
                .then(() => {
                    likeBtn.classList.remove("-loading-like");
                });
        });
    }
};

//Нажатие на кнопку
export const initAddListener = () => {
    const textEl = document.querySelector(".add-form-text");
    const nameEl = document.querySelector(".add-form-name");
    const addBtnEl = document.querySelector("button.add-form-button");
    const addForm = document.querySelector(".add-form");

    addBtnEl.addEventListener("click", () => {
        if (nameEl.value.trim() === "" || textEl.value.trim() === "") {
            alert("Не оставляйте поля пустыми");
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

        addForm.style = "display: none";
        commentsEl.innerHTML += `<div class = "comments__info" style = "text-align: center;">Подождите, комментарий добавляется</div>`;

        fetch("https://wedev-api.sky.pro/api/v1/:ealiakberov/comments", {
            method: "POST",
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201)
                    return fetchAndRenderComments();
                if (response.status === 400) {
                    alert("введите не менее 3х символов в каждом поле!!!");
                }
            })
            .then(() => {
                addForm.style = "";
                commentsEl.querySelector(".comments__info").remove();
            });
    });
};
