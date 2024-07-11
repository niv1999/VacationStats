FROM python:3-alpine3.19
WORKDIR /app
RUN python -m venv env
COPY requirements.txt /app
RUN /app/env/bin/pip install -r requirements.txt
COPY . /app
ENTRYPOINT /app/env/bin/python -m flask --app /app/src/app.py run --host=0.0.0.0 --port=5000 --debug