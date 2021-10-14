def transcribe_gcs(gcs_uri):
    # [START speech_quickstart]
    import io
    import os

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=r"C:\Users\User\MeetingNotes-Summary\server\speechtotext\speechtotext-328012-7517d82c059f.json"

    # Imports the Google Cloud client library
    # [START speech_python_migration_imports]
    from google.cloud import speech

    # [END speech_python_migration_imports]

    # Instantiates a client
    # [START speech_python_migration_client]
    client = speech.SpeechClient()
    # [END speech_python_migration_client]

    # The name of the audio file to transcribe
    # file_name = os.path.join(os.path.dirname(__file__), ".", "file.mp3")

    # Loads the audio into memory
    # with io.open(file_name, "rb") as audio_file:
        # content = audio_file.read()
    
    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=16000,
        language_code="ko-KR",
    )

    operation = client.long_running_recognize(config=config, audio=audio)
    response = operation.result()

    return response

response = transcribe_gcs("gs://recordtest/testfile.mp3")

a = open('translate.txt', 'w')
for result in response.results:
    print("{}".format(result.alternatives[0].transcript), file=a)
a.close()

    #print("Waiting for operation to complete...")
    # Detects speech in the audio file
    #response = operation.result(timeout=90)

    #for result in response.results:
        #a = open('translate.txt', 'w')
        #print(u"Transcript: {}".format(result.alternatives[0].transcript))
        #print("Confidence: {}".format(result.alternatives[0].Confidence))
        #a.close()
    # [END speech_quickstart]