from flask_sqlalchemy import SQLAlchemy
from src.models.user import db

class QuizResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    curso = db.Column(db.String(100), nullable=False)
    
    # Respostas para perguntas de múltipla escolha (1-5)
    q1 = db.Column(db.String(10), nullable=True)
    q2 = db.Column(db.String(10), nullable=True)
    q3 = db.Column(db.String(10), nullable=True)
    q4 = db.Column(db.String(10), nullable=True)
    q5 = db.Column(db.String(10), nullable=True)
    
    # Respostas para perguntas verdadeiro/falso (6-10)
    q6 = db.Column(db.String(10), nullable=True)
    q7 = db.Column(db.String(10), nullable=True)
    q8 = db.Column(db.String(10), nullable=True)
    q9 = db.Column(db.String(10), nullable=True)
    q10 = db.Column(db.String(10), nullable=True)
    
    # Respostas para perguntas abertas (11-14)
    q11 = db.Column(db.Text, nullable=True)
    q12 = db.Column(db.Text, nullable=True)
    q13 = db.Column(db.Text, nullable=True)
    q14 = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<QuizResponse {self.nome} - {self.curso}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'curso': self.curso,
            'q1': self.q1,
            'q2': self.q2,
            'q3': self.q3,
            'q4': self.q4,
            'q5': self.q5,
            'q6': self.q6,
            'q7': self.q7,
            'q8': self.q8,
            'q9': self.q9,
            'q10': self.q10,
            'q11': self.q11,
            'q12': self.q12,
            'q13': self.q13,
            'q14': self.q14
        }

