from django.test import TestCase, Client

# Create your tests here.
class AccountsRequestTests(TestCase):
    
    def setUp(self):
        self.client = Client()

    def test_query(self):
        response = self.client.get('/search/query/',{'query_content':'javascript'})
        self.assertEqual(response.status_code, 200)
        print("In query-request test---->>>>Success")