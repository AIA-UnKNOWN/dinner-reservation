import sqlite3
from flask import Flask, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = 'dinner_reservation.db'

def make_dicts(cursor, row):
    return dict(
        (cursor.description[idx][0], value)
            for idx, value in enumerate(row)
    )

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = make_dicts
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('dinner_reservation_schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()