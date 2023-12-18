import sqlite3

class Login:
    def __init__(self, usuario:str, senha:str, id=None):
        self.id = id
        self.usuario = usuario
        self.senha = senha
     

    def to_dict(self):
        return {
            "id": self.id,
            "usuario": self.usuario,
            "senha": self.senha
        }
    
    def save(self, db_connection:sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO login (usuario, senha) VALUES (?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.usuario, self.senha))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE lideres SET usuario = ?, senha = ? WHERE id = ?"
            db_connection.execute(query, (self.usuario, self.senha, self.id))
        db_connection.commit()
        db_connection.close()
        
    @staticmethod
    def get_by_id(id:int, db:sqlite3.Connection):
        query = "SELECT * FROM login WHERE id = ?"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            return Login(id = result[0], usuario = result[1], senha = result[2])
        else:
            return None
        
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM login"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        login = []
        for result in results:
            login.append(Login(id = result[0], usuario = result[1], senha = result[2]).to_dict())
        return login
    
