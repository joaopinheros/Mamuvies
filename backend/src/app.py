from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from models import db, User
from utils.movie_search import search_movies
from utils.movie_details import get_movie_details
from utils.recommendation import recommend_movies
from utils.rate_movie import rate_movie

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.before_request
def before_request():
    if not hasattr(app, 'first_request_done'):
        create_tables()
        app.first_request_done = True

def create_tables():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    preferences = data.get('preferences')
    
    if not username or not password or not name:
        return jsonify({'message': 'Missing username, password, or name'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, name=name, preferences=preferences)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid username or password'}), 401
    
    login_user(user)
    return jsonify({'message': 'User logged in successfully'}), 200

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'User logged out successfully'}), 200

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'message': 'Missing search query'}), 400
    
    movies = search_movies(query)
    if movies:
        return jsonify({'results': movies}), 200
    else:
        return jsonify({'message': 'No movies found'}), 404

@app.route('/movie/<int:movie_id>', methods=['GET'])
def movie_details(movie_id):
    details = get_movie_details(movie_id)
    if details:
        return jsonify(details), 200
    else:
        return jsonify({'message': 'Movie not found'}), 404

@app.route('/rate', methods=['POST'])
@login_required
def rate():
    data = request.json
    movie_id = data.get('movie_id')
    rating = data.get('rating')
    if not movie_id or not rating:
        return jsonify({'message': 'Missing movie_id or rating'}), 400
    
    rate_movie(current_user.id, movie_id, rating)
    return jsonify({'message': 'Rating saved successfully'}), 201

@app.route('/recommend', methods=['GET'])
@login_required
def recommend():
    recommendations = recommend_movies(current_user.id)
    return jsonify({'recommendations': recommendations}), 200

if __name__ == '__main__':
    app.run(debug=True)
