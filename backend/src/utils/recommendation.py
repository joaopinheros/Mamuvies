from models.user import Rating, User
from models import db
import requests
from config import Config

def get_user_preferences(user_id):
    user = User.query.get(user_id)
    if user:
        return user.preferences
    return []

def get_movie_genres(movie_id):
    url = f"{Config.BASE_URL}/movie/{movie_id}"
    params = {'api_key': Config.API_KEY}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        movie_info = response.json()
        if 'genres' in movie_info:
            genres = [genre['name'] for genre in movie_info['genres']]
            return genres
    return []

def recommend_movies(user_id):
    ratings = Rating.query.filter_by(user_id=user_id).all()
    if not ratings:
        return []

    user_preferences = get_user_preferences(user_id)
    preferred_genres = set(user_preferences.split(','))

    # Crie um dicionário para armazenar a contagem de gostos por filme e gênero
    liked_movies = {}
    total_ratings = len(ratings)

    for rating in ratings:
        if rating.rating > 3:  # Considerando que uma avaliação de 4 ou 5 indica que o usuário gostou do filme
            movie_genres = get_movie_genres(rating.movie_id)
            for genre in movie_genres:
                if genre in preferred_genres:
                    if rating.movie_id in liked_movies:
                        liked_movies[rating.movie_id] += 1
                    else:
                        liked_movies[rating.movie_id] = 1
                    break  # Parar de verificar os gêneros assim que encontrar um gênero preferido

    # Ordene os filmes com base no número de gostos (em ordem decrescente)
    sorted_movies = sorted(liked_movies.items(), key=lambda x: x[1], reverse=True)

    # Gere uma lista de recomendações com base na porcentagem de gostos
    recommendations = []
    for movie_id, likes in sorted_movies:
        percentage = likes / total_ratings
        recommendations.append((movie_id, percentage))

    return recommendations
