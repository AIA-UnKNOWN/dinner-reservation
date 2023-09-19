CREATE TABLE reservations (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_datetime TIMESTAMP,
    reservation_first_name VARCHAR(255),
    reservation_last_name VARCHAR(255),
    phone_number VARCHAR(20),
    number_of_guests INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
