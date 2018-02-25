import React from 'react'

const BlogForm = (props) => {
    return (
    <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={props.addBlog}>
            <div>
                title
                <input
                    name="title"
                    value={props.title}
                    onChange={props.handleBlogChange}
                />
            </div>
            <div>
                author
                <input
                    name="author"
                    value={props.author}
                    onChange={props.handleBlogChange}
                />
            </div>
            <div>
                url
                <input
                    name="url"
                    value={props.url}
                    onChange={props.handleBlogChange}
                />
            </div>
            <button type="submit">tallenna</button>
        </form>
    </div>
    )}
export default BlogForm