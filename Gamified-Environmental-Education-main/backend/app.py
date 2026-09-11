from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User
import os
import requests

# API keys and constants
WAQI_TOKEN = '351c21bbca012495885f801d8c5a936ca4e556e0'
API_KEY = 'b54ff53a8ce6b7fb049899be880387d3'
BOTPENGUIN_API_KEY = 'SKyMhmyqBBPkboqmplxiffOdRxsG3XZRHHYYBvjCMyh1gvoRFKxSK0MT055RCCsFwPxTYDhegI0FX14hnDqLHiNVCwVwDuRvUq1RHOmbeCuT2MquLJ4yudLd9BjouXqmpDpuUfBqxcJr0aQLXbTlQoq4f4yRFP2hoz2lXYVrUDez9yI2LW3g6wSvYAIchKwPzErsvCHEnvFzxPmFgIweODe9MFK5jgkDtum5l_68c7a7130465f3560d25c2fc_c'

lat = 13.1167001
lon = 77.6344907
city = 'bangalore'

app = Flask(__name__)
CORS(app)

# Database configuration with fallback to SQLite for local/dev
default_sqlite_uri = 'sqlite:///users.db'
db_uri = os.getenv('DATABASE_URL', default_sqlite_uri)
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    try:
        db.create_all()
    except Exception:
        # Fallback to SQLite if initial DB connection fails
        app.config['SQLALCHEMY_DATABASE_URI'] = default_sqlite_uri
        db.engine.dispose()
        db.init_app(app)
        db.create_all()

@app.route('/', methods=['GET'])
def dashboard():
    try:
        aqi_url = f'https://api.waqi.info/feed/{city}/?token={WAQI_TOKEN}'
        weather_url = (
            f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}'
            f'&appid={API_KEY}&units=metric'
        )

        air_response = requests.get(aqi_url, timeout=8)
        air_data = air_response.json()
        if air_data.get('status') == 'ok':
            aqi = air_data['data'].get('aqi', 'N/A')
        else:
            aqi = 'N/A'

        weather_response = requests.get(weather_url, timeout=8)
        weather_data = weather_response.json()
        temp = weather_data.get('main', {}).get('temp', 'N/A')
        hum = weather_data.get('main', {}).get('humidity', 'N/A')
    except Exception:
        aqi = 'N/A'
        temp = 'N/A'
        hum = 'N/A'

    return jsonify({
        "temperature": temp,
        "humidity": hum,
        "aqi": aqi
    })


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    roll_number = data.get('rollNumber')
    school = data.get('school')
    class_name = data.get('className')
    password = data.get('password')

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        name=name,
        phone=phone,
        email=email,
        roll_number=roll_number,
        school=school,
        class_name=class_name
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"message": "Signin successful"})
    return jsonify({"error": "Invalid email or password"}), 400

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    user_id = data.get("user_id", "student123")

    url = "https://api.botpenguin.com/v2/message"
    headers = {
        "Authorization": f"Bearer {BOTPENGUIN_API_KEY}",
        "Content-Type": "application/json"
    }
    body = {
        "message": user_message,
        "user_id": user_id
    }

    try:
        response = requests.post(url, headers=headers, json=body)
        bot_reply = response.json().get("reply", "Sorry, no reply received")
        return jsonify({"reply": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)