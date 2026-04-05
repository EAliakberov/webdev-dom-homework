import { comments } from "./comments.js";
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
      textEl.value = `>${comments[index].name}\n"${comments[index].text}"\n`
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<");
    });

    //Клик по лайку внутри коммента и вызов перерисоки только лайков
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (comments[index].liked) {
        comments[index].liked = false;
        comments[index].likesCount--;
      } else {
        comments[index].liked = true;
        comments[index].likesCount++;
      }
      renderLike(commentEl, index);
    });
  }

  addBtnEl.addEventListener("click", () => {
    if (nameEl.value.trim() === "" || textEl.value.trim() === "") {
      return;
    }

    const date = new Date();

    const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };
    const dateStr = date.toLocaleDateString("ru-RU", dateOptions);

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const timeStr = date.toLocaleTimeString("ru-RU", timeOptions);

    comments.push({
      name: nameEl.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;").trim(),
      text: textEl.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;").trim(),
      date: `${dateStr} ${timeStr}`,
      likesCount: 0,
      liked: false,
    });
    renderComments();
  });
};
