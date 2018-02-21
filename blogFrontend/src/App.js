import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
        password: '',
        username: '',
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


    render() {
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

        if (this.state.user === null) {
            return (
                loginForm()
            )
        }
    return (
      <div>
        <h2>blogs</h2>
          <div>
              {this.state.user.name} logged in
              <button onClick={this.logOut}>Log out</button>
          </div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}
export default App;
