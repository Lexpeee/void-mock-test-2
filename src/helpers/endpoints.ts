
const endpoints = [
  {
    name: "getPostDetails",
    request: "GET",
    url: '/posts/:id',
    hasParams: true
  },
  {
    name: "getPosts",
    request: "GET",
    url: '/posts',
    hasParams: true
  }
]

export default endpoints