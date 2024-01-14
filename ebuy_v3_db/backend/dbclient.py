from configparser import ConfigParser
import psycopg2


def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

conn = None

def connect():
    """ Connect to the PostgreSQL database server """
    global conn
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)


        # create a cursor
        cur = conn.cursor()
        
        #esecute a statement 
        print('PostgreSQL database version:')
        cur.execute('SELECT version() ')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)

        return cur

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return None

def write_in_db(cur, sql_insert):
    global conn
    try:
        cur.execute(sql_insert)
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        sError = str(error)
        if sError.startswith("duplicate key value"):
            print("Duplicate key, vado avanti")
            conn.rollback()
            return -2
        cur = None
        conn = None
        print(sError)
        return -1

def read_in_db(cur, sql_select):
    try:
        cur.execute(sql_select)
        print("The number of parts: ", cur.rowcount)
        row = cur.fetchone()

        while row is not None:
            print(row)
            row = cur.fetchone()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur = None
        conn = None

def close(cur):
    global conn
    try:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur = None
        conn = None



