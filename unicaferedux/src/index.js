import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer'
import {createStore} from 'redux'



const store = createStore(reducer)

const Statistiikka = () => {
    const state = store.getState()
    const palautteita = state.good + state.ok + state.bad

    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    const keskiarvo = (state.good - state.bad) / palautteita
    const positiivisia = (state.good / palautteita) * 100

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{state.good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{state.ok}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{state.bad}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{keskiarvo}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{positiivisia}%</td>
                </tr>
                </tbody>
            </table>

            <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={e => store.dispatch({type: 'GOOD'})}>hyvä</button>
                <button onClick={e => store.dispatch({type: 'OK'})}>neutraali</button>
                <button onClick={e => store.dispatch({type: 'BAD'})}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)
