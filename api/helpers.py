from db import query_db

# Gets all reservations
def get_reservations():
    return query_db('SELECT * FROM reservations')
