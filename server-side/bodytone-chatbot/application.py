from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import re

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL_ID = "mistralai/mistral-7b-instruct"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

app = Flask(__name__)
CORS(app)

def is_hebrew(text):
    return bool(re.search(r'[\u0590-\u05FF]', text))

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"response": "No question received 😕"}), 400

    if is_hebrew(user_input):
        return jsonify({"response": "Currently, I only support English. Please try again in English."})

    # Detect if the question refers to unavailable data (e.g., class schedule)
    keywords_needing_data = ["class", "schedule", "today's classes", "what classes", "available classes", "lesson"]
    if any(kw in user_input.lower() for kw in keywords_needing_data):
        return jsonify({"response": "I'm currently not connected to real-time class data. Please check the schedule on our site or contact staff for up-to-date info."})

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "X-Title": "BodyTuneBot"
    }

    payload = {
        "model": MODEL_ID,
        "messages": [
            {
                "role": "system",
                "content": """
You are a smart fitness chatbot named BodyTune AI. Always answer in a friendly, respectful, and professional tone.

Keep your answers **short and to the point**.  
Do **not** give long paragraphs or too many details unless the user specifically asks for them.

If the user asks about medical or risky topics (e.g. supplements, injuries, pregnancy), say you can’t give medical advice and recommend they talk to a qualified professional.

Stay focused on fitness, motivation, gym classes, nutrition, and healthy habits.

If you don't know something, say: "I'm not sure about that, but I can help with fitness and wellness!"
"""

            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    }

    try:
        res = requests.post(API_URL, headers=headers, json=payload)
        res.raise_for_status()
        json_response = res.json()

        if "choices" not in json_response or not json_response["choices"]:
            answer = "I'm not sure I understood that. Could you rephrase your question?"
        else:
            answer = json_response["choices"][0]["message"]["content"]

    except Exception as e:
        answer = f"Error: {str(e)}"

    return jsonify({"response": answer})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

application = app
