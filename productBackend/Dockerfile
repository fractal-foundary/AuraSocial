FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend

COPY requirements.txt /app/backend
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY . /app/backend

# Collect static files
RUN python manage.py collectstatic --noinput

# Use gunicorn instead of development server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Cards.wsgi:application"]