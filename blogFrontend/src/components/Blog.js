import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            likes: this.props.blog.likes,
            name: this.props.blog.user === undefined ? '' : this.props.blog.user.name
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
          const response = await blogService.update(this.props.blog._id, updateBlog)
          console.log(response)
          this.setState({likes: updateBlog.likes})
        } catch (exception) {
          console.log(exception)
        }

    }



    render () {
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }
        const showWhenUserDefined = {display: this.props.blog.user === undefined ? 'none' : ''}
        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const listStyle = {
          paddingLeft: 8
        }

        return (
            <div style={blogStyle}>
              <div onClick={this.toggleVisibility}>
                  {this.props.blog.title} {this.props.blog.author}
              </div>
              <div style={showWhenVisible}>
                 <div style={listStyle}>
                     {this.props.blog.url} <br/>
                     {this.state.likes} tykkäystä <button onClick={this.likeBlog}>tykkää</button> <br/>
                   <p style={showWhenUserDefined}> blogin lisääjä oli {this.state.name} </p>
                     <button>poista</button>
                 </div>
              </div>
            </div>
        )
    }
}

export default Blog