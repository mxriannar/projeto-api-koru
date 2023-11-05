from flask import Flask, request, jsonify
from lider import Lider
from colaborador import Colaborador
from reuniao import Reuniao
from db_connector import DBConnector
from datetime import datetime

app = Flask(__name__)

db = DBConnector("feedback.db")

# Retornar todos os líderes
@app.route("/lideres", methods=["GET"])
def get_lideres():
    lideres = Lider.get_all(db.connect())
    return jsonify(lideres)

# Retornar um líder pelo ID
@app.route("/lideres/<int:id_lider>", methods=["GET"])
def get_lider(id_lider):
    lider = Lider.get_by_id(id_lider, db.connect())
    if lider:
        return jsonify(lider.to_dict())
    else:
        return jsonify({"error": "Líder não localizado"}), 404

# Retornar todos os colaboradores
@app.route("/colaboradores", methods=["GET"])
def get_colaboradores():
    colaboradores = Colaborador.get_all(db.connect())
    return jsonify(colaboradores)

# Retornar um colaborador pelo ID
@app.route("/colaboradores/<int:id_colaborador>", methods=["GET"])
def get_colaborador(id_colaborador):
    colaborador = Colaborador.get_by_id(id_colaborador, db.connect())
    if colaborador:
        return jsonify(colaborador.to_dict())
    else:
        return jsonify({"error": "Colaborador não localizado"}), 404
    
# Retornar todas as reuniões
@app.route("/reunioes", methods=["GET"])
def get_reunioes():
    reunioes = Reuniao.get_all(db.connect())
    return jsonify(reunioes)

# Retornar uma reunião pelo ID
@app.route("/reunioes/<int:id_reuniao>", methods=["GET"])
def get_reuniao(id_reuniao):
    reuniao = Reuniao.get_by_id(id_reuniao, db.connect())
    if reuniao:
        return jsonify(reuniao.to_dict())
    else:
        return jsonify({"error": "Reunião não localizada"}), 404

# Criar um líder
@app.route("/lideres", methods=["POST"])
def create_lider():
    data = request.get_json()
    lider = Lider(nome = data["nome"], departamento = data["departamento"])
    lider.save(db.connect())
    return jsonify(lider.to_dict())

# Criar um colaborador
@app.route("/colaboradores", methods=["POST"])
def create_colaborador():
    data = request.get_json()
    colaborador = Colaborador(nome = data["nome"], departamento = data["departamento"])
    colaborador.save(db.connect())
    return jsonify(colaborador.to_dict())

# Criar uma reunião
@app.route("/reunioes", methods=["POST"])
def create_reuniao():
    data = request.get_json()
    lider = Lider.get_by_id(data["id_lider"], db.connect())
    colaborador = Colaborador.get_by_id(data["id_colaborador"], db.connect())
    data_reuniao = datetime.fromisoformat(data["data_reuniao"])
    reuniao = Reuniao(lider = lider, colaborador = colaborador, data = data_reuniao)
    reuniao.save(db.connect())
    return jsonify(reuniao.to_dict())

# Atualizar um líder

# Atualizar um colaborador

# Atualizar uma reunião

# Remover um líder

# Remover um colaborador

# Remover uma reunião

app.run(debug=True)