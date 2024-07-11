from mysql.connector import connect
from .app_config import AppConfig

# Data Access Layer:
class DAL:

    # Ctor - creating a connection:
    def __init__(self):
        self.connection = connect(
            host = AppConfig.mysql_host,
            user = AppConfig.mysql_user,
            password = AppConfig.mysql_password,
            database = AppConfig.mysql_database
        )

    # Getting back an entire table as a list of dictionaries:
    def get_table(self, sql, params = None):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, params)
            table = cursor.fetchall()
            return table
    
    # Getting back a scalar dictionary:
    def get_scalar(self, sql, params = None):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, params)
            scalar = cursor.fetchone()
            return scalar
    
    # Adding a new row to the table:
    def insert(self, sql, params = None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            last_row_id = cursor.lastrowid
            return last_row_id
        
    # Updating an existing row:
    def update(self, sql, params = None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            row_count = cursor.rowcount
            return row_count
        
    # Deleting an existing row:
    def delete(self, sql, params = None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            row_count = cursor.rowcount
            return row_count
        
    # Closing the connection:
    def close(self):
        self.connection.close()