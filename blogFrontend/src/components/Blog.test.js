import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

  it('displays title and author', () => {
    const blog = {
      title: 'Testausta',
      author: 'Jaba',
      url: 'https://www.youtube.com/',
      likes: 9001
    }

    const user = {
      username: 'testi',
      name: 'Testi'
    }

    const blogComponent = shallow(<Blog blog={blog} user={user}/>)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')


    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
  })
  it('at start additional content is not shown', () => {
    const blog = {
      title: 'Testausta',
      author: 'Jaba',
      url: 'https://www.youtube.com/',
      likes: 9001
    }

    const user = {
      username: 'testi',
      name: 'Testi'
    }

    const blogComponent = shallow(<Blog blog={blog} user={user}/>)
    const div = blogComponent.find('.additionalContent')
    expect(div.getElement().props.style).toEqual({display: 'none'})
  })
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Testausta',
      author: 'Jaba',
      url: 'https://www.youtube.com/',
      likes: 9001
    }

    const user = {
      username: 'testi',
      name: 'Testi'
    }

    const blogComponent = shallow(<Blog blog={blog} user={user}/>)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    titleAndAuthorDiv.simulate('click')

    const contentDiv = blogComponent.find('.additionalContent')
    expect(contentDiv.getElement().props.style).toEqual({display: ''})
    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)
  })
})
