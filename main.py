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
    created_date = ndb.DateTimeProperty()
    html = ndb.TextProperty()
    features = ndb.JsonProperty()

class Evalution(ndb.Model):
    link_clicked = ndb.StringProperty()


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('crowd.html')
        html = template.render(template_values)
        self.response.out.write(html)
class CollectGoodEmailsHandler(webapp2.RequestHandler):
    def get(self):
        pass
        
class CollectBadEmailsHandler(webapp2.RequestHandler):
    def get(self):
        pass
        
class CollectNeutralEmailsHandler(webapp2.RequestHandler):
    def get(self):
        pass
        
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
    ##### COLLECTING EMAILS
    ('/collectGoodEmails', CollectGoodEmailsHandler),
    ('/collectBadEmails', CollectBadEmailsHandler),
    ('/collectNeutralEmails', CollectNeutralEmailsHandler),
    ##### EVALUATING EMAIL and LANDING PAGE RELEVANCE
    ('/evaluateRelevance', EvaluateRelevanceHandler),
    ## INTERNAL SERVICES
    ('/retrieveEmails', RetrieveEmailsHandler),
    ## MAINTENANCE
    ('/setup', SetupHandler),
], debug=True)
