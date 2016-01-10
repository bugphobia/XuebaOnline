import alt from '../alt';

class SearchActions {
    Query(queryContent) {
        this.dispatch(queryContent);
    }
    ReceiveQuery(response) {
        this.dispatch(response);
    }
}

module.exports = alt.createActions(SearchActions);
