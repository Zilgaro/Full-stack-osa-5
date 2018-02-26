import React from 'react';
import actionFor from './actionCreators'


class App extends React.Component {

    handleVote = (id) => () => {
        this.props.store.dispatch(
            actionFor.vote(id)
        )
    }

    addAnecdote = (event) => {
        event.preventDefault()
        this.props.store.dispatch(
            actionFor.anecdoteCreation(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }
  render() {
    const anecdotes = this.props.store.getState().sort((a,b) => {return b.votes - a.votes})
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App