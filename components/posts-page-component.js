import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { getToken, posts, goToPage, user } from "../index.js";
import { likeChange } from "../api.js";
import { timeAgo } from "../helpers.js";

export function renderPostsPageComponent({ appEl }) {
  const postsHtml = [];

  posts.forEach((post) => {
    const likePosition = post.isLiked
    let likeSvg = likePosition ? "like-active.svg" : "like-not-active.svg";
    postsHtml.push(
    `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div id="${post.id}" class="post-likes">
        <button data-id="${post.id}" data-like="${post.isLiked}" class="like-button">
          <img src="./assets/images/${likeSvg}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${timeAgo(new Date(post.createdAt))}
      </p>
    </li>`
    )
  })

 
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml.join('')}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
  console.log(user);

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  renderLike()
}

function renderLike() {
  for (let likesButtons of document.querySelectorAll(".like-button")) {
    likesButtons.addEventListener("click", () => {
      if (!user) {
        alert("Только зарегистрированные пользователи могут ставить лайки");
        return;;
      };
      const postId = likesButtons.dataset.id

      const likePosition = (likesButtons.dataset.like == "true") ? "dislike" : "like";

      likeChange({token: getToken(), postId, likePosition})
      .then((post) => {
        const likeItem = document.getElementById(post.id)
        const likePosition = post.isLiked
        let likeSvg = likePosition ? "like-active.svg" : "like-not-active.svg";
        likeItem.innerHTML = `
        <div id="${post.id}" class="post-likes">
          <button data-id="${post.id}" data-like="${post.isLiked}" class="like-button">
            <img src="./assets/images/${likeSvg}">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${likeUsers(post.likes.length)}</strong>
          </p>
        </div>`;
      renderLike();
      })
    });
  }
}

function likeUsers (users){
  if (users===1) {return "Нравится "+user.name};
  if (users===0) {return ""};
  if (users>1) {return "Нравится "+user.name+" и еще "+ (users-1)};
}


