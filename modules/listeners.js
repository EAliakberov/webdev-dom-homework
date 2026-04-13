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
        let statusEl = document.createElement("div");
        statusEl.textContent = "Подождите, комментарий добавляется";
        statusEl.classList.add("comments__status");
        statusEl.style = "text-align: center;";
        commentsEl.appendChild(statusEl);

        const addComment = () => {
            return fetch(
                "https://wedev-api.sky.pro/api/v1/:ealiakberov/comments",
                {
                    method: "POST",
                    body: JSON.stringify({ ...newComment, forceError: true }),
                },
            )
                .then((response) => {
                    if (response.status === 400 || response.status === 500)
                        throw new Error(response.status);
                    nameEl.value = "";
                    textEl.value = "";
                    return fetchAndRenderComments();
                })
                .catch((error) => {
                    switch (error.message) {
                        case "400": {
                            alert(
                                "Имя и текст должны быть не менее 3х символов! Попробуйте снова",
                            );
                            break;
                        }
                        case "500": {
                            console.log("Сервер сломался");
                            return addComment();
                            break;
                        }
                    }
                });
        };
        addComment().finally(() => {
            addForm.style = "";
            statusEl.remove();
        });
    });
};
