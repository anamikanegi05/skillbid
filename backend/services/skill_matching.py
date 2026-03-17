from utils.db import get_db_connection

def recommend_freelancers(project_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # get project skills
    cursor.execute("SELECT required_skills FROM projects WHERE id=%s", (project_id,))
    project = cursor.fetchone()

    if not project or not project["required_skills"]:
        return []

    project_skills = [
        s.strip().lower() for s in project["required_skills"].split(",")
    ]

    # get freelancers
    cursor.execute("SELECT * FROM freelancers")
    freelancers = cursor.fetchall()

    recommendations = []

    for freelancer in freelancers:

        if not freelancer["skills"]:
            continue

        freelancer_skills = [
            s.strip().lower() for s in freelancer["skills"].split(",")
        ]

        matched_skills = set(project_skills) & set(freelancer_skills)

        match_score = int((len(matched_skills) / len(project_skills)) * 100)

        if match_score > 0:
            freelancer["match_score"] = match_score
            freelancer["matched_skills"] = list(matched_skills)
            recommendations.append(freelancer)

    # sort by match score and rating
    recommendations.sort(
        key=lambda x: (x["match_score"], x["rating"]),
        reverse=True
    )

    cursor.close()
    conn.close()

    return recommendations