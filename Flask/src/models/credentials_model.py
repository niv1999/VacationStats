from validate_email_address import validate_email

class CredentialsModel:

    # Ctor:
    def __init__(self, email, password):
        self.email = email
        self.password = password

    # Validating credentials:
    def validate(self):
        if not self.email: return "Missing email."
        if not self.password: return "Missing password."
        if len(self.email) < 6 or len(self.email) > 100: return "Email length must be 6 to 100 characters."
        if len(self.password) < 5 or len(self.password) > 100: return "Password length must be 5 to 100 characters."
        if not validate_email(self.email): return "Email is invalid."
        return None