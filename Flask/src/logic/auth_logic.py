from utils.dal import DAL

class AuthLogic:

    # Ctor:
    def __init__(self):
        self.dal = DAL()

    # Check if the email is taken and return True or False:
    def is_email_taken(self, email):
        sql = "SELECT EXISTS(SELECT * FROM users WHERE email = %s) AS is_taken"
        result = self.dal.get_scalar(sql, (email, ))
        return result["is_taken"] == 1

    # Add a new user to the database:
    def add_user(self, user):
        sql = "INSERT INTO users VALUES(DEFAULT, %s, %s, %s, %s, %s)"
        params = (user.first_name, user.last_name, user.email, user.password, user.role_id)
        self.dal.insert(sql, params)

    # Get a user based on the given credentials:
    def get_user(self, credentials):
        sql = "SELECT * FROM users WHERE email = %s AND password = %s"
        user = self.dal.get_scalar(sql, (credentials.email, credentials.password))
        return user

    # Close the connection:
    def close(self):
        self.dal.close()