from validate_email_address import validate_email
from models.role_model import RoleModel

class UserModel:

    # Ctor:
    def __init__(self, user_id, first_name, last_name, email, password, role_id):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.role_id = role_id

    # Validate a new user insert:
    def validate(self):
        if not self.first_name: return "Missing first name."
        if not self.last_name: return "Missing last name."
        if not self.email: return "Missing email."
        if not self.password: return "Missing password."
        if not self.role_id: return "Missing role id."
        if len(self.first_name) < 2 or len(self.first_name) > 30: return "First name length must be 2 to 30 characters."
        if len(self.last_name) < 2 or len(self.last_name) > 30: return "Last name length must be 2 to 30 characters."
        if len(self.email) < 6 or len(self.email) > 100: return "Email length must be 6 to 100 characters."
        if len(self.password) < 5 or len(self.password) > 100: return "Password length must be 5 to 100 characters."
        if not validate_email(self.email): return "Email is invalid."
        if self.role_id != RoleModel.Admin.value and self.role_id != RoleModel.User.value: return "Role must be User or Admin"
        return None
