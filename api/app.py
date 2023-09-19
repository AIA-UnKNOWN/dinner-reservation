from flask import request
from db import app
import helpers

@app.get('/')
def index():
    return "Dinner reservation is working"

@app.get('/reservations')
def get_reservations():
    return helpers.get_reservations()

@app.get('/reservations/cancreate')
def can_create_reservation():
    reservations = helpers.get_recent_reservations()
    print(len(reservations))
    if (len(reservations) >= 3): return 'false'
    return 'true'

@app.get('/reservation/<int:id>')
def get_reservation(id):
    return helpers.get_reservation(id)

@app.post('/reservation')
def create_reservation():
    return helpers.create_reservation(request.form)

@app.put('/reservation/<int:id>')
def update_reservation(id):
    return helpers.update_reservation(id, request.form)
