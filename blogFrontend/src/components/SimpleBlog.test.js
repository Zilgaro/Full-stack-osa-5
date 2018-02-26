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

  it('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'Nappitesti',
      author: 'Testinappi',
      likes: '9000'
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
        />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
