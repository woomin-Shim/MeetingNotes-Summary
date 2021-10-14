import pyaudio
import wave

FORMAT = pyaudio.paInt16
CHANNELS = 1  #only mono
RATE = 16000  
CHUNK = 1024  #확인 필요
RECORD_SECONDS = 10 #10초 녹음


def upload_to_bucket(bucket_name, source_file_name):
    import io
    import os

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=r"C:\Users\User\MeetingNotes-Summary\server\speechtotext\speechtotext-328012-7517d82c059f.json"

    from google.cloud import storage

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    bucket.upload_from_filename(source_file_name)

    bucket.make_public()


WAVE_OUTPUT_FILENAME = "file.mp3"
 
audio = pyaudio.PyAudio()
 
# start Recording
stream = audio.open(format=FORMAT, channels=CHANNELS,
                rate=RATE, input=True,
                frames_per_buffer=CHUNK)
print ("recording...")
frames = []

for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)
print ("finished recording")
 
 
# stop Recording
stream.stop_stream()
stream.close()
audio.terminate()

waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
waveFile.setnchannels(CHANNELS)
waveFile.setsampwidth(audio.get_sample_size(FORMAT))
waveFile.setframerate(RATE)
waveFile.writeframes(b''.join(frames))
waveFile.close()

upload_to_bucket("recordtest", "file.mp3")