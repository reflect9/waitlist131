import re, json, os, logging, random, string, collections
import webapp2, jinja2
from google.appengine.ext import ndb
from datetime import datetime
import pprint
import csv, itertools, operator, copy

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("templates"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

# templates_dir = os.path.join(os.path.dirname(__file__), 'assets/html')

class SurveyData(ndb.Model):
    created_date = ndb.DateTimeProperty(auto_now_add=True)
    userid = ndb.StringProperty()
    emailClient = ndb.StringProperty()
    browser = ndb.StringProperty()
    numEmails = ndb.StringProperty()
    freqOpenEmails = ndb.StringProperty()
    importantReasons = ndb.StringProperty(repeated=True)
    importantReasonsOther = ndb.StringProperty()
    rawMessage = ndb.TextProperty()

class PromotionEmail(ndb.Model):
    raw = ndb.TextProperty()
    sender = ndb.StringProperty()
    created_date = ndb.DateTimeProperty()
    sent_date = ndb.DateTimeProperty() 
    html = ndb.TextProperty()
    features = ndb.JsonProperty()
    
class LandingPage(ndb.Model):
    url = ndb.StringProperty()
    promotion_email = ndb.KeyProperty(kind = PromotionEmail)
    created_date = ndb.DateTimeProperty(auto_now_add=True)
    html = ndb.TextProperty()
    features = ndb.JsonProperty()

class Evalution(ndb.Model):
    link_clicked = ndb.StringProperty()

################################################################
class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write("/survey, /evaluteRelevance, /setup");

class SurveyHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('main.html')
        html = template.render(template_values)
        self.response.out.write(html)

class SurveySubmitHandler(webapp2.RequestHandler):
    def post(self):
        sd = SurveyData();     
        logging.info("========================= BEGINNING")   
        data = json.loads(self.request.get("json"))
        logging.info(data)
        ## STORING SURVEY DATA
        sd.emailClient = data["emailClient"]
        sd.browser = data["browser"]
        sd.numEmails = data["numEmails"]
        sd.freqOpenEmails = data["freqOpenEmails"]
        sd.importantReasons = data["importantReasons"]
        if 'importantReasons-Comment' in data:
            sd.importantReasonsOther = data["importantReasons-Comment"]
        sd.rawMessage = data["rawMessage"]
        ## STORING RANDOM-GENERATED USERID
        sd.userid = self.request.get("userid")
        sd.put()

class EvaluateRelevanceHandler(webapp2.RequestHandler):
    def get(self):
        pass
        

class RetrieveEmailsHandler(webapp2.RequestHandler):
    def get(self):
        pass

class SetupHandler(webapp2.RequestHandler):
    def get(self):


        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('setup.html')
        html = template.render(template_values)
        self.response.out.write(html)


app = webapp2.WSGIApplication([
    ## PUBLIC PAGES
    ('/', MainHandler),
    ('/survey', SurveyHandler),
    ('/survey/submit', SurveySubmitHandler),
    ##### EVALUATING EMAIL and LANDING PAGE RELEVANCE
    ('/evaluateRelevance', EvaluateRelevanceHandler),
    ## INTERNAL SERVICES
    ('/retrieveEmails', RetrieveEmailsHandler),
    ## MAINTENANCE
    ('/setup', SetupHandler),
], debug=True)
