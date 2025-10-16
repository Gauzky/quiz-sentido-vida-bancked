from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.quiz_response import QuizResponse

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/submit', methods=['POST'])
def submit_quiz():
    try:
        data = request.json
        
        new_response = QuizResponse(
            nome=data.get('nome'),
            curso=data.get('curso'),
            q1=data.get('q1'),
            q2=data.get('q2'),
            q3=data.get('q3'),
            q4=data.get('q4'),
            q5=data.get('q5'),
            q6=data.get('q6'),
            q7=data.get('q7'),
            q8=data.get('q8'),
            q9=data.get('q9'),
            q10=data.get('q10'),
            q11=data.get('q11'),
            q12=data.get('q12'),
            q13=data.get('q13'),
            q14=data.get('q14')
        )
        
        db.session.add(new_response)
        db.session.commit()
        
        return jsonify({'message': 'Quiz enviado com sucesso!', 'id': new_response.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@quiz_bp.route('/responses', methods=['GET'])
def get_responses():
    try:
        responses = QuizResponse.query.all()
        return jsonify([response.to_dict() for response in responses]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

