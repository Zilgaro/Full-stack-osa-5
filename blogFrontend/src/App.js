import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
        password: '',
        username: '',
        title: '',
        author: '',
        url: '',
        blogFormVisible: true,
        user: null,
        error: null
    }
  }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({ blogs })
        )

        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
            blogService.setToken(user.token)
        }
    }

  handleLoginFieldChange = (event) => {
      if (event.target.name === 'password') {
            this.setState({ password: event.target.value })
      } else if (event.target.name === 'username') {
            this.setState({ username: event.target.value })
      }
  }

  handleBlogChange = (event) => {
    if (event.target.name === 'title') {
        this.setState({ title: event.target.value })
    } else if (event.target.name === 'author') {
        this.setState({ author: event.target.value })
    } else if (event.target.name === 'url') {
        this.setState({ url: event.target.value })
    }
  }

  reFetchBlogs = () => {
      return async () =>  {
          const blogs = await
          blogService.getAll()
          this.setState({blogs: blogs})
      }
  }

  login = async (event) => {
      event.preventDefault()

      try{
          const user = await loginService.login({
              username: this.state.username,
              password: this.state.password
          })

          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
          blogService.setToken(user.token)
          this.setState({ username: '', password: '', user})
      } catch(exception) {
          this.setState({
              error: 'käyttäjätunnus tai salasana virheellinen',
          })
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
      }
  }

    logOut = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        this.setState({user: null})

    }

  addBlog = async (event) => {
      event.preventDefault()

      const newBlog = {
          title: this.state.title,
          author: this.state.author,
          url: this.state.url
      }

      try {

          const addedBlog = await blogService.create(newBlog)
          this.setState(
              {
                  blogs: this.state.blogs.concat(addedBlog),
                  title: '',
                  author: '',
                  url: ''
              })
          this.setState({error: `a new blog "${newBlog.title}" by ${newBlog.author} added`})
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
      } catch (exception) {
          this.setState({error: "Tarvittavia kenttiä puuttuu"})
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
      }
  }

    render() {

        const sortedBlogs = this.state.blogs.sort((a,b) => {return b.likes - a.likes})
        const loginForm = () => (
            <div>
              <h2>Kirjaudu</h2>
              <Notification message={this.state.error} />
              <form onSubmit={this.login}>
                <div>
                  käyttäjätunnus
                  <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleLoginFieldChange}
                  />
                </div>
                <div>
                  salasana
                  <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleLoginFieldChange}
                  />
                </div>
                <button type="submit">kirjaudu</button>
              </form>
            </div>
        )

        const blogForm = () => {
            return (
            <div>
                <Togglable buttonLabel="uusi blogi">
                    <BlogForm
                     handleBlogChange={this.handleBlogChange}
                     addBlog={this.addBlog}
                     title={this.state.title}
                     author={this.state.author}
                     url={this.state.url}
                     />
                </Togglable>
            </div>
        )
        }
        if (this.state.user === null) {
            return (
                loginForm()
            )
        }
    return (
      <div>
        <h2>blogs</h2>
          <div>
              <Notification message={this.state.error} />
              {this.state.user.name} logged in
              <button onClick={this.logOut}>Log out</button>
          </div>

          {blogForm()}

        {sortedBlogs.map(blog =>
          <Blog key={blog._id} blog={blog} user={this.state.user} reFetch={this.reFetchBlogs()}/>
        )}
      </div>
    );
  }
}

export default App;
