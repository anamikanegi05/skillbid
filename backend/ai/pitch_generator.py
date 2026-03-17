import requests

OPENROUTER_API_KEY = "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"


def generate_pitch(title, description, skills):

    prompt = f"""
Write a professional freelance proposal.

Project Title: {title}

Project Description:
{description}

Freelancer Skills:
{skills}

Explain why the freelancer is a perfect fit.
Keep it short and professional.
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    data = response.json()

    # Debug print (important)
    print(data)

    if "choices" in data:
        return data["choices"][0]["message"]["content"]
    else:
        return f"API Error: {data}"