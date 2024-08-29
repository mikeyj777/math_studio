from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

DATABASE = 'math_studio.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                grade TEXT NOT NULL
            )
        ''')
        db.commit()

@app.route('/login', methods=['POST'])
def login():
    
    data = request.json
    print(data)
    name = data['name']
    cursor = get_db().cursor()
    cursor.execute('SELECT * FROM users WHERE name = ?', (name,))
    user = cursor.fetchone()
    if user:
        return jsonify({'id': user[0], 'name': user[1], 'grade': user[2]})
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/init_users', methods=['POST'])
def init_users():
    users = [
        {'name': 'Ellie', 'grade': '1'},
        {'name': 'Emma', 'grade': 'K'},
        {'name': 'Avery', 'grade': 'K'},

    ]
    db = get_db()
    cursor = db.cursor()
    cursor.executemany('INSERT INTO users (name, grade) VALUES (?, ?)', [(u['name'], u['grade']) for u in users])
    db.commit()
    return jsonify({'status': 'Users initialized'})

if __name__ == '__main__':
    init_db()  # Initialize the database and table
    app.run(debug=True)
