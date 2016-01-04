import alt from '../alt';
import TagActions from '../actions/TagActions'

window.jQuery = window.$ = require('../jquery.js');

class TagStore {
    constructor() {
        this.state = {
            state:'loading',
            tags:[]
        };

        this.bindListeners({
            handleFetch: TagActions.FETCH,
            handleReceiveTags: TagActions.RECEIVE_TAGS
        });
    }

    handleFetch(pageNum) {
        this.state.state = 'loading';
        $.ajax({
            url: '/accounts/tags/',
            dataType: 'json',
            cache: false,
            type:"GET",
            data:{pageNum:pageNum},
            success:function(response){
                TagActions.ReceiveTags(response);
            },
            error: function(xhr, status, err) {
                TagActions.ReceiveTags({state:'failed',errors:[err]});
            }
        });
    }

    handleReceiveTags(response) {
        if (response.state=='ok') {
            this.state.state = 'ok';
            this.state.tags=response.tags;
            console.log(response);
            console.log(this.state);
        } else {
            this.state.state = 'failed';
        }
        //console.log(this.state);
    }
}

module.exports = alt.createStore(TagStore, 'TagStore');
