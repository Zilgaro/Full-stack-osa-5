import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Entsyymillä testiä',
      author: 'Testiä entsyymillä',
      likes : 9001
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(titleDiv.text()).toContain(blog.title)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})
