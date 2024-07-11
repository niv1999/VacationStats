from flask import Blueprint, render_template, redirect, url_for, request, send_file, session, jsonify
from facade.vacation_facade import VacationFacade
from facade.auth_facade import AuthFacade
from utils.image_handler import ImageHandler
from models.client_errors import ResourceNotFoundError, ValidationError, AuthError
from models.role_model import RoleModel

home_blueprint = Blueprint("home_view", __name__)

vacation_facade = VacationFacade()
auth_facade = AuthFacade()

# Home page with all the vacations:
@home_blueprint.route("/vacations", methods=["GET", "POST"])
def home():
    try:
        auth_facade.block_anonymous()
        user = session.get("current_user")
        vacation_facade.store_liked_vacations_in_session(user)
        sort_parameter = request.form.get("sort_by", default="start_date")
        vacations = vacation_facade.get_all_vacations_sorted(sort_parameter)
        error = request.args.get("error")
        if user["role_id"] == RoleModel.User.value:
            return render_template("vacations_users.html", vacations = vacations, error = error, sort_parameter = sort_parameter)
        return render_template("vacations_admin.html", vacations = vacations, error = error, sort_parameter = sort_parameter)
    except AuthError as err:
        return redirect(url_for("auth_view.login", error = err.message))

# Adding a new vacation view:
@home_blueprint.route("/vacations/new", methods = ["GET", "POST"])
def insert():
    try:
        auth_facade.block_anonymous()
        auth_facade.block_non_admin()
        countries = vacation_facade.get_all_countries()
        if request.method == "GET": return render_template("add_vacation.html", countries = countries)
        vacation_facade.add_vacation()
        return redirect(url_for("home_view.home"))
    except AuthError as err:
        # Check if the user is logged in or not and redirect to the right page accordingly:
        if "authorized" in err.message: return redirect(url_for("home_view.home", error = err.message))
        return redirect(url_for("auth_view.login", error = err.message))
    except ValidationError as err:
        return render_template("add_vacation.html", error = err.message, countries = countries)

# Edit an existing vacation view:
@home_blueprint.route("/vacations/edit/<int:id>", methods = ["GET", "POST"])
def edit(id):
    try:
        auth_facade.block_anonymous()
        auth_facade.block_non_admin()
        countries = vacation_facade.get_all_countries()
        if request.method == "GET":
            vacation = vacation_facade.get_one_vacation(id)
            return render_template("edit_vacation.html", vacation = vacation, countries = countries)
        vacation_facade.update_vacation()
        return redirect(url_for("home_view.home"))
    except AuthError as err:
        if "authorized" in err.message: return redirect(url_for("home_view.home", error = err.message))
        return redirect(url_for("auth_view.login", error = err.message))
    except ResourceNotFoundError as err:
        return render_template("404.html", error = err.message)
    except ValidationError as err:
        return render_template("edit_vacation.html", error = err.message, vacation = err.model, countries = countries)

# Delete a vacation view:
@home_blueprint.route("/vacations/delete/<int:id>")
def delete(id):
    try:
        auth_facade.block_anonymous()
        auth_facade.block_non_admin()
        vacation_facade.delete_vacation(id)
        return redirect(url_for("home_view.home"))
    except AuthError as err:
        if "authorized" in err.message: return redirect(url_for("home_view.", error = err.message))
        return redirect(url_for("auth_view.login", error = err.message))

# Get image:
@home_blueprint.route("/vacations/images/<string:image_name>")
def get_image(image_name):
    image_path = ImageHandler.get_image_path(image_name)
    return send_file(image_path) # Returns a complete image file

# End point to receive data from the front end and update the likes accordingly
@home_blueprint.route("/update-likes", methods = ["POST"])
def update_likes():
    try:
        data = request.json
        vacation_facade.update_likes(data)
        return jsonify({"message": "Likes updated successfully"}), 200  
    except Exception as err:
        return jsonify({"error": str(err)}), 400