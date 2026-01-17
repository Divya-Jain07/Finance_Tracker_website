#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# This creates a superuser automatically if one doesn't exist
if [[ $CREATE_SUPERUSER ]]; then
  python manage.py createsuperuser --no-input || true
fi