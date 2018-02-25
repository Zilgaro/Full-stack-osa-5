import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            likes: this.props.blog.likes,
            user: this.props.blog.user === undefined ? '' : this.props.blog.user
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    likeBlog = async (event) => {
        event.preventDefault()

        let updateBlog

        if (this.props.blog.user === undefined) {
             updateBlog = {
                title: this.props.blog.title,
                author: this.props.blog.author,
                likes: this.state.likes + 1,
                url: this.props.blog.url
            }
        } else {
             updateBlog = {
                user: this.props.blog.user._id,
                title: this.props.blog.title,
                author: this.props.blog.author,
                likes: this.state.likes + 1,
                url: this.props.blog.url

            }
        }

        try {
          await blogService.update(this.props.blog._id, updateBlog)
          this.setState({likes: updateBlog.likes})
        } catch (exception) {
          console.log(exception)
        }

    }

    deleteBlog = async (event) => {
      event.preventDefault()

        const message = `Delete ${this.props.blog.title} by ${this.props.blog.author}?`
        const result = window.confirm(message)

        if (result) {
          try {
            await blogService.remove(this.props.blog._id)
            await this.props.reFetch()
          } catch (exception) {
            console.log(exception)
          }
        }
    }



    render () {
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }
        const showWhenUserDefined = {display: this.props.blog.user === undefined ? 'none' : ''}
        const showWhenUserMatches = {display: this.props.user.username === this.state.user.username || this.state.user === '' ? '' : 'none'}
        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const listStyle = {
            'listStyle': 'none'
        }

        return (
            <div style={blogStyle}>
              <div onClick={this.toggleVisibility}>
                  {this.props.blog.title} {this.props.blog.author}
              </div>
              <div style={showWhenVisible}>
                 <div >
                     <ul style={listStyle}>
                       <li>{this.props.blog.url} </li>
                       <li>{this.state.likes} tykkäystä <button onClick={this.likeBlog}>tykkää</button> </li>
                       <li style={showWhenUserDefined}> blogin lisääjä oli {this.state.user.name} </li>
                       <button style={showWhenUserMatches} onClick={this.deleteBlog}>poista</button>
                     </ul>
                 </div>
              </div>
            </div>
        )
    }
}

export default Blog