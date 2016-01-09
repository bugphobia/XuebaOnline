import alt from '../alt';

class QuestionsPageActions {
    JumpTo(pageName) {
        this.dispatch(pageName);
    }
    AddQuestion(q) {
        this.dispatch(q);
    }
    getUnsolvedQuestions() {
        this.dispatch();
    }
    receiveUnsolvedQuestions(response) {
        this.dispatch(response);
    }
}

module.exports = alt.createActions(QuestionsPageActions);
