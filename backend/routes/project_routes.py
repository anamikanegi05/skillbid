from flask import Blueprint, request, jsonify
from utils.db import get_db_connection
from services.budget_estimator import estimate_budget
from services.skill_matching import recommend_freelancers
from ai.pitch_generator import generate_pitch

project_bp = Blueprint("projects", __name__)


# GET all projects
@project_bp.route("/api/projects", methods=["GET"])
def get_projects():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(projects)


# AI Budget Estimator
@project_bp.route("/api/estimate-budget", methods=["POST"])
def estimate_budget_api():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    result = estimate_budget(title, description)

    return jsonify({
        "budget_estimate": result
    })


# AI Skill Matching
@project_bp.route("/api/recommend-freelancers/<int:project_id>")
def recommend(project_id):

    result = recommend_freelancers(project_id)

    return jsonify(result)


# AI Proposal Generator
@project_bp.route("/api/generate-pitch", methods=["POST"])
def generate_pitch_api():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    skills = data.get("required_skills", "")

    pitch = generate_pitch(title, description, skills)

    return jsonify({
        "proposal": pitch
    })