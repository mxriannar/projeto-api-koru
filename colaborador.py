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