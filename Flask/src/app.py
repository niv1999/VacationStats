from flask import Flask, render_template, request
from utils.app_config import AppConfig
from views.auth_view import auth_blueprint
from views.home_view import home_blueprint
from flask_limiter import Limiter, util
from utils.logger import Logger

app = Flask(__name__)

app.secret_key = AppConfig.session_secret_key

app.register_blueprint(auth_blueprint)
app.register_blueprint(home_blueprint)

# Handle 404 error:
@app.errorhandler(404)
def page_not_found(error):
    Logger.log(error)
    return render_template("404.html", error = error)

# # Handle any other error:
@app.errorhandler(Exception)
def catch_all(error):
    Logger.log(error)
    error_message = error if AppConfig.is_dev else "Some error, please try again."
    return render_template("500.html", error = error_message)

# Prevent DoS attack:
Limiter(
    util.get_remote_address, # user remote IP address
    app = app, # Our Flask app object
    default_limits=["100 per minute"], # How many requests per window of time
    storage_uri= "memory://", # Save data in memory (and not in some file)
    default_limits_exempt_when= lambda: "products/images" in request.url
)