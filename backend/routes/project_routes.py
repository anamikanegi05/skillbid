from flask import Blueprint, request, jsonify

# try importing db connection
try:
    from utils.db import get_db_connection
    DB_AVAILABLE = True
except:
    DB_AVAILABLE = False

from services.budget_estimator import estimate_budget
from services.skill_matching import recommend_freelancers
from ai.pitch_generator import generate_pitch

project_bp = Blueprint("projects", __name__)


# --------------------------------
# GET all projects
# --------------------------------
@project_bp.route("/api/projects", methods=["GET"])
def get_projects():

    # Try database first
    if DB_AVAILABLE:
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("SELECT * FROM projects")
            projects = cursor.fetchall()

            cursor.close()
            conn.close()

            return jsonify(projects)

        except Exception as e:
            print("Database failed, switching to demo data:", e)

    # Fallback demo data (for deployment)
    projects = [
        {
            "id": 1,
            "title": "React Dashboard Development",
            "description": "Build an admin dashboard using React, Tailwind and REST APIs",
            "budget_min": 1200,
            "budget_max": 3000,
            "required_skills": "React,Node,Tailwind"
        },
        {
            "id": 2,
            "title": "Flask Backend API",
            "description": "Develop REST APIs using Flask and MySQL",
            "budget_min": 800,
            "budget_max": 2000,
            "required_skills": "Python,Flask,MySQL"
        },
        {
            "id": 3,
            "title": "AI Proposal Generator",
            "description": "Generate automated proposals using Generative AI",
            "budget_min": 500,
            "budget_max": 1500,
            "required_skills": "Python,AI,LLM"
        }
    ]

    return jsonify(projects)


# --------------------------------
# AI Budget Estimator
# --------------------------------
@project_bp.route("/api/estimate-budget", methods=["POST"])
def estimate_budget_api():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    result = estimate_budget(title, description)

    return jsonify({
        "budget_estimate": result
    })


# --------------------------------
# AI Skill Matching
# --------------------------------
@project_bp.route("/api/recommend-freelancers/<int:project_id>")
def recommend(project_id):

    result = recommend_freelancers(project_id)

    return jsonify(result)


# --------------------------------
# AI Proposal Generator
# --------------------------------
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