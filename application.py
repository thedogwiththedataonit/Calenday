from flask import Flask, render_template, redirect, request, url_for, jsonify
import pymongo
from pymongo import MongoClient
import certifi
import re

from mongodb_connectionstring import connection_string
from functions import *



application = Flask(__name__)


@application.route('/', methods=["POST", "GET"])
def main():
    return render_template('main.html')

@application.route("/login", methods=["POST", "GET"]) #HASH THE USERNAME FOR URL
def login():
    error=""
    if request.method == "POST":
        try:

            username = request.form['email']
            password = request.form['pass']
            if (logins(username, password) == "success"):
                return redirect(url_for('app', username=username))
            else:
                error = "Invalid username or password"
                return render_template('login.html', error=error)
        
        except:
            regusername = request.form['regusername']
            regemail = request.form['regemail']
            regpassword = request.form['regpass1']
            regpassword2 = request.form['regpass2']
            if regpassword != regpassword2:
                error = "Passwords do not match"
            elif not re.match(r"[^@]+@[^@]+\.[^@]+", regemail):
                error = "Invalid email"
            else:
                if register(regusername, regemail, regpassword):
                    return redirect(url_for('app', username=regusername))
                else:
                    error = "Username already exists"
                    return render_template('login.html', error=error)
            printit(regusername, regemail, regpassword, regpassword2)
        
        
    return render_template('login.html', error=error)

@application.route("/app/user=<username>", methods=["POST", "GET"])
def app(username):

    return render_template('app.html' , username=username)
                                         
                                        


"========== Api Calendar ==========="
@application.route("/api/calendar/<username>/<date>", methods=["GET"])
def api_calendar_data(username, date):  #date is current_week or weekID

    return jsonify(alt_week_data(date, username)) #REPLACE THE CURRENT WEEK VALUE

@application.route("/api/createcalendar", methods=["GET", "POST"])
def api_calendar_create():
    if request.method == "POST":
        #take the date and create a database if not existing
        data = request.json

        printit(data)
        create_calendar(data)
        return jsonify(data)

@application.route("/api/getcalendar/<username>/<weekID>", methods=["GET"])
def api_calendar_get(weekID, username):
    calendar_data = page_load_calendar_query(weekID, username)
    return jsonify(calendar_data)

@application.route('/emptycalendar.html', methods=["GET"])
def emptycalendar():
    return render_template('emptycalendar.html')


if __name__ == "__main__":
    # turn debug off for prodcution deployment
    application.run(debug=True, host='0.0.0.0')

