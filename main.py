from flask import Flask, render_template
import os
import psycopg2
from psycopg2 import errorcodes 
import socket
import util

app = Flask(__name__)

db_connect_command = "dbname='minesweeper' user='postgres' host='localhost' password='admin'"
# db_connect_command = "dbname='docker' user='docker' host='localhost' password='docker'"
sql_file = ['data/minesweeper.sql']
# sql_file = ['data/company.sql','data/student.sql','data/world.sql']
# cursor = conn.cursor()

@app.route('/api/add/<name>/<score>', methods=['GET'])
def execute_sql(name, score):

    conn = util.connect_db(db_connect_command)
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO finishes (score, name) VALUES (%s, %s);", (score, name))
        conn.commit()
        conn.close()
        return render_template("restart.html")
    except psycopg2.Error as e:
        conn.rollback()
        conn.close()
        print(errorcodes.lookup(e.pgcode))
        return errorcodes.lookup(e.pgcode[:2])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play", methods=['GET', 'POST'])
def play():
    return render_template("play.html")

@app.route("/leaderboards", methods=['GET', 'POST'])
def leaderboards():
    return render_template("leaderboards.html")

@app.route("/resetdb")
def db():
	util.init_db(sql_file, db_connect_command)
	return "CASH MONEY!!! YOU JUST RESET THE DATABASE!!"

if __name__ == "__main__":
    app.run(debug=True)
    util.init_db(sql_file, db_connect_command)