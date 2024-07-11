from flask import Blueprint, render_template, redirect, url_for, request, session, jsonify
from models.client_errors import ValidationError, AuthError
from facade.auth_facade import AuthFacade

auth_blueprint = Blueprint("auth_view", __name__)

auth_facade = AuthFacade()

# Register view:
@auth_blueprint.route("/", methods = ["GET", "POST"])
@auth_blueprint.route("/welcome", methods = ["GET", "POST"])
def register():
    try:
        if session.get("current_user"): return redirect(url_for("home_view.home", error = "You are already logged in."))
        if request.method == "GET": return render_template("welcome.html", user = {}, credentials = {})
        auth_facade.register()
        return redirect(url_for("home_view.home"))
    except ValidationError as err:
        return render_template("welcome.html", register_error = err.message, user = err.model, credentials = {})
    
# Login view:
@auth_blueprint.route("/welcome/login", methods = ["GET", "POST"])
def login():
    try:
        if session.get("current_user"): return redirect(url_for("home_view.home", error = "You are already logged in"))
        if request.method == "GET":
            err = request.args.get("error") # Take error from url (if exists)
            return render_template("welcome.html", login_error = err, credentials = {}, user = {}, active = "login")
        auth_facade.login()
        return redirect(url_for("home_view.home"))
    except (ValidationError, AuthError) as err:
        return render_template("welcome.html", login_error = err.message, credentials = err.model, user = {}, active = "login")

# Logout view:
@auth_blueprint.route("/logout")
def logout():
    auth_facade.logout()
    return redirect(url_for("auth_view.login"))

# End point for the front end to fetch the session data:
@auth_blueprint.route("/get-session-data")
def get_session_data():
    return jsonify(session)