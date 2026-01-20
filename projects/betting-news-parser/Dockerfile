FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy Russian model
RUN python -m spacy download ru_core_news_sm

# Copy application files
COPY . .

# Create logs directory
RUN mkdir -p /app/logs

ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]



























