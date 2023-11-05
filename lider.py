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

    @staticmethod
    def get_by_id(id:int, db:sqlite3.Connection):
        query = "SELECT * FROM lideres WHERE id_lider = ?"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            return Lider(id = result[0], nome = result[1], departamento = result[2])
        else:
            return None
        
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM lideres"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        lideres = []
        for result in results:
            lideres.append(Lider(id = result[0], nome = result[1], departamento = result[2]).to_dict())
        return lideres