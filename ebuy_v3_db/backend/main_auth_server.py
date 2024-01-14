import base64

from flask import Flask, json, request, render_template
from flask_cors import CORS
import pandas as pd
import dbclient as db

cur = None

def dbcall(utente, password):
    cur = db.connect()

    credenziali = db.read_in_db(cur, "select * from utenti")
    if credenziali[1] == utente:
        if credenziali[2] == password:
            print('Credenziali corrette')
            return 1
        return 0
    else:
        print('Credenziali errate')
        return 0
    db.close(cur)


def print_dictionary(dData):
    for keys, values in dData.items():
        print(keys)
        print(values)

reg_response_ok = {"status": 0, "error": "ok"}
reg_response_ko = {"status": 1232, "error": "utente errato per username"}
reg_response_duplicate_key = {"status":1233, "error": "utente gia registrato"}
companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)
CORS(api)  # Abilita CORS per l'applicazione Flask



@api.route('/private-user', methods=['OPTIONS'])
def registra_utente_OPTIONS():
	print("Ricevuta chiamata di registrazione (OPTIONS)")
	headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
	return '',204,headers
    
    
    
@api.route('/private-user', methods=['POST'])
def registra_utente():
    global cur
    print("Ricevuta chiamata di registrazione")
    
    content_type = request.headers.get('Content-Type')
    print("Ricevuta chiamata " + content_type)
    if (content_type == 'application/json'):
        json_request = request.json
        print(json_request)
        #print(json_request["username"])
        username = json_request["username"]
        password = json_request["password"]
        #inser_query = "insert into utenti(username, password, stato) values ('username','password')"
        insert_query =  "insert into utenti(username,password,stato) values ('" + json_request["username"] + "','" + json_request["password"] + "',1);"
        print(username)
        print(insert_query)
        ret = db.write_in_db(cur,insert_query)
        
        if ret == 0:
            return json.dumps(reg_response_ok)
        elif ret == -2:
        	return json.dumps(reg_response_duplicate_key),403
        else: 
            return json.dumps(reg_response_ko)
    else:
        return 'Content-Type not supported!',400

"""   
@api.route('/auth/login', methods=['OPTIONS'])
def registra_utente_OPTIONS():
	print("Ricevuta chiamata di login (OPTIONS)")
	headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
	return '',204,headers
    
    

@api.route('/auth/login', methods=['POST'])
def registra_utente():
    global cur
    print("Ricevuta POST di login")
    content_type = request.headers.get('Content-Type')
    print("Ricevuta chiamata " + content_type)
    if (content_type == 'application/json'):
        json_request = request.json
        print(json_request)
        #print(json_request["username"])
        username = json_request["username"]
        password = json_request["password"]
        return json.dumps(reg_response_ok)
        
     
        select_query =  f"select * from utenti where username = {json_request['username']} and password = {json_request['password']} and stato = 1"
    
        ret = db.read_in_db(cur,select_query)
        
        if ret == 0:
            return json.dumps(reg_response_ok)
        elif ret == -2:
        	return json.dumps(reg_response_duplicate_key),403
        else: 
            return json.dumps(reg_response_ko)
    else:
        return 'Content-Type not supported!',400


"""
if __name__ == '__main__':
    cur = db.connect()
    api.run(host="127.0.0.1", port=4430)