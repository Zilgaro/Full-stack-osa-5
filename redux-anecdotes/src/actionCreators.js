export default {
    vote(id) {
        return {
            type: 'VOTE',
            data : { id }
        }
    }
}
