FROM python:3.8

RUN python -m venv /venv

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip

RUN pip install Flask && pip install Flask-Cors

CMD ["python", "app.py"]