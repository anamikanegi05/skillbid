import requests
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def estimate_budget(title, description):

    prompt = f"""
Estimate the freelance project budget in USD.

Project Title: {title}
Description: {description}

Return only a price range like:
$500 - $800
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

    if "choices" in data:
        return data["choices"][0]["message"]["content"]

    return f"API Error: {data}"