from logic.auth_logic import AuthLogic
from logic.vacation_logic import VacationLogic
from flask import request, session
from models.user_model import UserModel
from models.role_model import RoleModel
from models.client_errors import ValidationError, AuthError
from models.credentials_model import CredentialsModel
from utils.cyber import Cyber

class AuthFacade:

    # Ctor:
    def __init__(self):
        self.auth_logic = AuthLogic()
        self.vacation_logic = VacationLogic()

    # Register as a new user:
    def register(self):
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        email = request.form.get("email")
        password = request.form.get("password")
        user = UserModel(None, first_name, last_name, email, password, RoleModel.User.value)
        error = user.validate()
        if error: raise ValidationError(error, user)
        if self.auth_logic.is_email_taken(email): raise ValidationError("Email already exists.", user)
        user.password = Cyber.hash(user.password)
        self.auth_logic.add_user(user)
        user = self.auth_logic.get_user(user)
        del user["password"]
        session["current_user"] = user

    # Login if you have an account:
    def login(self):
        email = request.form.get("email")
        password = request.form.get("password")
        credentials = CredentialsModel(email, password)
        error = credentials.validate()
        if error: raise ValidationError(error, credentials)
        credentials.password = Cyber.hash(credentials.password)
        user = self.auth_logic.get_user(credentials)
        if not user: raise AuthError("Incorrect email or password.", credentials)
        del user["password"]
        session["current_user"] = user

    # Logout function:
    def logout(self):
        session.clear()

    # Block non logged-in users:
    def block_anonymous(self):
        user = session.get("current_user")
        if not user: raise AuthError("You are not logged-in.")

    # Block non admin type users:
    def block_non_admin(self):
        user = session.get("current_user")
        if not user: raise AuthError("You are not logged-in.")
        if user["role_id"] != RoleModel.Admin.value: raise AuthError("You are not authorized.")

    # Close the connection
    def close(self):
        self.auth_logic.close()
        self.vacation_logic.close()