import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_KEY = 'c3e31a681ee6a39665ddfa7c42ce41bb'
    BASE_URL = 'https://api.themoviedb.org/3'
