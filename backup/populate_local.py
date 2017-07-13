# The datastore is downloaded from gs://waitlist131.appspot.com 
# using command gsutil cp -R [PATH]

# This script is for populating local storage with the backup
# Taken from http://gbayer.com/big-data/app-engine-datastore-how-to-efficiently-export-your-data/

#### HOW TO RESTORE LOCAL DEV SERVER THROUGH INTERACTIVE CONSOLE
## takebn from https://gist.github.com/jehna/3b258f5287fcc181aacf


# ANOTHER METHOD TO DOWNLOAD as CSV (http://www.bemmu.com/how-to-backup-data-from-app-engine)
# GOOGLE_APPLICATION_CREDENTIALS=cred_key.json /Users/talee/Downloads/google-cloud-sdk/platform/google_appengine/appcfg.py download_data -A waitlist131 --url=http://waitlist131.appspot.com/_ah/remote_api/ --filename=back.csv
# 




# Make sure App Engine APK is available
import sys
sys.path.append('/Users/talee/Downloads/google-cloud-sdk/platform/google_appengine')
from google.appengine.api.files import records
from google.appengine.datastore import entity_pb
from google.appengine.api import datastore
 
relative_path_to_backup = "/Users/talee/Documents/gae/backup/waitlist131.appspot.com/datastore_backup_datastore_backup_2017_07_12_2_SurveyData/156799897795827366943070588757B"
filename = "/output-0"

raw = open(relative_path_to_backup+filename, 'r')
reader = records.RecordsReader(raw)
for record in reader:
        entity_proto = entity_pb.EntityProto(contents=record)
        entity = datastore.Entity.FromPb(entity_proto)
        #Entity is available as a dictionary!
        print entity
