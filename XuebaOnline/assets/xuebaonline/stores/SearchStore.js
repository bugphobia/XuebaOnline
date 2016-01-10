import alt from '../alt';
import SearchActions from '../actions/SearchActions';
import JumpPageActions from '../actions/JumpPageActions';

class SearchStore {
    constructor() {
        this.state = {
            state:"loading",
            query_content:"",
            numFound:0,
            question_list:[]
        };

        this.bindListeners({
            handleQuery: SearchActions.QUERY,
            handleReceiveQuery: SearchActions.RECEIVE_QUERY
        });
    }

    handleQuery(queryContent) {
        this.query_content = queryContent;
        this.state.state = "loading";
        $.ajax({
            url: '/search/query/',
            dataType: 'json',
            cache: false,
            data:{query_content:queryContent},
            type:"GET",
            success:function(response) {
                SearchActions.ReceiveQuery(response);
                JumpPageActions.JumpTo('searchresults');
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }

    handleReceiveQuery(response) {
        this.state.numFound = response.numFound;
        this.state.question_list = response.question_list;
        console.log(this.state);
    }
}

module.exports = alt.createStore(SearchStore, 'SearchStore');
