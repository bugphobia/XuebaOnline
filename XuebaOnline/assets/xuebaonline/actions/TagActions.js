import alt from '../alt';

class TagActions {
    Fetch(pageNum) {
        this.dispatch(pageNum);
    }
    ReceiveTags(response) {
        this.dispatch(response);
    }
}

module.exports = alt.createActions(TagActions);
