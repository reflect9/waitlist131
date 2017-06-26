import re, json, os, logging, random, string, collections
import webapp2, jinja2
from google.appengine.ext import db
from datetime import datetime
import pprint
import csv, itertools, operator, copy

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('crowd.html')
        html = template.render(template_values)
        self.response.out.write(html)


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
