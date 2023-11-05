from lider import Lider
from colaborador import Colaborador
import sqlite3

class Reuniao:
    def __init__(self, lider:Lider, colaborador:Colaborador, data:str, id=None):
        self.id = id
        self.lider = lider
        self.colaborador = colaborador
        self.data = data

    def to_dict(self):
        return {
            "id": self.id,
            "id_lider": self.lider.id,
            "lider": self.lider.to_dict(),
            "id_colaborador": self.colaborador.id,
            "colaborador": self.colaborador.to_dict(),
            "data": self.data
        }
    
    def save(self, db_connection:sqlite3.Connection):
        if self.id is None:
            query = "INSERT INTO reunioes (id_lider, id_colaborador, data_reuniao) VALUES (?, ?, ?)"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.lider.id, self.colaborador.id, self.data))
            self.id = cursor.lastrowid
        else:
            query = "UPDATE reunioes SET id_lider = ?, id_colaborador = ?, data_reuniao = ? WHERE id_reuniao = ?"
            cursor = db_connection.cursor()
            cursor.execute(query, (self.lider.id, self.colaborador.id, self.data, self.id))
        db_connection.commit()

    @staticmethod
    def get_by_id(id, db:sqlite3.Connection):
        query = "SELECT * FROM reunioes WHERE id_reuniao = ?"
        cursor = db.cursor()
        result = cursor.execute(query, (id, )).fetchone()
        if result:
            lider = Lider.get_by_id(result[1], db)
            colaborador = Colaborador.get_by_id(result[2], db)
            return Reuniao(id = result[0], lider = lider, colaborador = colaborador, data = result[3])
        return None
    
    @staticmethod
    def get_all(db:sqlite3.Connection):
        query = "SELECT * FROM reunioes"
        cursor = db.cursor()
        results = cursor.execute(query).fetchall()
        reunioes = []
        for result in results:
            lider = Lider.get_by_id(result[1], db)
            colaborador = Colaborador.get_by_id(result[2], db)
            reunioes.append(Reuniao(id = result[0], lider = lider, colaborador = colaborador, data = result[3]).to_dict())
        return reunioes