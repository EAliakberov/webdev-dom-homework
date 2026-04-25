"use strict";

import { comments, updateComments } from "./comments.js";
import {
    initAddListener,
    initListeners,
    initLoginListeners,
    initRegistrationListeners,
} from "./listeners.js";
import { defaultUser, getComments } from "./api.js";
import { currentUser } from "./api.js";

export const containerEl = document.querySelector(".container");

const formatted = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
});

export function fetchAndRenderComments() {
    return getComments().then((data) => {
        updateComments(data.comments);
        return renderComments();
    });
}

//Рендер только лайка и счетчика для экономии ресурсов
export const renderLike = (commentEl, index) => {
    const likeBtn = commentEl.querySelector(".like-button");
    const likeCntr = commentEl.querySelector(".likes-counter");

    comments[index].isliked
        ? likeBtn.classList.add("-active-like")
        : likeBtn.classList.remove("-active-like");
    likeCntr.textContent = comments[index].likes;
};

export function renderCommentsPage() {
    let style = "";
    document.body.style = `background-image: url("${currentUser.img}"); background-size: 100%;`;
    if (currentUser.token === defaultUser.token) {
        style = "display: none";
        document.body.style = "";
    }

    containerEl.innerHTML = `
    <ul class="comments">
                Подождите, комментарии загружаются...
            </ul>
            <div class="add-form" style="${style}" >
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    value="${currentUser.name}"
                    readonly="on"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>`;
    if (currentUser.token === defaultUser.token) {
        const button = document.createElement("button");
        button.classList.add("registration-form-login-btn");
        button.textContent = "Авторизироваться, чтобы оставлять комментарии";
        button.onclick = () => {
            renderLoginPage();
        };
        containerEl.appendChild(button);
    }

    initAddListener();
    fetchAndRenderComments();
}

//Рендер всех комментариев сразу
export function renderComments() {
    const commentsEl = document.querySelector("ul.comments");
    commentsEl.innerHTML = comments
        .map((comment, index) => {
            return `<li class="comment animate__animated animate__fadeInLeft" data-id="${comment.id}" data-index="${index}">
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
}

export function renderLoginPage() {
    containerEl.innerHTML = `
            <form class="login-form animate__animated animate__headShake" method="post">
                <input
                    type="text"
                    class="login-form-name"
                    placeholder="Логин"
                />
                <input
                    type="password"
                    class="login-form-password"
                    placeholder="Пароль"
                    autocomplete="on"
                />
                <div class="login-form-row">
                    <button class="login-form-login-btn" type="submit">
                        Войти
                    </button>
                    <button class="login-form-register-btn" type="button">
                        Регистрация
                    </button>
                </div>
            </form>`;
    initLoginListeners();
}

export function renderRegistrationPage() {
    containerEl.innerHTML = `
            <form class="registration-form  animate__animated animate__headShake" method="post">
                <input
                    type="text"
                    class="registration-form-login"
                    placeholder="Логин"
                />
                <input
                    type="text"
                    class="registration-form-name"
                    placeholder="Имя"
                />
                <input
                    type="password"
                    class="registration-form-password"
                    placeholder="Пароль"
                    autocomplete="on"
                />
                <div class="registration-form-row">
                    <button class="registration-form-login-btn" type="button">
                        Вход
                    </button>
                    <button class="registration-form-register-btn" type="submit">
                        Зарегистрироваться
                    </button>
                </div>
            </form>`;
    initRegistrationListeners();
}
