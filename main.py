import re, json, os, logging, random, string, collections, glob, fnmatch
import webapp2, jinja2
from google.appengine.ext import ndb
from datetime import datetime
import pprint
import csv, itertools, operator, copy

from google.appengine.api.files import records
from google.appengine.datastore import entity_pb
from google.appengine.api import datastore
 

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("templates"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

# templates_dir = os.path.join(os.path.dirname(__file__), 'assets/html')

class SurveyData(ndb.Model):
    created_date = ndb.DateTimeProperty(auto_now_add=True)
    code = ndb.StringProperty()
    userid = ndb.StringProperty()
    jsonData = ndb.JsonProperty()
    
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
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('main.html')
        html = template.render(template_values)
        self.response.out.write(html)

class SurveySubmitHandler(webapp2.RequestHandler):
    def post(self):
        sd = SurveyData();     
        ## STORING SURVEY DATA AS JSON
        sd.jsonData = json.loads(self.request.get("json"))
        ## STORING RANDOM-GENERATED USERID
        sd.userid = self.request.get("userid")
        sd.code = self.request.get("code")
        sd.put()

class EvaluateRelevanceHandler(webapp2.RequestHandler):
    def get(self):
        pass
        
class ReviewHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('review.html')
        html = template.render(template_values)
        self.response.out.write(html)

class FetchSurveyHandler(webapp2.RequestHandler):
    def get(self):
        action = self.request.get("action")
        if action == "allUserID":
            records = SurveyData.query()
            code_set = list(set([d.code for d in records]))
            valueGroupByCode = [{"code":code, "userid_list":[d.userid for d in records if d.code == code] } for code in code_set]
            print valueGroupByCode
            # allUserID = [rec.userid for rec in records]
            self.response.out.write(json.dumps(valueGroupByCode))
        elif action == "oneSurveyData":
            userid = self.request.get("userid")
            surveyData = SurveyData.query(SurveyData.userid == userid).get()
            print surveyData
            self.response.out.write(json.dumps(surveyData.jsonData))
        else:
            self.response.out.write("Error: Please provide action and/or userid options")

class RetrieveEmailsHandler(webapp2.RequestHandler):
    def get(self):
        pass

class SetupHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('setup.html')
        html = template.render(template_values)
        self.response.out.write(html)

class BackupUIHandler(webapp2.RequestHandler):
    def get(self):
        base_path = "./backup/waitlist131.appspot.com/"
        availableBackups = []
        directories = os.listdir(base_path)
        for dir in directories:
            for root, dirnames, filenames in os.walk(base_path+dir):
                matchingOutputFiles = []
                for filename in fnmatch.filter(filenames, 'output*'):
                    matchingOutputFiles.append(os.path.join(root, filename))
                if len(matchingOutputFiles)>0:
                    availableBackups.append({
                        'directory' : dir, 
                        'files' : matchingOutputFiles
                    })
        template_values = {
            'availableBackups': availableBackups
        }
        template = JINJA_ENVIRONMENT.get_template('backup.html')
        html = template.render(template_values)
        self.response.out.write(html)
        
        # print availableBackups

        # "./backup/waitlist131.appspot.com/datastore_backup_datastore_backup_2017_07_12_2_SurveyData/156799897795827366943070588757B"
        # filename = "/output-0"
        
        # template = JINJA_ENVIRONMENT.get_template('backup.html')
        # html = template.render({})
        # self.response.out.write(html)

class RestoreHandler(webapp2.RequestHandler):
    def get(self):
        filepath = self.request.get("path")
        className = self.request.get("className")
        ###
        raw = open(filepath, 'r')
        reader = records.RecordsReader(raw)
        numAdded = 0
        for record in reader:
                entity_proto = entity_pb.EntityProto(contents=record)
                entity = datastore.Entity.FromPb(entity_proto)
                # entity.put()
                try:
                    if className=="SurveyData":
                        sd = SurveyData()
                        sd.populate(**entity)
                        sd.put()
                        numAdded += 1
                    else:
                        continue
                except:
                    pass
        self.response.out.write(str(numAdded) + " created")

app = webapp2.WSGIApplication([
    ## PUBLIC PAGES
    ('/', MainHandler),
    ('/survey', MainHandler),
    ('/surveyIrrelevant', MainHandler),
    ('/review', MainHandler),
    ('/work', MainHandler),
    ## AJAX CALLS
    ('/review/fetchSurvey', FetchSurveyHandler),
    ('/survey/submit', SurveySubmitHandler),
    ##### EVALUATING EMAIL and LANDING PAGE RELEVANCE
    ('/evaluateRelevance', EvaluateRelevanceHandler),
    ## INTERNAL SERVICES
    ('/review', ReviewHandler),
    ('/retrieveEmails', RetrieveEmailsHandler),
    ## MAINTENANCE
    ('/setup', SetupHandler),
    ## BACKUP AND RESTORE PRODUCTION DATASTORE
    ('/backup', BackupUIHandler),
    ('/restore', RestoreHandler),
], debug=True)
