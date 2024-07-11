from utils.dal import DAL
from utils.image_handler import ImageHandler

class VacationLogic:

    # Ctor:
    def __init__(self):
        self.dal = DAL()

    # Get all vacations and add the country name to them:
    def get_all_vacations(self):
        sql = "SELECT *, country_name FROM vacations JOIN countries ON vacations.country_id = countries.country_id"
        return self.dal.get_table(sql)

    # Get one vacation based on it's id:
    def get_one_vacation(self, id):
        sql = "SELECT * FROM vacations WHERE vacation_id=%s"
        return self.dal.get_scalar(sql, (id, ))

    # Add a new vacation to the database:
    def add_vacation(self, vacation):

        # Save the image in the server and get the generated uuid name for the image:
        image_name = ImageHandler.save_image(vacation.image_name)
        sql = "INSERT INTO vacations VALUES (DEFAULT, %s, %s, %s, %s, %s, %s)"
        params = (vacation.country_id, vacation.description, vacation.start_date, vacation.end_date, vacation.price, image_name)
        self.dal.insert(sql, params)

    # Update an existing vacation:
    def update_vacation(self, vacation):
        old_image_name = self.__get_old_image_name(vacation.vacation_id)
        image_name = ImageHandler.update_image(old_image_name, vacation.image_name)
        sql = "UPDATE vacations SET country_id=%s, description=%s, start_date=%s, end_date=%s, price=%s, image_name=%s WHERE vacation_id=%s"
        params = (vacation.country_id, vacation.description, vacation.start_date, vacation.end_date, vacation.price, image_name, vacation.vacation_id)
        self.dal.update(sql, params)

    # Delete an existing vacation:
    def delete_vacation(self, id):
        image_name = self.__get_old_image_name(id)
        ImageHandler.delete_image(image_name)
        sql = "DELETE FROM vacations WHERE vacation_id=%s"
        self.dal.delete(sql, (id, ))
    
    # Extract the original vacation image name:
    def __get_old_image_name(self, id):
        sql = "SELECT image_name FROM vacations WHERE vacation_id=%s"
        result = self.dal.get_scalar(sql, (id, ))
        return result["image_name"]
    
    # Get the country name of a given vacation:
    def get_country_name(self, id):
        sql = "SELECT * FROM countries WHERE country_id=%s"
        country = self.dal.get_scalar(sql, (id, ))
        return country["country_name"]
    
    # Get all the countries:
    def get_all_countries(self):
        sql = "SELECT * FROM countries"
        return self.dal.get_table(sql)
    
    # Get the number of likes for a given vacation:
    def get_likes_count(self, id):
        sql = "SELECT COUNT(vacation_id) AS likes_count FROM likes WHERE vacation_id = %s"
        result = self.dal.get_scalar(sql, (id, ))
        return result["likes_count"]
    
    # Get all the vacation id's that a given user liked:
    def get_liked_vacations_by_user(self, id):
        sql = "SELECT vacation_id FROM likes WHERE user_id=%s"
        liked_vacations = self.dal.get_table(sql, (id, ))
        return liked_vacations
    
    # Add a new like to the database:
    def add_like(self, user_id, vacation_id):
        sql = "INSERT INTO likes VALUES (%s, %s)"
        self.dal.insert(sql, (user_id, vacation_id))

    # Remove a like from the database:
    def remove_like(self, user_id, vacation_id):
        sql = "DELETE FROM likes WHERE user_id = %s AND vacation_id = %s"
        self.dal.delete(sql, (user_id, vacation_id))

    # Close the connection:
    def close(self):
        self.dal.close()
