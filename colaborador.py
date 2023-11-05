import sqlite3

class Colaborador:
    def __init__(self, nome:str, departamento:str, id=None):
        self.id = id
        self.nome = nome
        self.departamento = departamento

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "departamento": self.departamento
        }
    
    def save(self, db_connection: sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO colaboradores (nome_colaborador, departamento_colaborador) VALUES (?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE colaboradores SET nome_colaborador = ?, departamento_colaborador = ? WHERE id_colaborador = ?"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento, self.id))
        db_connection.commit()

    def delete(self, db:sqlite3.Connection):
        query = "DELETE FROM colaboradores WHERE id_colaborador = ?"
        cursor = db.cursor()
        cursor.execute(query, (self.id, ))
        db.commit()

    @staticmethod
    def get_by_id(id, db:sqlite3.Connection):
        query = "SELECT * FROM colaboradores WHERE id_colaborador = ?"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            return Colaborador(id = result[0], nome = result[1], departamento = result[2])
        return None
    
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM colaboradores"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        colaboradores = []
        for result in results:
            colaboradores.append(Colaborador(id = result[0], nome = result[1], departamento = result[2]).to_dict())
        return colaboradores 