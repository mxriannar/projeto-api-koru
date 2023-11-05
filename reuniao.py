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