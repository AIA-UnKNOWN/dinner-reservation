from flask import request
from db import app
import helpers

@app.get('/')
def index():
    return "Dinner reservation is working"

@app.get('/reservations')
def get_reservations():
    return helpers.get_reservations()

@app.post('/reservation')
def create_reservation():
    return helpers.create_reservation(request.form)

@app.put('/reservation/<int:id>')
def update_reservation(id):
    return helpers.update_reservation(id, request.form)