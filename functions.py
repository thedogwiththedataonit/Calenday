
from mongodb_connectionstring import connection_string
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi
import random
import time
import datetime
from datetime import date
import calendar
from pymongo import mongo_client

#function that takes in unlimited parameters and prints them out
def printit(*args):
    for arg in args:
        print(arg)
    

" =========== MONGODB FUNCTIONS =========== "

#init user database
def init_user_db():
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    #add dummy user to the collection admin with password root
    collection.insert_one({"username": "admin", "email":"test@email.com", "password": "root"})
    cluster.close()


def logins(username, password):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    user = collection.find_one({"username": username})
    if user is None:
        cluster.close()
        return "wrong credentials"
    else:
        if user["password"] == password:
            cluster.close()
            return "success"
        else:
            cluster.close()
            return "wrong credentials"

def register(username, email, password):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    user = collection.find_one({"username": username})
    if user is None:
        collection.insert_one({"username": username, 
                                "password": password, 
                                "email": email, 
                                "friends": [],
                                "requests": [],
                                })
        cluster.close()
        return True
    else:
        cluster.close()
        return False
    

" =========== App Calendar =========== "

#FIX LOL


def calendar_current_date():
    date_now = datetime.datetime.now() #does this mean time is dependent on server?
    print(date_now)
    day_num = int(date_now.strftime("%d"))
    day = (date_now.strftime("%A"))
    month = (date_now.strftime("%B"))
    month_num = int(date_now.strftime("%m"))
    year = int(date_now.year)
    day_order = int(date_now.strftime("%w"))

    month_max = (calendar.monthrange(year, month_num))[1]
    week_num_dates = [day_num-day_order+1, day_num-day_order+2, day_num-day_order+3, day_num-day_order+4, day_num-day_order+5, day_num-day_order+6, day_num-day_order+7]

    for i in range(len(week_num_dates)):
        if week_num_dates[i] > month_max:
            week_num_dates[i] = week_num_dates[i] - month_max
    
    
    week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    month_num = int(date_now.strftime("%m"))
    current_week = str(month_num)+"-"+str(week_num_dates[0])+"-"+str(year)
    print(current_week)
    #create a list of 7 empty strings except for the day_num index value of "active"
    calendar_days = [""]*7
    calendar_days[day_order-1] = "active"

    return month, year, week_list, week_num_dates, calendar_days, current_week


def create_calendar(data):
    username = data["username"]
    title = data["title"]
    date = data["date"]
    time = data["time"]
    duration = data["duration"]
    importance = data["importance"]
    desc = data["desc"]
    day_name = data["day_name"]
    key = data["key"]
    #description = data["description"]

    #given the date, find the date of monday and use it as the db key value
    date_split = date.split("-")
    year = int(date_split[2])
    month = int(date_split[0])
    day = int(date_split[1])

    #find the day of the week of date
    datetime_object = datetime.datetime.strptime(date, '%m-%d-%Y')

    day_of_week = int(datetime_object.strftime("%w"))
    if day_of_week == 0:
        day_of_week = 7

    week_of_query_day = day - day_of_week + 1
    #print(week_of_query_day)
    if week_of_query_day <= 0:
        #check the previous month max day
        prev_month_max = (calendar.monthrange(year, month-1))[1]
        week_of_query_day = prev_month_max + week_of_query_day
        #print(week_of_query_day)
        


    week_of_query = str(month)+"-"+str(week_of_query_day)+"-"+str(year)
    print(week_of_query) #this will be the index used to query db

    description = "none"
    mongodb_insert(week_of_query, 
                    username, 
                    title, 
                    date, 
                    time, 
                    duration,
                    importance,
                    day_name, 
                    desc,
                    key)


    return


def mongodb_insert(weekID, username, title, date, time, duration, importance, day_name, desc, key):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster[username+"_calendar"]
    collection = db[weekID]
    #find collection with "date":date and "time":time if exists
    #if exists, update the collection with new data
    if (collection.find_one({"date":date, "time":time})):
        #update the collection
        collection.update_one({"date":date, "time":time}, {"$set": {"title":title, "day_name":day_name, "duration": duration, "importance":importance, "desc":desc, "key":key}})
        print("updated")
    else:
        #insert the data
        collection.insert_one({"date":date, 
                                "time":time, 
                                "title":title, 
                                "day_name":day_name, 
                                "duration":duration,
                                "importance":importance,
                                "desc":desc,
                                "key":key})
        print("inserted")
    return
#print(calendar_prev("lol","12-6-2021"))


def page_load_calendar_query(weekID, username):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster[username+"_calendar"]
    collection = db[weekID]
    #get all the documents in the collection in a list
    documents = collection.find({})
    document_list = (list(documents))
    #remove the _id field from each dictionary in the list
    for i in range(len(document_list)):
        document_list[i].pop("_id")

    print(document_list)
    #if document_list is empty list, return false
    if (document_list == []):
        return False
    else:
        print(type(document_list))
        return document_list

def alt_week_data(weekID, username):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster[username+"_calendar"]
    collection = db[weekID]
    #get all the documents in the collection in a list
    documents = collection.find({})
    document_list = (list(documents))
    #remove the _id field from each dictionary in the list
    for i in range(len(document_list)):
        document_list[i].pop("_id")

    print(document_list)
    #if document_list is empty list, return false
    if (document_list == []):
        return False
    else:
        print(type(document_list))
        return document_list



" =========== App Friends =========== "

def add_friend(data):
    username = data["username"]
    friend= data["friend"]

    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    
    if (collection.find_one({"username":friend})): #if friend exists
        usernames_friends = collection.find_one({"username":username})["friends"]
        friends_requests = collection.find_one({"username":friend})["requests"]

        if (friend in usernames_friends):
            return "Already friends"
        if (friend not in usernames_friends) and (username not in friends_requests):
            #add username to friends requests list
            collection.update_one({"username":friend}, {"$push":{"requests":username}})
            return "Friend request sent"
        else: 
            return "Already requested"
    else:
        return "Friend not found"

def friend_requests(username):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    requests = collection.find_one({"username":username})["requests"]
    return requests

def accept_friend(data):
    username = data["username"]
    friend = data["friend"]

    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]

    #remove friend from requests
    collection.update_one({"username":username}, {"$pull":{"requests":friend}})
    #add friend to friends
    collection.update_one({"username":username}, {"$push":{"friends":friend}})
    #add username to friends friends
    collection.update_one({"username":friend}, {"$push":{"friends":username}})
    return "Friend added"

def reject_friend(data):
    username = data["username"]
    friend = data["friend"]

    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]

    #remove friend from requests
    collection.update_one({"username":username}, {"$pull":{"requests":friend}})
    return "Friend rejected"

def get_friends(username):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster["users"]
    collection = db["logins"]
    friends = collection.find_one({"username":username})["friends"]
    return friends
    
#print(add_friend({"username":"admin", "friend":"lol"}))


#print(friend_requests("admin"))
#print(page_load_calendar_query("11-29-2021", "admin"))
#print(init_user_db())
#print(logins("admin", "root"))