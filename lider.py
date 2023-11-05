import sqlite3

class Lider:
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
    
    def save(self, db_connection:sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO lideres (nome_lider, departamento_lider) VALUES (?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE lideres SET nome_lider = ?, departamento_lider = ? WHERE id_lider = ?"
            db_connection.execute(query, (self.nome, self.departamento, self.id))
        db_connection.commit()
        db_connection.close()
