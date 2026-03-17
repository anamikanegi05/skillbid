Write-Host "Starting Backend..."
Start-Process powershell -ArgumentList "cd backend; venv\Scripts\activate; python app.py"

Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList "cd frontend/skillbid-ui; npm run dev"