let token = null

const blogs = [
  {
    title: 'sdasdasdsda',
    author: 'sss',
    url: 'https://www.youtube.com/',
    likes: 9001,
    user: {
      _id: 'sdasad',
      username: 'aaabbb',
      name: 'Aaaaa'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
}

export default {getAll, setToken, blogs}
