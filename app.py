from flask import Flask, render_template, jsonify
import json
import requests
from config import API_KEY

app = Flask(__name__)

with open("city_coords.json", encoding="utf-8") as f:
    CITY_COORDS = {city["name"]: (city["lat"], city["lon"]) for city in json.load(f)}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather/<city>")
def weather(city):
    if city not in CITY_COORDS:
        return jsonify({"error": "City not found"}), 404

    lat, lon = CITY_COORDS[city]
    url = (
        f"https://api.openweathermap.org/data/3.0/onecall?"
        f"lat={lat}&lon={lon}&units=metric&exclude=minutely,alerts&appid={API_KEY}"
    )
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
