export const comments = [
    {
        name: "Глеб Фокин",
        text: "Это будет первый комментарий на этой странице",
        date: "12.02.22 12:18",
        likesCount: 3,
        liked: false,
    },
    {
        name: "Варвара Н.",
        text: "Мне нравится как оформлена эта страница! ❤",
        date: "13.02.22 19:22",
        likesCount: 75,
        liked: true,
    },
]

fetch("https://wedev-api.sky.pro/api/v1/:ealiakberov/comments", {
    method: "GET",
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data.comments)
    })
