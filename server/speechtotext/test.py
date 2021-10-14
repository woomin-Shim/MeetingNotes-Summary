import io
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=r"C:\Users\User\MeetingNotes-Summary\server\speechtotext\speechtotext-328012-7517d82c059f.json"

from google.cloud import storage

storage_client = storage.Client()
buckets = list(storage_client.list_buckets())

print(buckets)