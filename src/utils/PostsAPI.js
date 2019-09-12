const api = 'http://localhost:3001/posts';

// Generate Unique Token
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getPost = (postId) => {
  fetch(`${api}/${postId}`, { headers })
    .then((res) => res.json())
    .then((post) => post);
};

export const getAllPosts = () => {
  return fetch(`${api}`, { headers })
    .then((res) => {
      return res.json();
    })
    .then((posts) => {
      return posts;
    });
};

export const createPost = (post) => {
  return fetch(`${api}`, {
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
  return fetch(`${api}/postId`, {
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
  return fetch(`${api}/postId`, {
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
  return fetch(`${api}/postId`, {
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
