import os, subprocess
from pathlib import Path
import psycopg2
from psycopg2 import errorcodes 

app_path = os.path.dirname(os.path.abspath(__file__))

def init_db(filename_list, connect_command):
    '''
    '''
    conn = connect_db(connect_command)
    if conn == 0:
        print('cannot connect to db')
    else:
        cursor = conn.cursor()
        try:
            # setup database
            for filename in filename_list:
                fp = open(filename, 'r')
                cursor.execute(fp.read())

                fp.close()
            conn.commit()
            conn.close()
            return 1
        except psycopg2.Error as e:
            print(errorcodes.lookup(e.pgcode))
            print(errorcodes.lookup(e.pgcode[:2]))
            return 0



def connect_db(connect_command):
    '''
    '''
    try:
        conn = psycopg2.connect(connect_command)        
    except psycopg2.Error as e:
        print(errorcodes.lookup(e.pgcode[:2]))
        return 0

    return conn
    
  