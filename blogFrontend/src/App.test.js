import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('user not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })
    it('does not render any blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('user logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tutturuu',
        name: 'asdsad',
        token: 'llllll'
      }

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders blogs after login', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
