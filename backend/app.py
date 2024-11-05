from pymongo import MongoClient
import os
from app_audio import transcribe,enhance_the_transcript
from dotenv import load_dotenv
from bson.objectid import ObjectId
import assemblyai as aai

# Load environment variables
load_dotenv()

# Connect to MongoDB cluster "test1"
client = MongoClient(os.getenv("MONGO_URI"))  # Ensure MONGO_URI points to "test1"
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
aai.settings.api_key=os.getenv("ASSEMBLY_AI_API_KEY")

# Access the "test" database
db = client["test"]

# Access the "audios" collection within "test"
audios_collection = db["audios"]
# for audio_document in audios_collection.find():
#     print(audio_document)

audio_id = ObjectId("6728cead4332273ecae5b226") 
audio_document = audios_collection.find_one({"_id": audio_id})

if audio_document:
    audio_file_url = audio_document["filePath"]  # Get the file path of the audio
    story = audio_document.get("story")  # Retrieve the story if it's stored in the document
    
    # Display the file path for verification
    print("Audio File Path:", audio_file_url)
    
    audio_file_url=r'.\\' + audio_file_url
    # Call the transcribe function with the file path
    transcript = transcribe('uploads\\1730727597314-recording.wav')
    
    if story:  # If a story exists, enhance the transcript
        enhanced_transcript = enhance_the_transcript(transcript, story)
        print("Enhanced Transcript:", enhanced_transcript)
    else:
        print("Transcript:", transcript)
else:
    print("No audio document found with the specified criteria.")


    