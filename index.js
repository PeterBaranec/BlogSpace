let postsArray = [];

function renderPosts() {
  let html = "";
  for (let post of postsArray) {
    html += `
           <h3>${post.title}</h3>
           <p>${post.body}</p>
           <hr />
          `;
  }
  document.getElementById("blog-list").innerHTML = html;
}

function clearInputForm() {
  document.getElementById("post-title").value = "";
  document.getElementById("post-body").value = "";
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

document.getElementById("new-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((data) => {
      postsArray.unshift(data);
      renderPosts();
      clearInputForm();
    });
});
