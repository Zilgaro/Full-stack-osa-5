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
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}
export default App;
