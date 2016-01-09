import alt from '../alt';
import QuestionsPageActions from '../actions/QuestionsPageActions'

class QuestionsPageStore {
    constructor() {
        this.state = {
            currentTab:"unsolved",
            unsolvedQuestions: []
        };

        this.bindListeners({
            handleJumpTo: QuestionsPageActions.JUMP_TO,
            handleAddQuestion: QuestionsPageActions.ADD_QUESTION,
            handleGetUnsolvedQuestions: QuestionsPageActions.GET_UNSOLVED_QUESTIONS,
            handleReceiveUnsolvedQuestions: QuestionsPageActions.RECEIVE_UNSOLVED_QUESTIONS
        });
    }
    
    handleJumpTo(pageName) {
        this.state.currentTab = pageName;
    }

    handleReceiveUnsolvedQuestions(response) {
        if (response.state == 'ok') {
            this.state.unsolvedQuestions = response.question;
        }
    }

    handleGetUnsolvedQuestions() {
        $.ajax({
            url: '/question/getUnsolvedQuestions/',
            dataType: 'json',
            cache: false,
            type:"GET",
            success:function(response){
                QuestionsPageActions.receiveUnsolvedQuestions(response);
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }

    handleAddQuestion(q) {
        $.ajax({
            url: '/question/addQuestion/',
            dataType: 'json',
            cache: false,
            data:q,
            type:"GET",
            success:function(response){
                QuestionsPageActions.getUnsolvedQuestions();
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }
}

module.exports = alt.createStore(QuestionsPageStore, 'QuestionsPageStore');
