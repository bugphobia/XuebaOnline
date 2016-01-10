from django.test import TestCase, Client

from .models import XBQuestion, XBAnswer, XBTag, XBVote 
from django.contrib.auth.models import User
from accounts.models import UserProfile
# Create your tests here.

class TagCreateTests(TestCase):
    def test_create(self):
        newtag = XBTag(name='testTag', excerpt='A test tag.')
        newtag.save()
        searchtag = XBTag.objects.get(name="testTag")
        self.assertIn('A test tag.',searchtag.excerpt)
        print("In tag-create test---->>>>Success") 

class TagModelManiTests(TestCase):
    
    def setUp(self):
        newtag = XBTag(name='testTag1', excerpt='A test tag1.')
        newtag.save()
        newtag = XBTag(name='testTag2', excerpt='A test tag2.')
        newtag.save()
        newtag = XBTag(name='testTag3', excerpt='A test tag3.')
        newtag.save()
        newtag = XBTag(name='testTag4', excerpt='A test tag4.')
        newtag.save()
        newtag = XBTag(name='testTag5', excerpt='A test tag5.')
        newtag.save()
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)

    def test_tagget(self):
        searchtag = XBTag.objects.get(name="testTag2")
        self.assertIn('A test tag2.',searchtag.excerpt)
        print("In tag-get test---->>>>Success")
    
    def test_tagmodify(self):
        searchtag = XBTag.objects.get(name="testTag3")
        searchtag.excerpt = "changed tag"
        searchtag.save()
        another = XBTag.objects.get(name="testTag3")
        self.assertIn("changed tag", another.excerpt)
        print("In tag-modify test---->>>>Success")

    def test_create_question(self):
        theUser = User.objects.get(username='UnitTestUser')  
        newQuestion = XBQuestion(uid=theUser, title="TestQ", content="Testcontent");
        searchtag = XBTag.objects.get(name="testTag3")
        newQuestion.save()
        newQuestion.tags.add(searchtag)
        newQuestion.save()
        theQuestion = XBQuestion.objects.get(title="TestQ")
        self.assertIn("Testcontent", theQuestion.content)
        print("In question-create test---->>>>Success")

class QuestionModifyTests(TestCase):
    
    def setUp(self):
        newtag = XBTag(name='testTag3', excerpt='A test tag3.')
        newtag.save()
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)
        theUser = User.objects.get(username='UnitTestUser')  
        newQuestion = XBQuestion(uid=theUser, title="TestQ", content="Testcontent");
        searchtag = XBTag.objects.get(name="testTag3")
        newQuestion.save()
        newQuestion.tags.add(searchtag)
        newQuestion.save()
    
    def test_question_find(self):
        aQuestion = XBQuestion.objects.get(title="TestQ") 
        self.assertIn("Testcontent", aQuestion.content)
        print("In question-get test---->>>>Success")

    def test_question_change(self):
        aQuestion = XBQuestion.objects.get(title="TestQ")    
        aQuestion.content="Another content"
        aQuestion.save()
        theQuestion = XBQuestion.objects.get(title="TestQ")
        self.assertIn("Another content", theQuestion.content)
        print("In question-modify test---->>>>Success")

    def test_answer_make(self):
        theUser = User.objects.get(username='UnitTestUser') 
        theQuestion = XBQuestion.objects.get(title="TestQ")
        newAnswer = XBAnswer(uid=theUser, qid=theQuestion, content="TestAnswer")
        newAnswer.save()
        answerid = newAnswer.aid
        theAnswer = XBAnswer.objects.get(aid=answerid)
        self.assertIn("TestAnswer", theAnswer.content)
        print("In answer-create test---->>>>Success")

class AnswerModifyTests(TestCase):

    def setUp(self):
        newtag = XBTag(name='testTag3', excerpt='A test tag3.')
        newtag.save()
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)
        theUser = User.objects.get(username='UnitTestUser')  
        newQuestion = XBQuestion(uid=theUser, title="TestQ", content="Testcontent");
        searchtag = XBTag.objects.get(name="testTag3")
        newQuestion.save()
        newQuestion.tags.add(searchtag)
        newQuestion.save()
        theQuestion = XBQuestion.objects.get(title="TestQ")
        newAnswer = XBAnswer(uid=theUser, qid=theQuestion, content="TestAnswer")
        newAnswer.save()

    def test_answer_get(self):
        theUser = User.objects.get(username='UnitTestUser')  
        theQuestion = XBQuestion.objects.get(title="TestQ")
        theAnswer=XBAnswer.objects.get(uid=theUser,qid=theQuestion)
        self.assertIn("TestAnswer", theAnswer.content)
        print("In answer-get test---->>>>Success")

    def test_answer_change(self):
        theUser = User.objects.get(username='UnitTestUser')  
        theQuestion = XBQuestion.objects.get(title="TestQ")
        theAnswer=XBAnswer.objects.get(uid=theUser,qid=theQuestion)
        theAnswer.content = "answer change"
        theAnswer.save()
        aAnswer = XBAnswer.objects.get(uid=theUser,qid=theQuestion)
        self.assertIn("answer change", aAnswer.content)
        print("In answer-change test---->>>>Success")

    def test_vote_make(self):
        theUser = User.objects.get(username='UnitTestUser')  
        theQuestion = XBQuestion.objects.get(title="TestQ")
        theAnswer=XBAnswer.objects.get(uid=theUser,qid=theQuestion)
        newVote = XBVote(aid=theAnswer, uid=theUser)
        newVote.save()
        theVote = XBVote(aid=theAnswer, uid=theUser)
        self.assertEqual(theVote.up, 1)
        print("In vote-make test---->>>>Success")  

class DatabaseTotalTest(TestCase):

    def setUp(self):
        newtag = XBTag(name='testTag3', excerpt='A test tag3.')
        newtag.save()
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)
        theUser = User.objects.get(username='UnitTestUser')  
        newQuestion = XBQuestion(uid=theUser, title="TestQ", content="Testcontent");
        searchtag = XBTag.objects.get(name="testTag3")
        newQuestion.save()
        newQuestion.tags.add(searchtag)
        newQuestion.save()
        theQuestion = XBQuestion.objects.get(title="TestQ")
        newAnswer = XBAnswer(uid=theUser, qid=theQuestion, content="TestAnswer")
        newAnswer.save()
        theAnswer = XBAnswer.objects.get(uid=theUser, qid=theQuestion, content="TestAnswer")
        newVote = XBVote(aid=theAnswer, uid=theUser)
        newVote.save()

    def test_vote_twice(self):
        theUser = User.objects.get(username='UnitTestUser')
        theQuestion = XBQuestion.objects.get(title="TestQ")
        theAnswer = XBAnswer.objects.get(uid=theUser, qid=theQuestion, content="TestAnswer")
        theVote = XBVote.objects.get(aid=theAnswer, uid=theUser)
        theVote.up=0
        theVote.save()
        aVote = XBVote.objects.get(aid=theAnswer, uid=theUser)
        self.assertEqual(aVote.up, 0)
        print("In vote-twice-click test---->>>>Success")