import sqlite3

class Lider:
    def __init__(self, nome:str, departamento:str, email:str, password:str, ativo:int, id=None):
        self.id = id
        self.nome = nome
        self.departamento = departamento
        self.email = email
        self.password = password
        self.ativo = ativo

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "departamento": self.departamento,
            "email": self.email,
            "password": self.password,
            "ativo": self.ativo
        }
    
    def save(self, db_connection:sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO lideres (nome_lider, departamento_lider, email_lider, password_lider, ativo_lider) VALUES (?, ?, ?, ?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.nome, self.departamento, self.email, self.password, self.ativo))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE lideres SET nome_lider = ?, departamento_lider = ?, email_lider = ?, password_lider = ?, ativo_lider = ? WHERE id_lider = ?"
            db_connection.execute(query, (self.nome, self.departamento, self.email, self.password, self.ativo, self.id))
        db_connection.commit()
        db_connection.close()

    def delete(self, db:sqlite3.Connection):
        query = "UPDATE lideres SET ativo = ? WHERE id_lider = ?"
        db.execute(query, (self.ativo, self.id))
        db.commit()
        db.close()
        
    @staticmethod
    def get_by_id(id:int, db:sqlite3.Connection):
        query = "SELECT * FROM lideres WHERE id_lider = ? AND ativo_lider = 1"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            return Lider(id = result[0], nome = result[1], departamento = result[2], email = result[3], password = result[4], ativo = result[5])
        else:
            return None
        
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM lideres WHERE ativo_lider = 1"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        lideres = []
        for result in results:
            lideres.append(Lider(id = result[0], nome = result[1], departamento = result[2], email = result[3], password = result[4], ativo = result[5]).to_dict())
        return lideres
    
