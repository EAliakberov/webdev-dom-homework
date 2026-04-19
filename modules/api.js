const host = "https://wedev-api.sky.pro/api/v2/:ealiakberov";
const tokenApiHost = "https://wedev-api.sky.pro/api/user";
export const defaultUser = {
    token: "Bearer ksdfsksdfjfsdjk",
    name: "Аноним",
    login: "Anonimus",
};
export let currentUser = { ...defaultUser };

export function getComments() {
    return fetch(host + "/comments", {
        method: "GET",
        headers: {
            Authorization: currentUser.token,
        },
    }).then((response) => {
        return response.json();
    });
}

export function postComment(
    newComment = { name: "Имя", text: "Текстозаменитель" },
) {
    return fetch(host + "/comments", {
        method: "POST",
        headers: {
            Authorization: currentUser.token,
        },
        body: JSON.stringify({
            text: newComment.text,
        }),
    });
}

export function login(login, password) {
    return fetch(tokenApiHost + "/login", {
        method: "POST",
        body: JSON.stringify({ login: login, password: password }),
    })
        .then((response) => {
            debugger;
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.error);
                });
            } else return response.json();
        })
        .then((data) => {
            currentUser = {
                name: data.user.name,
                id: data.user._id,
                token: "Bearer " + data.user.token,
                login: data.user.login,
                img: data.user.imageUrl
            };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        });
}

export function register(name, login, password) {
    return fetch(tokenApiHost, {
        method: "POST",
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.error);
                });
            } else return response.json();
        })
        .then((data) => {
            currentUser = {
                name: data.user.name,
                id: data.user._id,
                token: "Bearer " + data.user.token,
                login: data.user.login,
                img: data.user.imageUrl
            };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        });
}
