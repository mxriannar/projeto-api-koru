from lider import Lider
from colaborador import Colaborador

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