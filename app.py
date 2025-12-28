from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Arquivo para armazenar as cartinhas
CARDS_FILE = 'love_cards.json'

def load_cards():
    if os.path.exists(CARDS_FILE):
        with open(CARDS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_cards(cards):
    with open(CARDS_FILE, 'w', encoding='utf-8') as f:
        json.dump(cards, f, ensure_ascii=False, indent=2)

@app.route('/api/cards', methods=['GET'])
def get_cards():
    cards = load_cards()
    return jsonify(cards)

@app.route('/api/cards', methods=['POST'])
def add_card():
    new_card = request.json
    cards = load_cards()
    new_card['id'] = len(cards) + 1
    cards.append(new_card)
    save_cards(cards)
    return jsonify(new_card), 201

@app.route('/api/cards/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    cards = load_cards()
    cards = [card for card in cards if card['id'] != card_id]
    save_cards(cards)
    return jsonify({'message': 'Cartinha removida'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)