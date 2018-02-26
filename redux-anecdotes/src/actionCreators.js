const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default {
    vote(id) {
        return {
            type: 'VOTE',
            data : { id }
        }
    },
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content,
                votes: 0,
                id: generateId()
            }
        }
    }
}
