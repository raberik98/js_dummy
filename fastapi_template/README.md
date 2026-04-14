source .venv/bin/activate
pip install -r requirements.txt
pip install fastapi uvicorn psycopg2-binary
pip freeze > requirements.txt
uvicorn main:app --port 3000