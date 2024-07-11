from dotenv import load_dotenv
from os import environ

load_dotenv()

class AppConfig:
    is_dev = environ.get("ENVIRONMENT") == "development"
    is_prod = environ.get("ENVIRONMENT") == "production"

    mysql_host = environ.get("MYSQL_HOST")
    mysql_user = environ.get("MYSQL_USER")
    mysql_password = environ.get("MYSQL_PASSWORD")
    mysql_database = environ.get("MYSQL_DATABASE")

    session_secret_key = environ.get("SESSION_SECRET_KEY")
    passwords_salt = environ.get("PASSWORDS_SALT")