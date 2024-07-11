from datetime import datetime
from logic.vacation_logic import VacationLogic
from pathlib import Path
from utils.image_handler import ImageHandler

class VacationModel:

    # Ctor:
    def __init__(self, vacation_id, country_id, description, start_date, end_date, price, image_name):
        self.vacation_id = vacation_id
        self.country_id = country_id
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.price = price
        self.image_name = image_name
        self.country_name = self.__get_country_name(country_id)

    # Validate adding a vacation
    def validate_insert(self):
        if not self.country_id: return "No country selected."
        if not self.description: return "Missing description."
        if not self.start_date: return "Missing start date."
        if not self.end_date: return "Missing end date."
        if not self.price: return "Missing price."
        if not self.image_name: return "Missing image."
        if not self.country_name: return "Invalid country id."
        if len(self.description) < 10 or len(self.description) > 400: return "Description must be 10 to 400 characters."
        current_date = datetime.now().date()
        formatted_start_date = datetime.strptime(self.start_date, "%Y-%m-%d").date()
        formatted_end_date = datetime.strptime(self.end_date, "%Y-%m-%d").date()
        if current_date > formatted_start_date: return "The start date can't be in the past."
        if formatted_start_date > formatted_end_date: return "The end date must be after the start date."
        current_year = datetime.now().year
        if (formatted_start_date.year - current_year) > 5: return "Can't add vacations more than 5 years from now."
        if (formatted_end_date.year - formatted_start_date.year) > 3: return "Vacations can't be longer than 3 years."
        if float(self.price) < 0 or float(self.price) > 10000: return "The price must be $0 - $10,000."
        if Path(self.image_name.filename).suffix.lower() not in ImageHandler.image_suffixes: return "Can only accept image files."
        return None

    # Validate updating a vacation:
    def validate_update(self):
        if not self.vacation_id: return "Missing vacation id."
        if not self.country_id: return "No country selected."
        if not self.description: return "Missing description."
        if not self.start_date: return "Missing start date."
        if not self.end_date: return "Missing end date."
        if not self.price: return "Missing price."
        if not self.country_name: return "Invalid country id."
        if len(self.description) < 10 or len(self.description) > 400: return "Description must be 10 to 400 characters."
        formatted_start_date = datetime.strptime(self.start_date, "%Y-%m-%d").date()
        formatted_end_date = datetime.strptime(self.end_date, "%Y-%m-%d").date()
        if formatted_start_date > formatted_end_date: return "The end date must be after the start date."
        current_year = datetime.now().year
        if (formatted_start_date.year - current_year) > 5: return "Can't add vacations more than 5 years from now."
        if (formatted_end_date.year - formatted_start_date.year) > 3: return "Vacations can't be longer than 3 years."
        if float(self.price) < 0 or float(self.price) > 10000: return "The price must be $0 - $10,000."
        if self.image_name:
            if Path(self.image_name.filename).suffix.lower() not in ImageHandler.image_suffixes: return "Can only accept image files."
        return None

    # Get the vacations country name:
    def __get_country_name(self, country_id):
        if not country_id: return None
        vacation_logic = VacationLogic()
        country_name = vacation_logic.get_country_name(country_id)
        return country_name
