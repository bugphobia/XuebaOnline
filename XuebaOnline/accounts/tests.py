from django.test import TestCase, Client

from .models import UserProfile
from django.contrib.auth.models import User

# Create your tests here.

class AccountsMethodTests(TestCase):

    def setUp(self):
        self.client = Client()

    def test_register(self):
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        print("In signup test---->>>>Success")

    def test_login(self):
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)
        print("In signin test---->>>>Success")

class AccountsOtherTests(TestCase):

    def setUp(self):
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)

    def test_userinfo_get(self):
        theUser = User.objects.get(username='UnitTestUser')
        testProfile = UserProfile.objects.get(user=theUser)
        self.assertIn('123456@gmail.com', theUser.email)
        print("In userinfo-get test---->>>>Success")

    def test_profile_set(self):
        theUser = User.objects.get(username='UnitTestUser')
        testProfile = UserProfile.objects.get(user=theUser)
        testProfile.display = "This is a test"
        testProfile.save()
        self.assertIn("This is a test", testProfile.display)
        print("In profile-set test---->>>>Success")

    def test_profile_change(self):
        theUser = User.objects.get(username='UnitTestUser')
        testProfile = UserProfile.objects.get(user=theUser)
        testProfile.display = "This is another test"
        testProfile.save()
        self.assertIn("This is another test", testProfile.display)
        print("In profile-modify test---->>>>Success")

class AccountsRequestTests(TestCase):

    def setUp(self):
        self.client = Client()
        response = self.client.post('/accounts/signup/',{'username':'UnitTestUser','password':'123456','repassword':'123456','email':'123456@gmail.com'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/accounts/login/',{'username':'UnitTestUser','password':'123456'})
        self.assertEqual(response.status_code, 200)

    def test_logout_request(self):
        response = self.client.get('/accounts/logout/')
        self.assertEqual(response.status_code, 200)
        print("In logout-request test---->>>>Success")

    def test_tags_getrequest(self):
        response = self.client.get('/accounts/tags/',{'pageNum':0})
        self.assertEqual(response.status_code,200)
        print("In tagsget-request test---->>>>Success")

    def test_liketag_action(self):
        response = self.client.get('/accounts/liketag/',{'tag':'jquery'})
        self.assertEqual(response.status_code,200)
        print("In liketag-action test---->>>>Success")

    def test_disliketag_action(self):
        response = self.client.get('/accounts/disliketag/',{'tag':'jquery'})
        self.assertEqual(response.status_code,200)
        print("In disliketag-action test---->>>>Success")

    def test_home_info(self):
        response = self.client.post('/accounts/')
        self.assertEqual(response.status_code, 200)
        print("In user-homeinfo-request test---->>>>Success")    