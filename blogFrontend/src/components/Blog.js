import React from 'react'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render () {
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

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
                     {this.props.blog.likes} tykkäystä <button>tykkää</button> <br/>
                     blogin lisääjä oli {this.props.blog.user.name}
                 </div>
              </div>
            </div>
        )
    }
}

export default Blog