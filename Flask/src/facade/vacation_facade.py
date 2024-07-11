from logic.vacation_logic import VacationLogic
from flask import request, session
from models.vacation_model import VacationModel
from models.client_errors import ResourceNotFoundError, ValidationError

class VacationFacade:

    # Ctor:
    def __init__ (self):
        self.logic = VacationLogic()

    # Get all the vacations sorted by the given sorting parameter:
    def get_all_vacations_sorted(self, sort_parameter):

        # Get all the vacations and add the like count:
        vacations = self.logic.get_all_vacations()
        for vacation in vacations:
            likes = self.logic.get_likes_count(vacation["vacation_id"])
            vacation["likes"] = likes

        # If it ends with "_reversed" store True in the reverse_sort variable, otherwise False. Used to determine if the user wants a reversed list:
        reverse_sort = sort_parameter.endswith("_reversed")

        # Remove the last 9 characters ("_reversed") from the sort key if it is a reversed sort.
        sort_by = sort_parameter[:-9] if reverse_sort else sort_parameter

        # Sort the vacations based on the sorting factor chosen by the user:
        return sorted(vacations, key=lambda vacation: vacation[sort_by], reverse=reverse_sort)
    
    # Get one vacation from the given vacation id:
    def get_one_vacation(self, id):
        vacation = self.logic.get_one_vacation(id)
        if not vacation: raise ResourceNotFoundError(id)
        return vacation

    # Validate and add a new vacation:
    def add_vacation(self):
        country_id = request.form.get("country_id")
        description = request.form.get("description")
        start_date = request.form.get("start_date")
        end_date = request.form.get("end_date")
        price = request.form.get("price")
        image = request.files["image"]
        vacation = VacationModel(None, country_id, description, start_date, end_date, price, image)
        error = vacation.validate_insert()
        if error: raise ValidationError(error, vacation)
        self.logic.add_vacation(vacation)

    # Validate and update an existing vacation:
    def update_vacation(self):
        vacation_id = request.form.get("vacation_id")
        country_id = int(request.form.get("country_id"))
        description = request.form.get("description")
        start_date = request.form.get("start_date")
        end_date = request.form.get("end_date")
        price = request.form.get("price")
        image = request.files["image"]
        vacation = VacationModel(vacation_id, country_id, description, start_date, end_date, price, image)
        error = vacation.validate_update()
        if error:
            image_name = self.logic.get_one_vacation(vacation_id)["image_name"] # Get the original image name
            vacation.image_name = image_name
            raise ValidationError(error, vacation)
        self.logic.update_vacation(vacation)

    # Delete a vacation:
    def delete_vacation(self, id):
        self.logic.delete_vacation(id)

    # Get all the countries:
    def get_all_countries(self):
        return self.logic.get_all_countries()
    
    # Get the users liked vacations and store them in the session:
    def store_liked_vacations_in_session(self, user):

        # Get a dictionary of liked vacation id's:
        liked_vacations_dict = self.logic.get_liked_vacations_by_user(user["user_id"])

        # Generate a list of the liked vacation id's:
        liked_vacations_list = [vacation["vacation_id"] for vacation in liked_vacations_dict]

        # Store the list in the user dictionary:
        user["liked_vacations"] = liked_vacations_list

        # Store the user in the session:
        session["current_user"] = user

    # Update the likes table:
    def update_likes(self, data):
        user_id = data.get("user_id")
        vacation_id = data.get("vacation_id")
        # If data.liked is true then add the like to the table, if its false then remove it:
        self.logic.add_like(user_id, vacation_id) if data.get("liked") else self.logic.remove_like(user_id, vacation_id)

    # Close the connection:
    def close(self):
        self.logic.close()