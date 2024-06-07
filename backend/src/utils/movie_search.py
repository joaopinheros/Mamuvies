import requests
from config import Config

def search_movies(query):
    url = f"{Config.BASE_URL}/search/movie"
    params = {'api_key': Config.API_KEY, 'query': query}
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()['results']
    else:
        return None
