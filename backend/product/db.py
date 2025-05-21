import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    return psycopg2.connect(
        dbname='Econ',
        user='postgres',
        password='123456789',
        host='localhost',
        cursor_factory=RealDictCursor
    )