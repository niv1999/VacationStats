from datetime import datetime
from flask import session

class Logger:

    # Path to log file:
    __log_file = "./logger.log"

    # Save log message:
    @staticmethod
    def log(message):
        now = datetime.now()
        with open(Logger.__log_file, "a") as file:
            file.write(str(now) + "\n")
            file.write(str(message) + "\n")
            user = session.get("current_user")
            if user: file.write(f"User ID: {str(user['user_id'])}, Email: {user['email']} \n")
            file.write("-------------------------------------\n")