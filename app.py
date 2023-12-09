from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from lider import Lider
from colaborador import Colaborador
from reuniao import Reuniao
from db_connector import DBConnector
from datetime import datetime

app = Flask(__name__)
CORS(app)

db = DBConnector("feedback.db")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/lider")
def lider():
    return render_template("lider.html")

@app.route("/colaborador")
def colaborador():
    return render_template("colaborador.html")

@app.route("/reuniao")
def reuniao():
    return render_template("reuniao.html")


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

# Criar um líder (cria um lider com o atributo ativo = 1)
@app.route("/lideres", methods=["POST"])
def create_lider():
    data = request.get_json()
    lider = Lider(nome = data["nome"], departamento = data["departamento"], email = data["email"], password = data["password"], ativo = "1")
    lider.save(db.connect())
    return jsonify(lider.to_dict())

# Criar um colaborador
@app.route("/colaboradores", methods=["POST"])
def create_colaborador():
    data = request.get_json()
    colaborador = Colaborador(nome = data["nome"], departamento = data["departamento"], email = data["email"], senha = data["senha"], ativo = "1")
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
@app.route("/lideres/<int:id_lider>", methods=["PUT"])
def update_lider(id_lider):
    data = request.get_json()
    lider = Lider.get_by_id(id_lider, db.connect())
    if lider:
        lider.nome = data["nome"]
        lider.departamento = data["departamento"]
        lider.email = data["email"]
        lider.password = data["password"]
        lider.save(db.connect())
        return jsonify(lider.to_dict())
    else:
        return jsonify({"error": "Líder não localizado"}), 404
    
from flask import request, jsonify

# atualizar uma propriedade de um lider
@app.route("/lideres/<int:id_lider>/<string:propriedade>", methods=["PUT"])
def update_lider_property(id_lider, propriedade):
    data = request.get_json()
    lider = Lider.get_by_id(id_lider, db.connect())

    if lider:
        if propriedade in ["nome", "departamento", "email", "password", "ativo"]:
            setattr(lider, propriedade, data[propriedade])
            lider.save(db.connect())
            return jsonify(lider.to_dict())
        else:
            return jsonify({"error": f"Propriedade {propriedade} inválida"}), 400
    else:
        return jsonify({"error": "Líder não localizado"}), 404


# Atualizar um colaborador
@app.route("/colaboradores/<int:id_colaborador>", methods=["PUT"])
def update_colaborador(id_colaborador):
    data = request.get_json()
    colaborador = Colaborador.get_by_id(id_colaborador, db.connect())
    if colaborador:
        colaborador.nome = data["nome"]
        colaborador.departamento = data["departamento"]
        colaborador.email = data["email"]
        colaborador.senha = data["senha"]
        colaborador.save(db.connect())
        return jsonify(colaborador.to_dict())
    else:
        return jsonify({"error": "Colaborador não localizado"}), 404
    
# atualizar uma propriedade de um colaborador
@app.route("/colaboradores/<int:id_colaborador>/<string:propriedade>", methods=["PUT"])
def update_colaborador_property(id_colaborador, propriedade):
    data = request.get_json()
    colaborador = Colaborador.get_by_id(id_colaborador, db.connect())

    if colaborador:
        if propriedade in ["nome", "departamento", "email", "senha", "ativo"]:
            setattr(colaborador, propriedade, data[propriedade])
            colaborador.save(db.connect())
            return jsonify(colaborador.to_dict())
        else:
            return jsonify({"error": f"Propriedade {propriedade} inválida"}), 400
    else:
        return jsonify({"error": "Líder não localizado"}), 404


# Atualizar uma reunião
@app.route("/reunioes/<int:id_reuniao>", methods=["PUT"])
def update_reuniao(id_reuniao):
    data = request.get_json()
    reuniao = Reuniao.get_by_id(id_reuniao, db.connect())
    if reuniao:
        lider = Lider.get_by_id(data["id_lider"], db.connect())
        colaborador = Colaborador.get_by_id(data["id_colaborador"], db.connect())
        data_reuniao = datetime.fromisoformat(data["data_reuniao"])
        reuniao.lider = lider
        reuniao.colaborador = colaborador
        reuniao.data = data_reuniao
        reuniao.save(db.connect())
        return jsonify(reuniao.to_dict())
    else:
        return jsonify({"error": "Reunião não localizada"}), 404
    
# Remover um líder
@app.route("/lideres/<int:id_lider>", methods=["DELETE"])
def delete_lider(id_lider):
    lider = Lider.get_by_id(id_lider, db.connect())
    if lider:
        lider.delete(db.connect())
        return '', 204
    else:
        return jsonify({"error": "Líder não localizado"}), 404
    
# Remover um colaborador
@app.route("/colaboradores/<int:id_colaborador>", methods=["DELETE"])
def delete_colaborador(id_colaborador):
    colaborador = Colaborador.get_by_id(id_colaborador, db.connect())
    if colaborador:
        colaborador.delete(db.connect())
        return '', 204
    else:
        return jsonify({"error": "Colaborador não localizado"}), 404
    
# Remover uma reunião
@app.route("/reunioes/<int:id_reuniao>", methods=["DELETE"])
def delete_reuniao(id_reuniao):
    reuniao = Reuniao.get_by_id(id_reuniao, db.connect())
    if reuniao:
        reuniao.delete(db.connect())
        return '', 204
    else:
        return jsonify({"error": "Reunião não localizada"}), 404
    
app.run(debug=True)
