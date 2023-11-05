from flask import Flask, request, jsonify
from lider import Lider
from colaborador import Colaborador
from reuniao import Reuniao
from db_connector import DBConnector

app = Flask(__name__)

db = DBConnector("feedback.db")

# Retorna todos os líderes
@app.route("/lideres", methods=["GET"])
def get_lideres():
    lideres = Lider.get_all(db.connect())
    return jsonify(lideres)

# Retorna um líder pelo ID
@app.route("/lideres/<int:id_lider>", methods=["GET"])
def get_lider(id_lider):
    lider = Lider.get_by_id(id_lider, db.connect())
    if lider:
        return jsonify(lider.to_dict())
    else:
        return jsonify({"error": "Líder não localizado"}), 404

# Retorna todos os colaboradores
@app.route("/colaboradores", methods=["GET"])
def get_colaboradores():
    colaboradores = Colaborador.get_all(db.connect())
    return jsonify(colaboradores)

# Retorna um colaborador pelo ID
@app.route("/colaboradores/<int:id_colaborador>", methods=["GET"])
def get_colaborador(id_colaborador):
    colaborador = Colaborador.get_by_id(id_colaborador, db.connect())
    if colaborador:
        return jsonify(colaborador.to_dict())
    else:
        return jsonify({"error": "Colaborador não localizado"}), 404
    
# Retorna todas as reuniões
@app.route("/reunioes", methods=["GET"])
def get_reunioes():
    reunioes = Reuniao.get_all(db.connect())
    return jsonify(reunioes)

# Retorna uma reunião pelo ID
@app.route("/reunioes/<int:id_reuniao>", methods=["GET"])
def get_reuniao(id_reuniao):
    reuniao = Reuniao.get_by_id(id_reuniao, db.connect())
    if reuniao:
        return jsonify(reuniao.to_dict())
    else:
        return jsonify({"error": "Reunião não localizada"}), 404


app.run(debug=True)