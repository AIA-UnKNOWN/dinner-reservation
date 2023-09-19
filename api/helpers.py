from db import query_db, get_db

# Validator
def validate_payload(required_fields=[], payload={}):
    for field in required_fields:
        if payload.get(field) is None:
            return False
    return True

# Gets all reservations
def get_reservations():
    return query_db('SELECT * FROM reservations')

# Creates a reservation
def create_reservation(reservation_payload):
    # Checks the required fields
    if not validate_payload(
        [
            'reservation_first_name',
            'reservation_last_name',
            'phone_number',
            'number_of_guests'
        ],
        reservation_payload
    ): return "Payload requires valid reservation_datetime, reservation_first_name, reservation_last_name, phone_number, number_of_guests field"
    # Creates an insert query for inserting reservation
    insert_reservation_query = """
        INSERT INTO reservations (
            reservation_first_name,
            reservation_last_name,
            phone_number,
            number_of_guests
        ) VALUES (?, ?, ?, ?);
    """
    # Runs the query with arguments
    query_db(
        insert_reservation_query,
        (
            reservation_payload['reservation_first_name'],
            reservation_payload['reservation_last_name'],
            reservation_payload['phone_number'],
            reservation_payload['number_of_guests']
        )
    )
    # Commits the inserted data
    get_db().commit()
    return 'reservation created'