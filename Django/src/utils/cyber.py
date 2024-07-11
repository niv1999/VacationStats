from hashlib import sha512
from jwt import encode
from .app_config import AppConfig

class Cyber:

    # Encrypt a password:
    @staticmethod
    def hash(plain_text):
        encoded_text = plain_text.encode("UTF-8") + AppConfig.passwords_salt.encode("UTF-8")
        hashed_text = sha512(encoded_text).hexdigest()
        return hashed_text
    
    # Generate a JWT token:
    @staticmethod
    def generate_jwt_token(user):
        json = { "user": user }
        token = encode(payload=json, key=AppConfig.jwt_secret_key)
        return token