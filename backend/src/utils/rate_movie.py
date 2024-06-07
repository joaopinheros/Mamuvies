from models.db import db
from models.user import Rating

def rate_movie(user_id, movie_id, rating):
    # Cria uma nova instância de Rating
    new_rating = Rating(user_id=user_id, movie_id=movie_id, rating=rating)
    
    # Adiciona a nova avaliação à sessão do banco de dados
    db.session.add(new_rating)
    
    # Commit para salvar a nova avaliação no banco de dados
    db.session.commit()
