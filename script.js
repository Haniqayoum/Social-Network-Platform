let posts = [];

const postsFeed = document.getElementById("postsFeed");
const postBtn = document.getElementById("postBtn");
const postContent = document.querySelector("textarea");
const postImage = document.getElementById("postImage");
const notifCount = document.getElementById("notifCount");
const notifications = document.getElementById("notifications");
const friendList = document.getElementById("friendList");


const friends = ["Ali", "Sara"];

friends.forEach(name => {
    friendList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        ${name}
        <button class="btn btn-sm btn-primary">Add</button>
    </li>`;
});


postBtn.addEventListener("click", () => {
    const content = postContent.value;
    const image = postImage.files[0] ? URL.createObjectURL(postImage.files[0]) : null;

    if (content.trim() === "" && !image) return;

    const newPost = {
        id: Date.now(),
        user: "Umm e Hani",
        username: "@hani123",
        content: content,
        image: image,
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);
    renderPosts();

    postContent.value = "";
    postImage.value = "";

    addNotification(`${newPost.user} posted something new`);
});

function renderPosts() {
    postsFeed.innerHTML = "";

    posts.forEach(post => {

        let formattedContent = post.content.replace(
            /#(\w+)/g,
            '<a href="#" class="hashtag">#$1</a>'
        );

        const postEl = document.createElement("div");
        postEl.classList.add("card", "mb-4", "p-3", "rounded-4", "shadow-sm");

        postEl.innerHTML = `
            <div class="d-flex mb-2">
                <img src="images/profile1.jpg" class="rounded-circle me-2" width="50" height="50">
                <div>
                    <strong>${post.user}</strong><br>
                    <small class="text-muted">${post.username}</small>
                </div>
            </div>

            <p class="post-content">${formattedContent}</p>

            ${post.image ? `<img src="${post.image}" class="post-image">` : ""}

            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-sm btn-outline-primary" onclick="likePost(${post.id})">
                    <i class="fa-regular fa-thumbs-up"></i> Like (${post.likes})
                </button>

                <button class="btn btn-sm btn-outline-secondary" onclick="commentPost(${post.id})">
                    <i class="fa-regular fa-comment"></i> Comment
                </button>
            </div>
        `;

        postsFeed.appendChild(postEl);
    });
}


function likePost(id) {
    const post = posts.find(p => p.id === id);
    post.likes++;
    renderPosts();
}

function commentPost(id) {
    const comment = prompt("Write your comment:");

    if (comment) {
        const post = posts.find(p => p.id === id);
        post.comments.push(comment);
        renderPosts();

        addNotification(`${post.user} got a new comment`);
    }
}


function addNotification(text) {
    notifications.innerHTML += `
    <li class="list-group-item">
        ${text}
    </li>`;

    notifCount.textContent = parseInt(notifCount.textContent) + 1;
}