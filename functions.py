
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
        collection.insert_one({"username": username, "password": password, "email": email})
        cluster.close()
        return True
    else:
        cluster.close()
        return False
    

" =========== App Calendar =========== "

#FIX LOL


def calendar_current_date():
    date_now = datetime.datetime.now()
    
    day_num = int(date_now.strftime("%d"))
    day = (date_now.strftime("%A"))
    month = (date_now.strftime("%B"))
    year = (date_now.year)
    day_order = int(date_now.strftime("%w"))
    
    week_num_dates = [day_num-day_order+1, day_num-day_order+2, day_num-day_order+3, day_num-day_order+4, day_num-day_order+5, day_num-day_order+6, day_num-day_order+7]
    week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    month_num = int(date_now.strftime("%m"))
    current_week = str(month_num)+"-"+str(week_num_dates[0])+"-"+str(year)

    #create a list of 7 empty strings except for the day_num index value of "active"
    calendar_days = [""]*7
    calendar_days[day_order-1] = "active"

    return month, year, week_list, week_num_dates, calendar_days, current_week

def calendar_next(username, date): #WHY MONTHS SKIP by TWO?
    date_split = date.split("-")
    month = int(date_split[0])
    #print(month)
    static_month = month
    day = int(date_split[1])
    year = int(date_split[2])
    range_month = calendar.monthrange(year, month)
    #print(range_month[1])
    list_of_next_week = [day+7, day+8, day+9, day+10, day+11, day+12, day+13]
    
    for i in range(len(list_of_next_week)):

        if list_of_next_week[i] == range_month[1]+1:
            list_of_next_week[i] = 1
                
        if list_of_next_week[i] > range_month[1]:
            difference = abs(list_of_next_week[i] - range_month[1])
            #print(difference)
            list_of_next_week[i] = (difference)
        
        else:
            pass
    print(list_of_next_week)
    if (7 in list_of_next_week):
        month = month+1
        
        if month == 13:
                month = 1
                year += 1
        
        current_week = str(month)+"-"+str(list_of_next_week[0])+"-"+str(year)
    else:
        current_week = str(static_month)+"-"+str(list_of_next_week[0])+"-"+str(year)
        month = static_month
    #print(current_week)
    #print(month)
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    week = {"month": months[month-1], 
            "year": year, "week_list": week_list, 
            "week_num_dates": list_of_next_week ,
            "current_week": current_week}
    
    return week



def calendar_prev(username, date):
    date_split = date.split("-")
    month = int(date_split[0])
    #print(month)
    static_month = month
    day = int(date_split[1])
    year = int(date_split[2])
    #range_month = calendar.monthrange(year, month)

    #take the date and see if seven days prior accounts for another mont
    check = day-7
    if (check <= 0): #previous month
        
        month = month - 1
        if (month == 0):
            month = 12
            year = year -1
        range_month_prev = calendar.monthrange(year, month)
        print(range_month_prev)

        list_of_prev_week = [range_month_prev[1]+check, range_month_prev[1]+check+1, range_month_prev[1]+check+2, range_month_prev[1]+check+3, range_month_prev[1]+check+4, range_month_prev[1]+check+5, range_month_prev[1]+check+6]
        for i in range(len(list_of_prev_week)):
            print(list_of_prev_week[i])
            if (list_of_prev_week[i] > range_month_prev[1]):
                list_of_prev_week[i] = (list_of_prev_week[i]-range_month_prev[1])

        print(list_of_prev_week)
    else:
        list_of_prev_week = [day-7, day-6, day-5, day-4, day-3, day-2, day-1]
    
    current_week = str(month)+"-"+str(list_of_prev_week[0])+"-"+str(year)

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    week = {"month": months[month-1], 
            "year": year, "week_list": week_list, 
            "week_num_dates": list_of_prev_week ,
            "current_week": current_week}
    
    return week

def create_calendar(data):
    username = data["username"]
    title = data["title"]
    date = data["date"]
    print(date)
    time = data["time"]
    duration = data["duration"]
    importance = data["importance"]
    desc = data["desc"]
    day_name = data["day_name"]
    #description = data["description"]

    #given the date, find the date of monday and use it as the db key value
    date_split = date.split("-")
    year = int(date_split[2])
    month = int(date_split[0])
    day = int(date_split[1])

    #find the day of the week of date
    datetime_object = datetime.datetime.strptime(date, '%m-%d-%Y')

    day_of_week = int(datetime_object.strftime("%w"))

    #print(day_of_week)

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
                    desc)


    return


def mongodb_insert(weekID, username, title, date, time, duration, importance, day_name, desc):
    cluster = MongoClient(connection_string, tlsCAFile=certifi.where())
    db = cluster[username+"_calendar"]
    collection = db[weekID]
    #find collection with "date":date and "time":time if exists
    #if exists, update the collection with new data
    if (collection.find_one({"date":date, "time":time})):
        #update the collection
        collection.update_one({"date":date, "time":time}, {"$set": {"title":title, "day_name":day_name, "duration": duration, "importance":importance, "desc":desc}})
        print("updated")
    else:
        #insert the data
        collection.insert_one({"date":date, 
                                "time":time, 
                                "title":title, 
                                "day_name":day_name, 
                                "duration":duration,
                                "importance":importance,
                                "desc":desc})
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

#print(page_load_calendar_query("11-29-2021", "admin"))
#print(init_user_db())
#print(logins("admin", "root"))