// Generate Unique Token
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const api = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: token
};

// CATEGORIES
export const getCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then((res) => res.json())
    .then((data) => data.categories);
};

export const getPostsInCategory = (category) => {
  return fetch(`${api}/${category}/posts`)
    .then((res) => res.json())
    .then((posts) => posts);
};

// POSTS
export const getPost = (postId) => {
  fetch(`${api}/posts/${postId}`, { headers })
    .then((res) => res.json())
    .then((post) => post);
};

export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then((res) => {
      return res.json();
    })
    .then((posts) => {
      return posts;
    });
};

export const createPost = (post) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then((res) => res.json)
    .then((post) => post);
};

export const updatePost = (postId, title, body) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
    .then((res) => res.json)
    .then((post) => post);
};

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json)
    .then((post) => post);
};

export const vote = (postId, vote) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  })
    .then((res) => res.json)
    .then((post) => post.json);
};

// COMMENTS

// GET /posts/:id/comments
// USAGE:
//   Get all the comments for a single post

export const getPostComments = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then((res) => {
      return res.json();
    })
    .then((comments) => {
      return comments;
    });
};

// POST /comments
// USAGE:
//   Add a comment to a post

// PARAMS:
//   id: Any unique ID. As with posts, UUID is probably the best here.
//   timestamp: timestamp. Get this however you want.
//   body: String
//   author: String
//   parentId: Should match a post id in the database.

// GET /comments/:id
// USAGE:
//   Get the details for a single comment

// POST /comments/:id
// USAGE:
//   Used for voting on a comment.
// PARAMS:
//   option - String: Either "upVote" or "downVote"

// PUT /comments/:id
// USAGE:
//   Edit the details of an existing comment

// PARAMS:
//   timestamp: timestamp. Get this however you want.
//   body: String

// DELETE /comments/:id
// USAGE:
//   Sets a comment's deleted flag to 'true'
