from flask import Flask
from flask_cors import CORS

from routes.project_routes import project_bp
from routes.user_routes import user_bp
from routes.bid_routes import bid_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(project_bp)
app.register_blueprint(user_bp)
app.register_blueprint(bid_bp)

@app.route("/")
def home():
    return {"message": "SkillBid API running"}

if __name__ == "__main__":
    app.run(debug=True)