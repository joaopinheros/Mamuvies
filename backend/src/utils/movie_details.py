import requests
from config import Config

def get_movie_details(movie_id):
    url = f"{Config.BASE_URL}/movie/{movie_id}"
    params = {'api_key': Config.API_KEY, 'append_to_response': 'credits'}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        movie_info = response.json()
        if 'credits' in movie_info and 'crew' in movie_info['credits']:
            director = next((crew_member['name'] for crew_member in movie_info['credits']['crew'] if crew_member['job'] == 'Director'), "Diretor Desconhecido")
        else:
            director = "Diretor Desconhecido"
        genres = ["Gênero Desconhecido"]
        if 'genres' in movie_info:
            genres = [genre['name'] for genre in movie_info['genres']]
        return {
            'title': movie_info['title'],
            'release_date': movie_info['release_date'],
            'director': director,
            'genres': genres,
            'overview': movie_info['overview'],
            'poster_path': f"https://image.tmdb.org/t/p/w500{movie_info['poster_path']}" if movie_info.get('poster_path') else None,
            'vote_average': movie_info['vote_average']
        }
    else:
        return None
