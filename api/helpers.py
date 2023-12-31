from db import query_db, get_db
from datetime import datetime, timedelta

# Validator
def validate_payload(required_fields=[], payload={}):
    for field in required_fields:
        if payload.get(field) is None:
            return False
    return True

# Gets reservations created 30 minutes ago or more
def get_reservations():
    # Calculate the timestamp 30 minutes ago
    thirty_minutes_ago = datetime.now() - timedelta(minutes=30)
    # Format the timestamp as a string in "YYYY-MM-DD HH:MM:SS" format
    thirty_minutes_ago_str = thirty_minutes_ago.strftime("%Y-%m-%d %H:%M:%S")
    # SQL query to retrieve reservations created 30 minutes ago or more
    sql = 'SELECT * FROM reservations WHERE created_at <= ?'
    # Execute the query with the timestamp as a parameter
    return query_db(sql, [thirty_minutes_ago_str])

# Creates a reservation
def create_reservation(reservation_payload):
    # Checks the required fields
    if not validate_payload(
        [
            'reservation_datetime',
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
            reservation_datetime,
            reservation_first_name,
            reservation_last_name,
            phone_number,
            number_of_guests
        ) VALUES (?, ?, ?, ?, ?);
    """
    # Runs the query with arguments
    query_db(
        insert_reservation_query,
        (
            reservation_payload['reservation_datetime'],
            reservation_payload['reservation_first_name'],
            reservation_payload['reservation_last_name'],
            reservation_payload['phone_number'],
            reservation_payload['number_of_guests']
        )
    )
    # Commits the inserted data
    get_db().commit()
    return 'reservation created'

# Updates a reservation
def update_reservation(reservation_id, reservation_payload):
    # Create a dictionary to hold the updated values
    updated_values = {}
    # Check and update each field if it exists in reservation_payload
    if 'reservation_first_name' in reservation_payload:
        updated_values['reservation_first_name'] = reservation_payload['reservation_first_name']
    if 'reservation_last_name' in reservation_payload:
        updated_values['reservation_last_name'] = reservation_payload['reservation_last_name']
    if 'phone_number' in reservation_payload:
        updated_values['phone_number'] = reservation_payload['phone_number']
    if 'number_of_guests' in reservation_payload:
        updated_values['number_of_guests'] = reservation_payload['number_of_guests']
    if 'reservation_datetime' in reservation_payload:
        updated_values['reservation_datetime'] = reservation_payload['reservation_datetime']
    # Build the SQL query dynamically based on the updated values
    update_reservation_query = "UPDATE reservations SET "
    update_reservation_query += ", ".join(f"{key} = ?" for key in updated_values)
    update_reservation_query += " WHERE ID = ?"
    # Prepare the arguments for the query
    args = [updated_values[key] for key in updated_values] + [reservation_id]
    # Execute the update query
    query_db(update_reservation_query, args)
    # Commits the updated data
    get_db().commit()
    return 'reservation updated'

# Gets the reservation based on the id
def get_reservation(id):
    return query_db('SELECT * FROM reservations WHERE ID = ?', [id], one=True)

# Retrieve reservations created under 30 minutes ago
def get_recent_reservations():
    # Calculate the timestamp 30 minutes ago
    thirty_minutes_ago = datetime.now() - timedelta(minutes=30)
    # Format the timestamp as a string in "YYYY-MM-DD HH:MM:SS" format
    thirty_minutes_ago_str = thirty_minutes_ago.strftime("%Y-%m-%d %H:%M:%S")
    # SQL query to retrieve recent reservations created under 30 minutes ago
    sql = 'SELECT * FROM reservations WHERE created_at >= ?'
    # Execute the query with the timestamp as a parameter
    under_thirty_minutes_ago_reservations = query_db(sql, [thirty_minutes_ago_str])
    return under_thirty_minutes_ago_reservations

# Deletes a reservation based on ID
def delete_reservation(id):
    query_db('DELETE FROM reservations WHERE ID = ?', [id], one=True)
    get_db().commit()
    return 'reservation deleted'