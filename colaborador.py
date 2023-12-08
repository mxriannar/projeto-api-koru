import sqlite3

class Colaborador:
    def __init__(self, nome:str, departamento:str, email:str, senha:str, ativo:int, id=None):
        self.id = id
        self.nome = nome
        self.departamento = departamento
        self.email = email
        self.senha = senha
        self.ativo = ativo

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "departamento": self.departamento,
            "email": self.email,
            "senha": self.senha,
            "ativo": self.ativo
        }
    
    def save(self, db_connection: sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO colaboradores (nome_colaborador, departamento_colaborador, email_colaborador, senha_colaborador, ativo_colaborador) VALUES (?, ?, ?, ?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento, self.email, self.senha, self.ativo))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE colaboradores SET nome_colaborador = ?, departamento_colaborador = ?, email_colaborador = ?, senha_colaborador = ?, ativo_colaborador = ? WHERE id_colaborador = ?"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento, self.email, self.senha, self.ativo, self.id))
        db_connection.commit()

    def delete(self, db:sqlite3.Connection):
        query = "UPDATE colaboradores SET ativo = ? WHERE id_colaborador = ?"
        db.execute(query, (self.ativo, self.id))
        db.commit()
        db.close()

    @staticmethod
    def get_by_id(id, db:sqlite3.Connection):
        query = "SELECT * FROM colaboradores WHERE id_colaborador = ? AND ativo_colaborador = 1"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            return Colaborador(id = result[0], nome = result[1], departamento = result[2], email = result[3], senha = result[4], ativo = result[5])
        return None
    
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM colaboradores WHERE ativo_colaborador = 1"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        colaboradores = []
        for result in results:
            colaboradores.append(Colaborador(id = result[0], nome = result[1], departamento = result[2], email = result[3], senha = result[4], ativo = result[5]).to_dict())
        return colaboradores 